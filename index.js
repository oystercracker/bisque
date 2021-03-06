'use strict';

const { entries }         = Object,
        ConfigObject   = require('./lib/config-object'),
        AJV            = require('ajv');


/**
 * Builds out a resolved manifest and language models for a given platform.
 */
function build(platform, { manifest, languageModels }){
  return require(`./lib/platforms/${platform}`)(manifest, languageModels);
}

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
  if(!manifest)      errors.push('Expected a manifest but none provided.');
  if(!languageModel) errors.push('Expected a language model but none provided.');
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

module.exports = {
  build,
  expandAssets,
  ConfigObject
};

