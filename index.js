'use strict';

const builders = {
        alexa(manifest, languageModels){
          const alexaManifest  = buildAlexaManifest(manifest),
                modelsByLocale = {};
          Object.entries(languageModels).forEach(([locale, model]) => {
            modelsByLocale[locale] = buildAlexaModel(manifest, model, locale);
          });
          return {
            manifest: alexaManifest,
            models: modelsByLocale
          }
        },
        dialogflow(manifest){
          const modelsByLocale = {};
        }
      },
    { entries,
      assign,
      keys }         = Object,
      ConfigObject   = require('./lib/config-object'),
      AJV            = require('ajv');
        

function validate(schema, object){
  const validator = new AJV(),
        obj       = ConfigObject.from(object).__base;
  validator.validate(schema, obj);
  return validator.errors || [];
}

/**
 * Resolves the manifest and language model, creating different versions for each platform and locale.
 * @param {object} manifest
 * @param {object} languageModel
 */
function expandAssets(manifest, languageModel){
  // This can be made more efficient by not resolving multiple times to preprocess
  // target platforms and locales, but should be fine for now.
  const errors          = [],
        assets          = {},
        output          = { errors, assets };
  if(!manifest)    errors.push('Expected a manifest but none provided.');
  if(errors.length) return output;
  const targetPlatforms = ConfigObject.resolve(manifest).get('targetPlatforms', []);
  if(!targetPlatforms.length) errors.push('Provided manifest has no platform targets.');
  if(errors.length) return output;
  const manifestSchema = require('./schemas/manifest'),
        modelSchema    = require('./schemas/language-model');
  targetPlatforms.forEach(platform => {
    const platformOutput = {
      languageModels: {},
    };
    assets[platform] = platformOutput;
    const platformManifest = ConfigObject.resolve(manifest, platform),
          targetLocales    = platformManifest.get('targetLocales', []);
    validate(manifestSchema, platformManifest)
      .forEach(err => errors.push(`${platform} - ${err.dataPath} ${err.message}`));
    platformOutput.manifest = platformManifest.__base;
    targetLocales.forEach(locale => {
      const targetLanguageModel = ConfigObject.resolve(languageModel, platform, locale);
      if(!targetLanguageModel) {
        errors.push(`Language model for ${platform}:${locale} expected but none found.`);
        return output;
      }
      validate(modelSchema, targetLanguageModel)
        .forEach(err => errors.push(`${platform}:${locale} - ${err.dataPath} ${err.message}`));
      platformOutput.languageModels[locale] = targetLanguageModel.__base;
    });
  });
  if(!errors.length) delete output.errors;
  return output;
}

function build(platform, { manifest, languageModels }){
  return builders[platform](manifest, languageModels);
}

// function build(manifest, languageModels){
//   const output = {};
//   
//   manifest.targetPlatforms.forEach(platform => output[platform] = builders[platform](manifest, languageModels));
//   return output;
// }

function buildAlexaModel(manifest, languageModel){
  manifest      = ConfigObject.from(manifest);
  languageModel = ConfigObject.from(languageModel);
  const outputModel = {
          interactionModel: {
            languageModel: {
              invocationName: '',
              intents: [],
              types: []
            }
          }
        },
        description     = manifest.get('description'),
        requiredIntents = ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'AMAZON.HelpIntent', 'AMAZON.FallbackIntent'];
  
  outputModel.interactionModel.languageModel.invocationName = description.invocation;
  // INTENTS
  entries(languageModel.get('intents') || {}).forEach(([name, config]) => {
    const intentConfig = ConfigObject.from(config),
          outputIntent = {
            name,
            samples: [],
            slots: []
          },
          alias = intentConfig.get('alias');
    // If an intent name is matched to a request-type for the target(in this case alexa), then
    // the intent should not be added to the language model.
    if(intentConfig.get('mapToRequestType')) return;
    if(alias) {
      if(requiredIntents.find(i => i === name.trim()) && requiredIntents.find(i => i === alias.trim())){
        throw new Error(`Alexa built-in intent '${name}' cannot have an alias to another built-in intent.`);
      }
      outputIntent.name = alias;
    }
    // SLOTS
    const slots = intentConfig.get('slots') || {};
    entries(slots).forEach(([slot, _slotConfig]) => {
      const slotConfig = ConfigObject.from(_slotConfig),
            type       = slotConfig.get('type');
      if(!type) throw new Error(`Slot '${slot}' of intent '${name}' has no type.`);
      const outSlot = {
        name: slot,
        type: type,
        samples: slotConfig.get('patterns', [])
      };
      outputIntent.slots.push(outSlot);
    });
    // PATTERNS
    const patterns = intentConfig.get('patterns', []);
    patterns.forEach(pattern => {
      // Basically just check to make sure that inline slot has explicit definition.
      pattern.replace(/{\s*(\w*)\:*\w*}/g, function(x,y){
        if(!slots[y]) throw new Error(`Slot name {${y}} in sample pattern for intent '${name}' has no slot definition. \n Pattern: "${sample}"`);
      });
    });
    outputIntent.samples = patterns;
    outputModel.interactionModel.languageModel.intents.push(outputIntent);
  });
  requiredIntents.forEach(i => {
    const hasIntent = outputModel.interactionModel.languageModel.intents.some(int => int.name === i);
    if(!hasIntent) throw new Error(`Language model failed to output Alexa model with required built-in intent '${i}'.`)
  });
  // SLOT TYPES
  entries(languageModel.get('slotTypes', [])).forEach(([type, _config]) => {
    const config  = ConfigObject.from(_config),
          outType = {
            name: type
          };
    outType.values = config.get('alexa', null, 'values') || [];
    outputModel.interactionModel.languageModel.types.push(outType);
  });
  return outputModel;
}
/**
 * Takes a Bisque manifest and converts it to an Alexa manifest.
 * @param {object} manifest - A Bisque manifest object.  The manifest MUST have been resolved prior, and cannot contain functions or resolver objects.
 */
