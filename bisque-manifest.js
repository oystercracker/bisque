module.exports = {
  version: '1.0',
  description: {
    name: 'bisque',
    shortSummary(platform) {
      if(platform === 'google') return 'goo goo';
      return 'foo bar';
    },
    longSummary: '',
    author: '',
    contactEmail: '',
    category: '',
    keywords: [],
    termsOfUseUrl: '',
    privacyPolicyUrl: '',
    testingInstructions: '',
    smallIconUrl: '',
    largeIconUrl: '',
    bannerUrl: ''
  },
  targetPlatforms: ['alexa', 'google', 'dialogflow'],
  targetLocales: ['en-US'],
  distributionCountries: [],
  isPrivate: true,
  allowsPurchases: false,
  usesPersonalInfo: false,
  isChildDirected: false,
  isExportCompliant: false,
  containsAds: false,
  outputDir: './dist',
  apis: {
    application: {
      uri: '',
      sslCertificateType: ''
    }
  }
};