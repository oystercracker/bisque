module.exports = {
  type: 'object',
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: {
    manifest: {
      $id: '/properties/manifest',
      type: 'object',
      properties: {
        publishingInformation: {
          $id: '/properties/manifest/properties/publishingInformation',
          type: 'object',
          properties: {
            locales: {
              $id: '/properties/manifest/properties/publishingInformation/properties/locales',
              type: 'object',
              properties: {
                'en-US': {
                  $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US',
                  type: 'object',
                  properties: {
                    summary: {
                      $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/summary',
                      type: 'string',
                      title: 'The Summary Schema ',
                      'default': '',
                      examples: [
                        'This is a sample Alexa custom skill.'
                      ]
                    },
                    examplePhrases: {
                      $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/examplePhrases',
                      type: 'array',
                      items: {
                        $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/examplePhrases/items',
                        type: 'string',
                        title: 'The 0th Schema ',
                        'default': '',
                        examples: [
                          'Alexa, open sample custom skill.',
                          'Alexa, play sample custom skill.'
                        ]
                      }
                    },
                    keywords: {
                      $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/keywords',
                      type: 'array',
                      items: {
                        $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/keywords/items',
                        type: 'string',
                        title: 'The 0th Schema ',
                        'default': '',
                        examples: [
                          'Descriptive_Phrase_1',
                          'Descriptive_Phrase_2',
                          'Descriptive_Phrase_3'
                        ]
                      }
                    },
                    smallIconUri: {
                      $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/smallIconUri',
                      type: 'string',
                      title: 'The Smalliconuri Schema ',
                      'default': '',
                      examples: [
                        'https://smallUri.com'
                      ]
                    },
                    largeIconUri: {
                      $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/largeIconUri',
                      type: 'string',
                      title: 'The Largeiconuri Schema ',
                      'default': '',
                      examples: [
                        'https://largeUri.com'
                      ]
                    },
                    name: {
                      $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/name',
                      type: 'string',
                      title: 'The Name Schema ',
                      'default': '',
                      examples: [
                        'Sample custom skill name.'
                      ]
                    },
                    description: {
                      $id: '/properties/manifest/properties/publishingInformation/properties/locales/properties/en-US/properties/description',
                      type: 'string',
                      title: 'The Description Schema ',
                      'default': '',
                      examples: [
                        'This skill does interesting things.'
                      ]
                    }
                  }
                }
              }
            },
            isAvailableWorldwide: {
              $id: '/properties/manifest/properties/publishingInformation/properties/isAvailableWorldwide',
              type: 'boolean',
              title: 'The Isavailableworldwide Schema ',
              'default': false,
              examples: [
                false
              ]
            },
            testingInstructions: {
              $id: '/properties/manifest/properties/publishingInformation/properties/testingInstructions',
              type: 'string',
              title: 'The Testinginstructions Schema ',
              'default': '',
              examples: [
                '1) Say \'Alexa, hello world\''
              ]
            },
            category: {
              $id: '/properties/manifest/properties/publishingInformation/properties/category',
              type: 'string',
              title: 'The Category Schema ',
              'default': '',
              examples: [
                'HEALTH_AND_FITNESS'
              ]
            },
            distributionCountries: {
              $id: '/properties/manifest/properties/publishingInformation/properties/distributionCountries',
              type: 'array',
              items: {
                $id: '/properties/manifest/properties/publishingInformation/properties/distributionCountries/items',
                type: 'string',
                title: 'The 0th Schema ',
                'default': '',
                examples: [
                  'US',
                  'GB',
                  'DE'
                ]
              }
            }
          }
        },
        apis: {
          $id: '/properties/manifest/properties/apis',
          type: 'object',
          properties: {
            custom: {
              $id: '/properties/manifest/properties/apis/properties/custom',
              type: 'object',
              properties: {
                endpoint: {
                  $id: '/properties/manifest/properties/apis/properties/custom/properties/endpoint',
                  type: 'object',
                  properties: {
                    uri: {
                      $id: '/properties/manifest/properties/apis/properties/custom/properties/endpoint/properties/uri',
                      type: 'string',
                      title: 'The Uri Schema ',
                      'default': '',
                      examples: [
                        'arn:aws:lambda:us-east-1:040623927470:function:sampleSkill'
                      ]
                    }
                  }
                },
                interfaces: {
                  $id: '/properties/manifest/properties/apis/properties/custom/properties/interfaces',
                  type: 'array',
                  items: {
                    $id: '/properties/manifest/properties/apis/properties/custom/properties/interfaces/items',
                    type: 'object',
                    properties: {
                      type: {
                        $id: '/properties/manifest/properties/apis/properties/custom/properties/interfaces/items/properties/type',
                        type: 'string',
                        title: 'The Type Schema ',
                        'default': '',
                        examples: [
                          'AUDIO_PLAYER'
                        ]
                      }
                    }
                  }
                },
                regions: {
                  $id: '/properties/manifest/properties/apis/properties/custom/properties/regions',
                  type: 'object',
                  properties: {
                    NA: {
                      $id: '/properties/manifest/properties/apis/properties/custom/properties/regions/properties/NA',
                      type: 'object',
                      properties: {
                        endpoint: {
                          $id: '/properties/manifest/properties/apis/properties/custom/properties/regions/properties/NA/properties/endpoint',
                          type: 'object',
                          properties: {
                            sslCertificateType: {
                              $id: '/properties/manifest/properties/apis/properties/custom/properties/regions/properties/NA/properties/endpoint/properties/sslCertificateType',
                              type: 'string',
                              title: 'The Sslcertificatetype Schema ',
                              'default': '',
                              examples: [
                                'Trusted'
                              ]
                            },
                            uri: {
                              $id: '/properties/manifest/properties/apis/properties/custom/properties/regions/properties/NA/properties/endpoint/properties/uri',
                              type: 'string',
                              title: 'The Uri Schema ',
                              'default': '',
                              examples: [
                                'https://customapi.sampleskill.com'
                              ]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        manifestVersion: {
          $id: '/properties/manifest/properties/manifestVersion',
          type: 'string',
          title: 'The Manifestversion Schema ',
          'default': '',
          examples: [
            '1.0'
          ]
        },
        permissions: {
          $id: '/properties/manifest/properties/permissions',
          type: 'array',
          items: {
            $id: '/properties/manifest/properties/permissions/items',
            type: 'object',
            properties: {
              name: {
                $id: '/properties/manifest/properties/permissions/items/properties/name',
                type: 'string',
                title: 'The Name Schema ',
                'default': '',
                examples: [
                  'alexa::devices:all:address:full:read'
                ]
              }
            }
          }
        },
        privacyAndCompliance: {
          $id: '/properties/manifest/properties/privacyAndCompliance',
          type: 'object',
          properties: {
            allowsPurchases: {
              $id: '/properties/manifest/properties/privacyAndCompliance/properties/allowsPurchases',
              type: 'boolean',
              title: 'The Allowspurchases Schema ',
              'default': false,
              examples: [
                false
              ]
            },
            usesPersonalInfo: {
              $id: '/properties/manifest/properties/privacyAndCompliance/properties/usesPersonalInfo',
              type: 'boolean',
              title: 'The Usespersonalinfo Schema ',
              'default': false,
              examples: [
                false
              ]
            },
            isChildDirected: {
              $id: '/properties/manifest/properties/privacyAndCompliance/properties/isChildDirected',
              type: 'boolean',
              title: 'The Ischilddirected Schema ',
              'default': false,
              examples: [
                false
              ]
            },
            isExportCompliant: {
              $id: '/properties/manifest/properties/privacyAndCompliance/properties/isExportCompliant',
              type: 'boolean',
              title: 'The Isexportcompliant Schema ',
              'default': false,
              examples: [
                true
              ]
            },
            containsAds: {
              $id: '/properties/manifest/properties/privacyAndCompliance/properties/containsAds',
              type: 'boolean',
              title: 'The Containsads Schema ',
              'default': false,
              examples: [
                false
              ]
            },
            locales: {
              $id: '/properties/manifest/properties/privacyAndCompliance/properties/locales',
              type: 'object',
              properties: {
                'en-US': {
                  $id: '/properties/manifest/properties/privacyAndCompliance/properties/locales/properties/en-US',
                  type: 'object',
                  properties: {
                    privacyPolicyUrl: {
                      $id: '/properties/manifest/properties/privacyAndCompliance/properties/locales/properties/en-US/properties/privacyPolicyUrl',
                      type: 'string',
                      title: 'The Privacypolicyurl Schema ',
                      'default': '',
                      examples: [
                        'http://www.myprivacypolicy.sampleskill.com'
                      ]
                    },
                    termsOfUseUrl: {
                      $id: '/properties/manifest/properties/privacyAndCompliance/properties/locales/properties/en-US/properties/termsOfUseUrl',
                      type: 'string',
                      title: 'The Termsofuseurl Schema ',
                      'default': '',
                      examples: [
                        'http://www.termsofuse.sampleskill.com'
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        events: {
          $id: '/properties/manifest/properties/events',
          type: 'object',
          properties: {
            endpoint: {
              $id: '/properties/manifest/properties/events/properties/endpoint',
              type: 'object',
              properties: {
                uri: {
                  $id: '/properties/manifest/properties/events/properties/endpoint/properties/uri',
                  type: 'string',
                  title: 'The Uri Schema ',
                  'default': '',
                  examples: [
                    'arn:aws:lambda:us-east-1:040623927470:function:sampleSkill'
                  ]
                }
              }
            },
            subscriptions: {
              $id: '/properties/manifest/properties/events/properties/subscriptions',
              type: 'array',
              items: {
                $id: '/properties/manifest/properties/events/properties/subscriptions/items',
                type: 'object',
                properties: {
                  eventName: {
                    $id: '/properties/manifest/properties/events/properties/subscriptions/items/properties/eventName',
                    type: 'string',
                    title: 'The Eventname Schema ',
                    'default': '',
                    examples: [
                      'SKILL_ENABLED'
                    ]
                  }
                }
              }
            },
            regions: {
              $id: '/properties/manifest/properties/events/properties/regions',
              type: 'object',
              properties: {
                NA: {
                  $id: '/properties/manifest/properties/events/properties/regions/properties/NA',
                  type: 'object',
                  properties: {
                    endpoint: {
                      $id: '/properties/manifest/properties/events/properties/regions/properties/NA/properties/endpoint',
                      type: 'object',
                      properties: {
                        uri: {
                          $id: '/properties/manifest/properties/events/properties/regions/properties/NA/properties/endpoint/properties/uri',
                          type: 'string',
                          title: 'The Uri Schema ',
                          'default': '',
                          examples: [
                            'arn:aws:lambda:us-east-1:040623927470:function:sampleSkill'
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

