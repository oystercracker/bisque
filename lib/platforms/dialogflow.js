'use strict';

const ConfigObject  = require('../config-object'),
      aguid         = require('aguid'),
      defaults      = require('json-schema-defaults'),
      localeSupport = require('../locale-support').dialogflow,
      slotRegex     = require('../slot-literal-regex'),
    { entries }     = Object,
    { round }       = Math;

function filterLanguages(locales){
  locales.forEach(l => {
    if(!localeSupport.some(ls => ls === l)) throw new Error(`Dialogflow does not support locale ${l}`);
  });
  return locales.map(l => [ l.match(/^([a-z]{2})/)[0], l.toLowerCase() ])
                .reduce((acc, val) => acc.concat(val), []);
}

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
  const languages = filterLanguages(manifest.get('targetLocales', []));
  outputManifest.language           = (languages[0] || 'en').replace(/\-[A-Z]+$/, '') || outputManifest.language;
  outputManifest.supportedLanguages = languages;
  outputManifest.isPrivate          = manifest.get('isPrivate') || false;
  return outputManifest;
}

function buildEntities(manifest, languageModels){
  const entities = {};
  entries(languageModels).forEach(([locale, model]) => {
    model = ConfigObject.from(model);
    entries(model.get('slotTypes', {})).forEach(([slotTypeName, slotTypeConfig]) => {
      const entityFilename = `${slotTypeName}.json`;
      const entity = {
        id: aguid(slotTypeName),
        name: slotTypeName,
        isOverridable: true,
        isEnum: false,
        automatedExpansion: false
      };
      const languages = filterLanguages([locale]);
      entities[entityFilename] = entity;
      languages.forEach(language => {
        const entityEntriesFilename = `${slotTypeName}_entries_${language}.json`;
        const entityEntries = [];
        (slotTypeConfig.values || []).forEach(slotValue => {
          entityEntries.push({
            value: slotValue.name,
            synonyms: slotValue.synonyms
          });
        });
        entities[entityEntriesFilename] = entityEntries;
      });
    });
  });
  return entities;
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
        // intents[intentFileName] = defaults(require('../../schemas/dialogflow/intent'));
        intents[intentFileName] = {
          id: '',
          name: '',
          lastUpdated: 0,
          auto: true,
          contexts: [],
          responses: [{
            resetContexts: false,
            affectedContexts: [],
            parameters: [],
            messages: [],
            defaultResponsePlatforms: {},
            speech: []
          }],
          priority: 500000,
          webhookUsed: true,
          webhookForSlotFilling: false,
          lastUpdate: 0,
          fallbackIntent: false,
          events: [],
        };
      const intent = intents[intentFileName];
      intent.name  = intentName;
      intent.id    = aguid(intentName);
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
      const languages = filterLanguages([locale]);
      languages.forEach(language => {
        const usersays = [];
        entries(intentConfig.get('slots', {})).forEach(([slotName, slotConfig]) => {
          const example = {
            id: aguid(),
            data: [],
            isTemplate: true,
            updated: lastUpdated
          };
          (slotConfig.patterns || []).forEach(pattern => {
            let userDefined = false;
            const says = {
              text: pattern.replace(slotRegex, (patt, slotName, slotType) => {
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
                return `@${slotType}:${slotName}`;
              }),
              userDefined
            };
            example.data.push(says);
          });
          usersays.push(example);
        });
        intents[`${intentName}_usersays_${language}.json`] = usersays;
      });
    });
  });
  return intents;
}


module.exports = {
  buildManifest, buildIntents, buildEntities, filterLanguages
};

