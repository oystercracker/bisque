'use strict';

const manifest = {
  version: '1.0',
  targetPlatforms: ['alexa'],
  targetLocales: ['en-US', 'fr-FR'],
  distributionCountries: ['US'],
  testingInstructions: '',
  contactEmail: '',
  isAvailableWorldwide: false,
  allowsPurchases: false,
  usesPersonalInfo: false,
  isChildDirected: false,
  isExportCompliant: true,
  containsAds: {
    default: false,
    byPlatform: {
      alexa: true
    }
  },
  sourceDir: '.',
  outputDir: './dist',
  apis: {
    video: {
      uri: 'hey'
    }
  },
  description(platform){
    let description = {
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
    };
    if(platform === 'alexa') description.category = 'EDUCATION_AND_REFERENCE';
    return description;
  }
};

module.exports = manifest;