function buildAlexaManifest(manifest){
  manifest = ConfigObject.from(manifest);
  const alexaManifest = {
    manifest: {
      manifestVersion: '1.0',
      publishingInformation: {},
      apis: {},
      permissions: [],
      privacyAndCompliance: {},
      events: {}
    }
  },
  outputManifest = alexaManifest.manifest;

  outputManifest.publishingInformation = { locales: {} };
  (manifest.get('targetLocales') || []).forEach(locale => {
    outputManifest.publishingInformation.locales[locale] = {
      summary:        manifest.get('description.shortSummary'      , ''),
      examplePhrases: manifest.get('description.exampleInvocations', []),
      keywords:       manifest.get('description.keywords'          , []),
      smallIconUri:   manifest.get('description.smallIcon'         , ''),
      largeIconUri:   manifest.get('description.largeIcon'        , ''),
      name:           manifest.get('description.name'              , ''),
      description:    manifest.get('description.longSummary'       , ''),
    };
  });

  outputManifest.publishingInformation.isAvailableWorldwide  = manifest.get('isAvailableWorldwide');
  outputManifest.publishingInformation.testingInstructions   = manifest.get('testingInstructions');
  outputManifest.publishingInformation.category              = manifest.get('description.category');
  outputManifest.publishingInformation.distributionCountries = manifest.get('distributionCountries');

  outputManifest.privacyAndCompliance.allowPurchases    = manifest.get('allowPurchases');
  outputManifest.privacyAndCompliance.usesPersonalInfo  = manifest.get('usesPersonalInfo');
  outputManifest.privacyAndCompliance.isChildDirected   = manifest.get('isChildDirected');
  outputManifest.privacyAndCompliance.isExportCompliant = manifest.get('isExportCompliant');
  outputManifest.privacyAndCompliance.containsAds       = manifest.get('containsAds');
  outputManifest.privacyAndCompliance.locales           = {};
  (manifest.get('targetLocales') || []).forEach(locale => {
    outputManifest.privacyAndCompliance.locales[locale] = {
      termsOfUseUrl:    manifest.get('description.termsOfUseUrl'),
      privacyPolicyUrl: manifest.get('description.privacyPolicyUrl')
    };
  });

  if(manifest.get('endpoint')){
    outputManifest.apis = { custom: { endpoint: {} } };
    const uri = manifest.get('endpoint.uri');
    if(uri) outputManifest.apis.custom.endpoint.uri = uri;
    const certType = manifest.get('sslCertificateType');
    if(certType) outputManifest.apis.custom.endpoint.sslCertificateType = certType;
  }

  return alexaManifest;
}


// function buildDialogflowManifest(manifest){
//   const outputManifest = {
//     description: '',
//     disableInteractionLogs: false,
//     disableStackdriverLogs: true,
//     googleAssistant: {
//       googleAssistantCompatible: true,
//       welcomeIntentSignInRequired: false,
//       startIntents: [],
//       systemIntents: [],
//       endIntentIds: [],
//       oAuthLinking: {
//         required: false,
//         grantType: "AUTH_CODE_GRANT"
//       },
//       voiceType: "MALE_1",
//       capabilities: [],
//       protocolVersion: "V2",
//       autoPreviewEnabled: true,
//       isDeviceAgent: false
//     },
//     defaultTimezone: 'America/Denver',
//     customClassifierMode: 'use.after',
//     mlMinConfidence: 0.3,
//     supportedLanguages: [],
//     onePlatformApiVersion: 'v2',
//     analyzeQueryTextSentiment: false
//   };

//   const inputManifest = ConfigResolver.create(manifest);
//   outputManifest.description = inputManifest.get('dialogflow', null, 'description.shortSummary');
//   const webhook = inputManifest.get('dialogflow', null, 'apis.application');
//   if(webhook){
//     outputManifest.webhook = {
//       url: webhook.uri,
//       headers: webhook.headers || {},
//       available: true,
//       useForDomains: false,
//       cloudFunctionsEnabled: false,
//       cloudFunctionsInitialized: false
//     }
//   }

//   const languages = (inputManifest.get('dialogflow', null, 'targetLocales') || []).map(l => l.replace(/[a-z]\-/, ''));
//   outputManifest.language = languages[0] || 'en';
//   outputManifest.supportedLanguages = languages;

//   outputManifest.isPrivate = inputManifest.get('dialogflow', null, 'isPrivate') || false;

//   return outputManifest;
// }

// function buildDialogflowModel(manifest, locale){
//   const model = {
//     intents: {},
//     usersays: {}
//   };
//   const languageModel = manifest.languageModel;
//   entries(languageModel.intents || {}).forEach(([name, config]) => {
//     const outputIntent = {
//       id: "4f563969-14b5-4c9a-aa19-5ed32db55aa4",
//       name,
//       auto: true,
//       contexts: [
//         "sessionAttributes"
//       ],
//       responses: [],
//       priority: 500000,
//       webhookUsed: true,
//       webhookForSlotFilling: false,
//       lastUpdate: 1531614579,
//       fallbackIntent: false,
//       events: []
//     };
//   });
// }

module.exports = {
  build,
  buildAlexaModel,
  buildAlexaManifest,
  // buildDialogflowManifest,
  expandAssets
};

