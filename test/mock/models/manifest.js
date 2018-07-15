'use strict';

const manifest = {
  version: '1.0',
  targetPlatforms: ['alexa'],
  targetLocales: ['en-US'],
  distributionCountries: ['US'],
  testingInstructions: '',
  contactEmail: '',
  isAvailableWorldwide: false,
  allowsPurchases: false,
  usesPersonalInfo: false,
  isChildDirected: false,
  isExportCompliant: true,
  containsAds: false,
  sourceDir: '.',
  outputDir: './dist',
  endpoint: {
    uri: '',
    httpHeaders: {}
  },
  description: {
    byPlatform: {
      alexa: {
        category: 'EDUCATION_AND_REFERENCE'
      }
    },
    byLocale: {
      'en-US': {
        name: 'Hello World',
        shortSummary: 'Hello World implemented using Saltine.',
        longSummary: '',
        keywords: [],
        invocation: 'hello world',
        exampleInvocations: [
          'open hello world',
          'tell hello world',
          'ask hello world'
        ],
        termsOfUseUrl: 'foo',
        privacyPolicyUrl: 'boo'
      }
    }
  },
  languageModel: require('./language-model')
};

module.exports = manifest;

