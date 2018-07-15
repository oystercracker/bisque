'use strict';

const VERSION = '1.0';

module.exports = {
  type: 'object',
  version: VERSION,
  required: [
    'version',
    'description',
    'outputDir'
  ],
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: {
    version: {
      $id: '#/properties/version',
      type: 'string',
      title: 'Manifest Version',
      description: 'The version of the structure used in the manifest.  Not to be confused with the version of related applications.',
      'default': VERSION,
      examples: [
        VERSION
      ]
    },
    description: {
      type: [
        'object'
      ],
      title: 'Description',
      description: 'A description of the application, used by platforms when publishing.',
      default: {},
      properties: {
        name: {
          type: [
            'string'
          ],
          title: 'Name',
          description: 'The display name of the application.',
          'default': '',
          examples: [
            'Hello World'
          ]
        },
        shortSummary: {
          type: [
            'string'
          ],
          title: 'Short Summary',
          description: 'A short summary of the application.',
          'default': '',
          examples: [
            'Hello World says \'hello world\' to you.'
          ]
        },
        longSummary: {
          type: [
            'string'
          ],
          title: 'Long Summary',
          description: 'A longer summary of the application.',
          'default': '',
          examples: [
            'Hello World says \'hello world\' to you.'
          ]
        },
        author: {
          $id: '#/properties/author',
          type: [ 'string' ],
          title: 'Author',
          default: '',
          description: 'The name of the developer or company that authored the application.'
        },
        contactEmail: {
          $id: '#/properties/contactEmail',
          type: [ 'string' ],
          title: 'Contact Email',
          description: 'The name of the developer or company that authored the application.',
          default: ''
        },
        category: {
          $id: '#/properties/category',
          type: [
            'string',
          ],
          title: 'Category',
          description: 'A platform-specific category identifier that describes the type of application.',
          examples: [
            'EDUCATION_AND_REFERENCE'
          ],
          default: ''
        },
        keywords: {
          type: [
            'array'
          ],
          title: 'Keywords',
          description: 'A list of keywords to be used in publishing to allow platform users to find the application through search.',
          default: [],
          items: {
            type: 'string',
            title: 'Keyword',
            description: 'A keyword string used in the keywords array.',
            examples: [
              'hello world',
              'demo',
              'entertainment',
              'fun'
            ]
          }
        },
        termsOfUseUrl: {
          type: [
            'string'
          ],
          title: 'Terms of Use URL',
          description: 'A publicly-accessible URL to a terms of use webpage for the application.',
          default: '',
          examples: [
            'https://website.for.application/tos.html'
          ]
        },
        privacyPolicyUrl: {
          type: [
            'string'
          ],
          title: 'Privacy Policy URL',
          description: 'A publicly-accessible URL to a privacy policy webpage for the application',
          default: '',
          examples: [
            'https://website.for.application/privacy.html'
          ]
        },
        testingInstructions: {
          $id: '#/properties/testingInstructions',
          type: [ 'string' ],
          title: 'Testing Instructions',
          description: 'Instructions to help a platform to review an application.',
          examples: [
            'Say Hello'
          ],
          default: ''
        },
      }
    },
    targetPlatforms: {
      $id: '#/properties/targetPlatforms',
      type: 'array',
      items: {
        $id: '#/properties/targetPlatforms/items',
        title: 'Target Platforms',
        description: 'Platforms to build manifests and models for.  (e.g. alexa, dialogflow)',
        examples: [
          'alexa',
          'dialogflow'
        ]
      },
      default: []
    },
    targetLocales: {
      $id: '#/properties/targetLocales',
      type: [ 'array' ],
      items: {
        $id: '#/properties/targetLocales/items',
        type: [
          'string',
          'object'
        ],
        title: 'Target Locales',
        description: 'A list of i18n locale codes to build models for.',
        examples: [
          'en-US',
          'fr-FR',
          'de-DE'
        ]
      },
      default: []
    },
    distributionCountries: {
      $id: '#/properties/distributionCountries',
      type: [ 'array' ],
      items: {
        $id: '#/properties/distributionCountries/items',
        type: [
          'string',
          'object'
        ],
        title: 'Distribution Countries',
        description: 'A list if ISO 3166-2 abbreviations that tell platforms where to geographically make an application available.',
        'default': [],
        examples: [
          'US',
          'CA'
        ]
      },
      default: []
    },
    smallIconUrl: {
      $id: '#/properties/smallIconUrl',
      type: [
        'string'
      ],
      title: 'Small Icon URL',
      description: 'A URL to a small icon image file.  Suggested dimensions: 192x192px',
      examples: [
        'https://storage.example/smallIcon.png'
      ],
      default: ''
    },
    largeIconUrl: {
      $id: '#/properties/largeIconUrl',
      type: [
        'string'
      ],
      title: 'Large Icon URL',
      description: 'A URL to a large icon image file.  Suggested dimensions: 512x512px',
      examples: [
        'https://storage.example/largeIcon.png'
      ],
      default: ''
    },
    bannerUrl: {
      $id: '#/properties/bannerUrl',
      type: [ 'string' ],
      title: 'Banner URL',
      description: 'A URL to a large banner image file.  Suggested dimensions: 1920x1080px',
      examples: [
        'https://storage.example/banner.png'
      ],
      default: ''
    },
    isPrivate: {
      $id: '#/properties/isPrivate',
      type: [ 'boolean' ],
      title: 'Is Private',
      description: 'Indicates if an application should only be available to the developer.',
      default: true
    },
    allowsPurchases: {
      $id: '#/properties/allowsPurchases',
      type: [
        'boolean',
      ],
      title: 'Allows Purchases',
      description: 'Indicates if a related applications need permission to make in-app purchases.',
      default: false
    },
    usesPersonalInfo: {
      $id: '#/properties/usesPersonalInfo',
      type: [
        'boolean'
      ],
      title: 'Uses Personal Info',
      description: 'Indicates if related applications need permission to access a user\'s personal info.',
      default: false
    },
    isChildDirected: {
      $id: '#/properties/isChildDirected',
      type: [
        'boolean',
      ],
      title: 'Is Child Directed',
      description: 'Indicates if an application is directed towards children.',
      default: false
    },
    isExportCompliant: {
      $id: '#/properties/isExportCompliant',
      type: [
        'boolean'
      ],
      title: 'Is Export Compliant',
      description: 'Indicates if an application can be exported to any region.',
      default: false
    },
    containsAds: {
      $id: '#/properties/containsAds',
      type: [
        'boolean'
      ],
      title: 'Contains Ads',
      description: 'Indicates if the application contains ads.',
      default: false
    },
    sourceDir: {
      $id: '#/properties/sourceDir',
      type: [
        'string',
      ],
      title: 'Source Directory',
      description: 'A directory path, relative to the location of the manifest, where the application source code lives.',
      examples: [
        '.'
      ]
    },
    outputDir: {
      $id: '#/properties/outputDir',
      type: [
        'string'
      ],
      title: 'Output Directory',
      description: 'A directory path, relative to the location of the manifest, where built manifests and models will be written.  This directory doesn\'t have to exist prior to building.',
      'default': './dist',
      examples: [
        './dist'
      ]
    },
    apis: {
      $id: '#/properties/apis',
      type: [
        'object'
      ],
      additionalProperties: false,
      title: 'APIs',
      description: 'Defines a standard set of APIs for platforms to access the application.',
      default: {},
      properties: {
        application: {
          $ref: '#/definitions/api',
          title: 'Application',
          description: 'An API definition for an application with a custom interaction model.',
        },
        feed: {
          $ref: '#/definitions/api',
          title: 'Feed',
          description: 'An API definition for an endpoint that returns a feed.  For example, you would configure this API if your application is an Alexa Flash Briefing skill.'
        },
        automation: {
          $ref: '#/definitions/api',
          title: 'Automation',
          description: 'An API definition for an application intended for home automation.  For example, you would configure this API if your application is an Alexa Smart Home skill.'
        },
        list: {
          $ref: '#/definitions/api',
          title: 'List',
          description: 'An API definition for an application intended for managing a user\'s lists.'
        },
        music: {
          $ref: '#/definitions/api',
          title: 'Music',
          description: 'An API definition for an application that integrates with a platform\'s music API.'
        },
        video: {
          $ref: '#/definitions/api',
          title: 'Video',
          description: 'An API definition for an application that integrates with a platform\'s video API.'
        }
      }
    },
    languageModel: (function(){
      const modelSchema = require('./language-model');
      modelSchema.description += '  This property is optional and can be used instead of a `bisque-manifest` file.  If a `bisque-manifest` file is present, that will always be used instead.';
      return modelSchema;
    })()
  },
  definitions: {
    api: {
      type: [
        'object'
      ],
      title: 'API',
      description: 'Defines a standard API for platforms to access the application.',
      properties: {
        uri: {
          type: [
            'string'
          ],
          title: 'URI',
          description: 'A webhook URL or service identifier that platforms can use to make calls to the application.',
          examples: [
            'https://application.example/myApp'
          ],
          default: ''
        },
        httpHeaders: {
          type: [
            'object'
          ],
          title: 'HTTP Headers',
          description: 'Headers for the platform to use in HTTP requests to the application.'
        },
        sslCertificateType: {
          type: [
            'string',
          ],
          title: 'SSL Certificate Type',
          description: 'The type of SSL certificate used by the URI.',
          'default': 'Wildcard',
          examples: [
            'Trusted',
            'SelfSigned',
            'Wildcard'
          ],
          default: 'Wildcard'
        },
        regions: {
          $id: '#/properties/application/properties/regions',
          type: [
            'array'
          ],
          title: 'Regions',
          description: 'A list if ISO 3166-2 abbreviations that tell platforms what regions are supported by the API.',
          items: {
            type: 'string',
            examples: [
              'US'
            ]
          }
        },
        apiVersion: {
          $id: '#/properties/application/properties/apiVersion',
          type: [
            'string'
          ],
          title: 'The version of the API protocol that the application will respond to.'
        },
        locales: {
          type: [
            'array'
          ],
          title: 'Locales',
          description: 'A list of i18n locale codes to indicate what locales are supported by the API.',
          items: {
            type: 'string',
            examples: [
              'en-US',
              'de-DE'
            ]
          }
        },
        contentType: {
          $id: '#/properties/application/properties/contentType',
          type: [
            'string'
          ],
          title: 'Content Type',
          description: 'Signifies the content type of the responses returned by the API.',
          examples: [
            'application/json'
          ]
        },
        preamble: {
          $id: '#/properties/application/properties/preamble',
          type: [
            'string'
          ],
          title: 'Preamble',
          description: 'If supported, a preamble text that will be read/sent to applications users before the initial API response is used by the platform.',
          examples: [
            'Welcome to my flash briefing.'
          ]
        },
        updateFrequency: {
          $id: '#/properties/application/properties/updateFrequency',
          type: [
            'string'
          ],
          anyOf: [
            {
              $ref: '#/definitions/resolver'
            },
            {
              type: [
                'string'
              ]
            }
          ],
          title: 'Update Frequency',
          'default': 'If applicable, the update frequency of the data returned from the API.  Usually used for a List API.',
          examples: [
            'hourly'
          ]
        }
      }
    },
    resolver: {
      $id: '#/definitions/resolver',
      type: 'object',
      title: 'Resolver',
      additionalProperties: false,
      description: 'A resolver object is used to resolve a property based on different targets such as platform and locale.  For example, when building a manifest file to multiple platforms, a resolver object can be used to give a manifest property different values depending on the platform currently being built for.  A value set for a resolver property can also be another Resolver object.',
      properties: {
        'default': {
          title: 'Default',
          description: 'A default property value to always apply if not resolved by another resolver property such as `byLocale` or `byPlatform`.',
          anyOf: [
            {
              not: {
                type: 'object'
              }
            },
            {
              type: 'object',
              not: {
                required: [
                  'default',
                  'byLocale',
                  'byPlatform'
                ]
              }
            },
            {
              $ref: '#/definitions/resolver'
            }
          ]
        },
        byLocale: {
          $id: '#/properties/byLocale',
          title: 'By Locale',
          type: 'object',
          description: 'Resolves a property value based on the contextual locale being targeted.  This will not resolve for objects that are not locale-specific such as the manifest.',
          patternProperties: {
            '^[a-z]{2}\-[A-Z]{2}$': {
              title: 'Locale-specific Value',
              description: 'The locale-specific value to resolve to, the property name being an i18n locale code. (e.g. \'en-US\', \'de-DE\').',
              anyOf: [
                {
                  not: {
                    type: 'object'
                  }
                },
                {
                  $ref: '#/definitions/resolver'
                }
              ]
            }
          }
        },
        byPlatform: {
          title: 'By Platform',
          description: 'Resolves a property value based on the contextual platform being targeted.  This will not resolve if the context is not platform-specific.',
          patternProperties: {
            '^[a-z]*$': {
              title: 'Platform-specific Value',
              description: 'The platform-specific value to resolve to, the property name being the name of a platform in all-lowercase. (e.g. \'alexa\', \'dialogflow\').',
              anyOf: [
                {
                  not: {
                    type: 'object'
                  }
                },
                {
                  $ref: '#/definitions/resolver'
                }
              ]
            }
          }
        }
      }
    }
  }
};

