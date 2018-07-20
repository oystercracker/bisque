'use strict';

const { assert }        = require('chai'),
      { readFileSync } = require('fs'),
        LanguageModel = require('../../lib/language-model'),
        cheerio       = require('cheerio'),
        convert       = require('xml-js'),
        builder       = require('xmlbuilder'),
        Astley        = require('./astley'),
      { isPlainObject,
        isNil } = require('../../lib/utils');

describe('language model codemod', function(){
  it('awbabr', function(){

    // const model = new LanguageModel(`${__dirname}/fake-model.js`);


    // const model = new Astley(readFileSync(`${__dirname}/fake-model.js`, 'utf8'));

    
  });
});