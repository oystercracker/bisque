'use strict';

const ConfigObject  = require('../config-object'),
      aguid         = require('aguid'),
      localeSupport = require('../locale-support').dialogflow,
      slotRegex     = require('../slot-literal-regex'),
    { entries }     = Object,
    { round }       = Math;


function build(manifest, languageModels){
  const output          = buildActionPackages(manifest, languageModels),
        buildDialogflow = require('./dialogflow');
  output.dialogflow = buildDialogflow(manifest, languageModels);
  return output;
}

module.exports = build;


function filterLanguages(locales){
  locales.forEach(l => {
    if(!localeSupport.some(ls => ls === l)) throw new Error(`Google does not support locale ${l}`);
  });
  return locales.map(l => [ l.match(/^([a-z]{2})/)[0], l.toLowerCase() ])
                .reduce((acc, val) => acc.concat(val), []);
}


function buildActionPackages(manifest, languageModels){
  const output = {};
  manifest = ConfigObject.from(manifest);
  entries(languageModels).forEach(([locale, model]) => {
    const actionPackage = buildActionPackage(manifest, model),
          locales       = filterLanguages([locale]);
    // Expand Locales and add the action package to the output object.
    locales.forEach(locale => {
      const pkg = Object.assign({}, actionPackage);
      pkg.locale = locale;
      output[`action.${locale}.json`] = pkg;
    });
  });
  return output;
}


function buildActionPackage(manifest, model){
  const languageModel = ConfigObject.from(model),
        actionPackage = {
          manifest: buildManifest(manifest, languageModel),
          accountLinking: {},
          actions: [],
          types: buildTypes(manifest, languageModel),
          conversations: {}
        },
        applicationAPI = manifest.get('apis.application');
  if(applicationAPI){
    actionPackage.actions.push({
      description: 'Launch',
      name: 'actions_intent_MAIN',
      fulfillment: {
        conversationName: 'application'
      },
      intent: {
        name: 'actions.intent.MAIN'
      }
    });
    actionPackage.conversations.application = {
      inDialogIntents: buildIntents(manifest, languageModel),
      url: applicationAPI.uri || '',
      fulfillmentApiVersion: 2
    };
  }
  return actionPackage;
}


function buildManifest(manifest, languageModel){
  const outputManifest = {
    displayName: '',
    invocationName: '',
    category: '',
    voiceName: 'female_1'
  };
  outputManifest.displayName           = manifest.get('description.name', '');
  outputManifest.invocationName        = languageModel.get('invocation', '');
  outputManifest.category              = manifest.get('description.category', '');
  outputManifest.shortDescription      = manifest.get('description.shortSummary', '');
  outputManifest.longDescription       = manifest.get('description.longSummary', '');
  outputManifest.smallSquareLogoUrl    = manifest.get('description.smallIconUrl', '');
  outputManifest.largeLandscapeLogoUrl = manifest.get('description.largeIconUrl', '');
  outputManifest.companyName           = manifest.get('description.author', '');
  outputManifest.contactEmail          = manifest.get('description.contactEmail', '');
  outputManifest.termsOfServiceUrl     = manifest.get('description.termsOfUseUrl', '');
  outputManifest.privacyUrl            = manifest.get('description.privacyPolicyUrl', '');
  outputManifest.sampleInvocation      = languageModel.get('sampleInvocations', []);
  outputManifest.introduction          = manifest.get('description.longSummary', '');
  outputManifest.surfaceRequirements   = {};
  return outputManifest;
 }


function buildTypes(manifest, languageModel){
  const outputTypes = [];
  entries(languageModel.get('slotTypes', {})).forEach(([slotTypeName, slotTypeConfig]) => {
    const outputType = {
      name: `$${slotTypeName}`,
      entities: []
    };
    (slotTypeConfig.values || []).forEach(slotValue => {
      outputType.entities.push({
        key:      slotValue.name,
        synonyms: slotValue.synonyms
      });
    });
    outputTypes.push(outputType);
  });
  return outputTypes;
}


function buildIntents(manifest, languageModel){
  const outputIntents = [];
  entries(languageModel.get('intents', {})).forEach(([intentName, intentConfig]) => {
    const alias   = intentConfig.alias || [intentName],
          aliases = Array.isArray(alias) ? alias : [alias];
    aliases.forEach(alias => outputIntents.push(buildIntent(alias, intentConfig)));
  });
  outputIntents.push({
    name: 'RAW_TEXT',
    parameters: [
      {
        name: 'text',
        type: 'SchemaOrg_Text'
      }
    ],
    trigger: {
      queryPatterns: [
        '$SchemaOrg_Text:text'
      ]
    }
  });
  return outputIntents;
}


function buildIntent(intentName, intentConfig){
  intentConfig = ConfigObject.from(intentConfig);
  return {
    name: aguid(intentName),
    parameters: entries(intentConfig.get('slots', {})).map(([slotName, slotConfig]) => {
      return {
        name: slotName,
        type: slotConfig.type
      };
    }),
    trigger: {
      queryPatterns: intentConfig.get('patterns', []).map(pattern => {
        return pattern.replace(slotRegex, (patt, slotName, slotType) => { 
          if(typeof slotName !== 'string' || !slotName.length) {
            const error = new Error(`Slot name from pattern string in intent '${intentName}' could not be parsed.`);
            error.pattern = patt;
            throw error;
          }
          if(typeof slotType !== 'string' || !slotType.length) {
            slotType = intentConfig.get(`slots['${slotName}'].type`)
          }
          if(!slotType || !slotType.length) {
            throw new Error(`Slot type could not be found for slot '${slotName}' in intent '${intentName}'`);
          }
          return `$${[slotType, slotName].join(':')}`;
        }); 
      })
    }
  };
}
