'use strict';

const builders = {
        alexa(manifest){
          const modelsByLocale = {};
          manifest.targetLocales.forEach(locale => modelsByLocale[locale] = buildAlexaModel(manifest, locale));
          const alexaManifest = buildAlexaManifest(manifest);
          return {
            manifest: alexaManifest,
            models: modelsByLocale
          }
        }
      },
    { entries,
      assign,
      keys }         = Object,
      ConfigResolver = require('./lib/config-resolver');

function build(manifest){
  const errors = validateManifest(manifest),
        output = {};
  if(errors) throw new Error(errors[0]);
  manifest.targetPlatforms.forEach(target => output[target] = builders[target](manifest));
  return output;
}

function validateManifest(manifest){
  const AJV       = require('ajv'),
        validator = new AJV(),
        schema    = require('./schemas/manifest'),
        errors    = [];
  if(!manifest) errors.push('Expected a manifest but none provided.');
  if(!manifest.targetPlatforms || !manifest.targetPlatforms.length) errors.push('Provided manifest has no platform targets.');
  if(!manifest.targetLocales   || !manifest.targetLocales.length)   errors.push('Manifest should have at least one target locale.');
  if(!manifest.description)           errors.push('Description property was expected but not found.');
  if(!manifest.languageModel)         errors.push('Manifest is missing languageModel.');
  if(!manifest.languageModel.intents) errors.push('Language model is missing intents property.');
  validator.validate(schema, manifest);
  (validator.errors || []).forEach(err => errors.push(`${err.dataPath} ${err.message}`));
  if(errors.length) return errors;
}

function buildAlexaModel(manifest, locale){
  const outputModel = {
          interactionModel: {
            languageModel: {
              invocationName: '',
              intents: [],
              types: []
            }
          }
        },
        description     = (manifest.description.byLocale ? manifest.description.byLocale[locale] : manifest.description) || manifest.description,
        requiredIntents = ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'AMAZON.HelpIntent', 'AMAZON.FallbackIntent'];
  outputModel.interactionModel.languageModel.invocationName = description.invocation;
  const languageModel = manifest.languageModel;
  // INTENTS
  entries(languageModel.intents || {})  .forEach(([name, config]) => {
    const intentConfig = ConfigResolver.create(config),
          outputIntent = {
            name,
            samples: [],
            slots: []
          },
          alias = intentConfig.fetch('alexa', locale, 'alias');
    // If an intent name is matched to a request-type for the target(in this case alexa), then
    // the intent should not be added to the language model.
    if(intentConfig.fetch('alexa', locale, 'mapToRequestType')) return;
    if(alias) {
      if(requiredIntents.find(i => i === name.trim()) && requiredIntents.find(i => i === alias.trim())){
        throw new Error(`Alexa built-in intent '${name}' cannot have an alias to another built-in intent.`);
      }
      outputIntent.name = alias;
    }
    // SLOTS
    const slots = intentConfig.fetch('alexa', locale, 'slots') || {};
    entries(slots).forEach(([slot, _slotConfig]) => {
      const slotConfig = ConfigResolver.create(_slotConfig),
            type       = slotConfig.fetch('alexa', locale, 'type');
      if(!type) throw new Error(`Slot '${slot}' of intent '${name}' has no type.`);
      const outSlot = {
        name: slot,
        type: type,
        samples: slotConfig.fetch('alexa', locale, 'patterns') || []
      };
      outputIntent.slots.push(outSlot);
    });
    // PATTERNS
    const patterns = intentConfig.fetch('alexa', locale, 'patterns') || [];
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
  entries(languageModel.slotTypes  ).forEach(([type, _config]) => {
    const config  = ConfigResolver.create(_config),
          outType = {
            name: type
          };
    outType.values = config.fetch('alexa', null, 'values') || [];
    outputModel.interactionModel.languageModel.types.push(outType);
  });
  return outputModel;
}

function buildAlexaManifest(manifest){
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
  inputManifest  = ConfigResolver.create(manifest),
  outputManifest = alexaManifest.manifest;

  outputManifest.publishingInformation = { locales: {} };
  (inputManifest.fetch('alexa', null, 'targetLocales') || []).forEach(locale => {
    const desc = inputManifest.fetch('alexa', locale, 'description') || {};
    outputManifest.publishingInformation.locales[locale] = {
      summary:        desc.shortSummary       || '',
      examplePhrases: desc.exampleInvocations || [],
      keywords:       desc.keywords           || [],
      smallIconUri:   desc.smallIcon          || '',
      largeIconUri:   desc.largeIcon          || '',
      name:           desc.name               || '',
      description:    desc.longSummary        || '',
    };
  });

  outputManifest.publishingInformation.isAvailableWorldwide  = inputManifest.fetch('alexa', null, 'isAvailableWorldwide');
  outputManifest.publishingInformation.testingInstructions   = inputManifest.fetch('alexa', null, 'testingInstructions');
  outputManifest.publishingInformation.category              = inputManifest.fetch('alexa', null, 'description.category');
  outputManifest.publishingInformation.distributionCountries = inputManifest.fetch('alexa', null, 'distributionCountries');

  outputManifest.privacyAndCompliance.allowPurchases    = inputManifest.fetch('alexa', null, 'allowPurchases');
  outputManifest.privacyAndCompliance.usesPersonalInfo  = inputManifest.fetch('alexa', null, 'usesPersonalInfo');
  outputManifest.privacyAndCompliance.isChildDirected   = inputManifest.fetch('alexa', null, 'isChildDirected');
  outputManifest.privacyAndCompliance.isExportCompliant = inputManifest.fetch('alexa', null, 'isExportCompliant');
  outputManifest.privacyAndCompliance.containsAds       = inputManifest.fetch('alexa', null, 'containsAds');
  outputManifest.privacyAndCompliance.locales           = {};

  (inputManifest.fetch('alexa', null, 'targetLocales') || []).forEach(locale => {
    outputManifest.privacyAndCompliance.locales[locale] = {
      termsOfUseUrl:    inputManifest.fetch('alexa', locale, 'description.termsOfUseUrl'),
      privacyPolicyUrl: inputManifest.fetch('alexa', locale, 'description.privacyPolicyUrl')
    };
  });

  if(inputManifest.fetch('alexa', null, 'endpoint')){
    outputManifest.apis = { custom: { endpoint: {} } };
    const uri = inputManifest.fetch('alexa', null, 'endpoint.uri');
    if(uri) outputManifest.apis.custom.endpoint.uri = uri;
    const certType = inputManifest.fetch('alexa', null, 'sslCertificateType');
    if(certType) outputManifest.apis.custom.endpoint.sslCertificateType = certType;
  }

  return alexaManifest;
}

module.exports = {
  build,
  buildAlexaModel,
  buildAlexaManifest,
  validateManifest
};

