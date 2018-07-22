'use strict';

const { assert }        = require('chai'),
        bisque          = require('../bin/bisque'),
      { rmrf,
        captureStdout } = require('../lib/utils'),
        glob            = require('glob'),
      { mkdirSync }     = require('fs'),
        Validator       = require('ajv'),
        manifestSchema  = require('../schemas/manifest'),
        modelSchema     = require('../schemas/language-model'),
        alexaManifestSchema      = require('../schemas/alexa/skill.json'),
        alexaModelSchema         = require('../schemas/alexa/model.json'),
        dialogflowAgentSchema    = require('../schemas/dialogflow/agent.json'),
        dialogflowIntentSchema   = require('../schemas/dialogflow/intent'),
        dialogflowUsersaysSchema = require('../schemas/dialogflow/usersays'),
        TEST_DIRECTORY           = `${__dirname}/../tmp/test/`;

function clearTmpFiles(){
  try {
    rmrf(`${__dirname}/../tmp/test/`);
    mkdirSync(`${__dirname}/../tmp/test/`);
  } catch(err){
  }
}

describe('bisque', function(){

  before(() => {
    clearTmpFiles();
  });  

  after(() => {
    clearTmpFiles();
  });

  describe('init', function(){

    beforeEach(async () => {
      clearTmpFiles();
      process.chdir(TEST_DIRECTORY);
      await bisque.init({y: true});
    });

    afterEach(() => {
      clearTmpFiles();
    });
  
    it('creates a valid manifest file', function(){
      const manifest  = require(`${process.cwd()}/bisque-manifest`),
            validator = new Validator();
      validator.validate(manifestSchema, manifest);
      assert.notExists(validator.errors);
    });

    it('creates a valid language model', function(){
      const model     = require(`${process.cwd()}/bisque-model`),
            validator = new Validator();
      validator.validate(modelSchema, model);
      assert.notExists(validator.errors);
    });

  });

  describe('validate', function(){

    beforeEach(() => {
      clearTmpFiles();
      process.chdir(TEST_DIRECTORY);
    });

    it('indicates that fresh manifest with user input are valid', async function(){
      await bisque.init({y: true, a: 'foobar', platforms: 'alexa, dialogflow, luis'});
      const { output, errors } = await captureStdout(async () => await bisque.validate());
      assert.notExists(errors);
      assert.match(output, /Manifest and language model are valid/);
      const manifest = require(`${TEST_DIRECTORY}/bisque-manifest`);
      assert.equal(manifest.description.name, 'foobar');
      assert.deepEqual(manifest.targetPlatforms, ['alexa', 'dialogflow', 'luis']);
    });

    it('complains when files are missing', async function(){
      const { output, errors } = await captureStdout(() => { 
        bisque.validate() 
      });
      assert.notExists(output);
      assert.match(errors, /Expected a manifest but none provided./);
      assert.match(errors, /Expected a language model but none provided/);
    });

  });


  describe('build', function(){

    describe('dialogflow', function(){

      beforeEach(() => {
        clearTmpFiles();
        process.chdir(TEST_DIRECTORY);
      })

      it('builds a valid agent.json manifest file', async function(){
        await bisque.init({y: true, a: 'foobar', platforms: 'dialogflow', locales: 'en-US'});
        await bisque.build();
        const agent     = require(`${TEST_DIRECTORY}/dist/dialogflow/agent`),
              validator = new Validator();
        validator.validate(dialogflowAgentSchema, agent);
        assert.notExists(validator.errors);
      });

      it('builds valid intent files', async function(){
        await bisque.init({y: true, a: 'foobar', platforms: 'dialogflow', locales: 'en-US, de-DE, fr-FR'});
        await bisque.build();
        const intents = glob.sync(`${TEST_DIRECTORY}/dist/dialogflow/intents/*.json`)
                            .filter(x => x.match(/intents\/[a-zA-Z]+\.json/));
        assert.notEmpty(intents);
        intents.forEach(filepath => {
          const intent    = require(filepath),
                validator = new Validator();
          validator.validate(dialogflowIntentSchema, intent);
          debugger
          assert.notExists(validator.errors);
        });
        const usersays = glob.sync(`${TEST_DIRECTORY}/dist/dialogflow/intents/*_usersays_*.json`);
        assert.notEmpty(usersays);
        usersays.forEach(filepath => {
          const usersays  = require(filepath),
                validator = new Validator();
          validator.validate(dialogflowUsersaysSchema, usersays);
          assert.notExists(validator.errors);
        });
      });

    });

    describe('alexa', function(){

      // before(async () => {
        // clearTmpFiles();
        // process.chdir(TEST_DIRECTORY);
        // const locales = ['en-US', 'de-DE', 'fr-FR'];
        // await bisque.init({y: true, a: 'foobar', platforms: 'alexa', locales: locales.join(', ')});
        // await bisque.build();
      // });
  
      beforeEach(() => {
        clearTmpFiles();
        process.chdir(TEST_DIRECTORY);
      });

      it('builds a valid skill.json manifest file', async function(){
        await bisque.init({y: true, a: 'foobar', platforms: 'alexa'});
        await bisque.build();
        const skill     = require(`${TEST_DIRECTORY}/dist/alexa/skill`),
              validator = new Validator();
        validator.validate(alexaManifestSchema, skill);
        assert.notExists(validator.errors);
      });

      it('builds language model files for the specified locales', async function(){
        const locales = ['en-US', 'de-DE', 'fr-FR'];
        await bisque.init({y: true, a: 'foobar', platforms: 'alexa', locales: locales.join(', ')});
        await bisque.build();
        locales.forEach(locale => {
          const model     = require(`${TEST_DIRECTORY}/dist/alexa/models/${locale}.json`),
                validator = new Validator();
          validator.validate(alexaModelSchema, model);
          assert.notExists(validator.errors);
        });
      });

      // it('fails to build language models if the required intents are not accounted for', async function(){
      //   clearTmpFiles();
      //   process.chdir(TEST_DIRECTORY);
      //   const locales = ['en-US', 'de-DE', 'fr-FR'];
      //   await bisque.init({y: true, a: 'foobar', platforms: 'alexa', locales: locales.join(', ')});
      //   const { errors, output } = await captureStdout(async () => await bisque.build());
      //   assert.match(errors, /Language model failed to output Alexa model with required built-in intent/);
      // });

    });

  });


});

