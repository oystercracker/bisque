'use strict';

const ConfigObject = require('../config-object'),
      aguid        = require('aguid'),
      defaults     = require('json-schema-defaults'),
    { entries }    = Object,
    { round }      = Math;

function buildManifest(manifest){
  manifest = ConfigObject.from(manifest);
  const outputManifest = defaults(require('../../schemas/dialogflow/agent'));
  outputManifest.description = manifest.get('description.shortSummary');
  const webhook = manifest.get('apis.application');
  if(webhook){
    outputManifest.webhook = {
      url: webhook.uri,
      headers: webhook.headers || {},
      available: true,
      useForDomains: false,
      cloudFunctionsEnabled: false,
      cloudFunctionsInitialized: false
    };
    outputManifest.defaultTimezone = webhook.timezone || outputManifest.defaultTimezone;
  }
  const languages = manifest.get('targetLocales', '');
  outputManifest.language           = (languages[0] || 'en').replace(/\-[A-Z]+$/, '') || outputManifest.language;
  outputManifest.supportedLanguages = languages;
  outputManifest.isPrivate          = manifest.get('isPrivate') || false;
  return outputManifest;
}

function buildIntents(manifest, languageModels){
  manifest      = ConfigObject.from(manifest);
  const intents     = {},
        lastUpdated = round((new Date().getTime()) / 1000);
  entries(languageModels).forEach(([locale, model]) => {
    entries(model.intents || {}).forEach(([intentName, intentConfig]) => {
      intentConfig = ConfigObject.from(intentConfig);
      const intentFileName = `${intentName}.json`;
      if(!intents.hasOwnProperty(intentFileName))
        intents[intentFileName] = defaults(require('../../schemas/dialogflow/intent'));
      const intent = intents[intentFileName];
      intent.name  = intentName;
      intent.id    = aguid(intentName);
      // intent.responses[0].messages[0].lang = locale; // i dont' think this is necessary
      intent.lastUpdated = lastUpdated;
      entries(intentConfig.get('slots', {})).forEach(([slotName, slotConfig]) => {
        // we should disallow or strip the @ symbol from
        // slot type names to avoid weirdness between dialogflow
        // intents and other concepts of intents
        intent.responses[0].parameters.push({
          id: aguid(slotName),
          dataType: `@${slotConfig.type}`,
          name: slotName,
          value: `$${slotName}`,
          isList: false
        });
      });
      const usersaysFilename = `${intentName}_usersays_${locale.toLowerCase()}.json`,
            usersays = {
              id: aguid(),
              data: [],
              isTemplate: true,
              lastUpdated: lastUpdated
            };
      entries(intentConfig.get('slots', {})).forEach(([slotName, slotConfig]) => {
        (slotConfig.patterns || []).forEach(pattern => {
          let userDefined = false;
          const says = {
            text: pattern.replace(/\{\s*([a-z]+)\:*\s*([A-z]*)\s*\}/g, (patt, slotName, slotType) => {
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
              userDefined = true;
              return `${slotName}:@${slotType}`;
            }),
            userDefined 
          };
          usersays.data.push(says);
        });
      });
      intents[usersaysFilename] = usersays;
    });
  });
  return intents;
}


module.exports = {
  buildManifest, buildIntents
};

