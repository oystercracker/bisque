'use strict';

const { entries }    = Object,
        ConfigObject = require('../config-object');


function build(manifest, languageModels){
  const alexaManifest  = buildManifest(manifest),
        modelsByLocale = {};
  entries(languageModels).forEach(([locale, model]) => {
    modelsByLocale[`${locale}.json`] = buildModel(manifest, model, locale);
  });
  return {
    'skill.json': alexaManifest,
    models: modelsByLocale
  };
}

module.exports = build;

/**
 * Takes a Bisque manifest and converts it to an Alexa manifest.
 * @param {object} manifest - A Bisque manifest object.  The manifest MUST have been resolved prior, and cannot contain functions or resolver objects.
 */
function buildManifest(manifest){
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
      largeIconUri:   manifest.get('description.largeIcon'         , ''),
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


function buildModel(manifest, languageModel){
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
    const alias   = config.alias || [name],
          aliases = Array.isArray(alias) ? alias : [alias];
    if(requiredIntents.find(i => i == name.trim()) && requiredIntents.some(i => aliases.indexOf(i) > -1 ))
      throw new Error(`Alexa built-in intent '${name}' cannot have an alias to another built-in intent.`);
    const outputIntents = aliases.map(alias => buildIntent(alias, config));
    outputIntents.forEach(intent => outputModel.interactionModel.languageModel.intents.push(intent));    
  });
  requiredIntents.forEach(i => {
    const hasIntent = outputModel.interactionModel.languageModel.intents.some(int => int.name === i);
    // if(!hasIntent) throw new Error(`Language model failed to output Alexa model with required built-in intent '${i}'.`)
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

function buildIntent(name, config){
  const intentConfig = ConfigObject.from(config),
        outputIntent = {
          name,
          samples: [],
          slots: []
        };
  // If an intent name is matched to a request-type for the target(in this case alexa), then
  // the intent should not be added to the language model.
  if(intentConfig.get('mapToRequestType')) return;
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
  return outputIntent;
}