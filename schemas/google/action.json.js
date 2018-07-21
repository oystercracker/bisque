module.exports = {
  $id: 'https://developers.google.com/actions/reference/rest/Shared.Types/ActionPackage',
  type: 'object',
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: {
    manifest: {
      $id: '/properties/manifest',
      type: 'object',
      required: ['displayName', 'invocationName', 'category', 'voiceName'],
      description: 'The details of the App. This is where the directory listing is kept as well as other App identification like displayName.',
      properties: {
        displayName: {
          $id: '/properties/manifest/properties/displayName',
          type: 'string',
          title: 'Display Name',
          description: 'The default display name for this Agent (if there is not a translation available), e.g. "Starbucks". This is also used as a method for users to invoke this Agent (in addition to invocationName). The display name must be unique and phonetically very similar to invocationName.',
          default: ''
        },
        invocationName: {
          $id: '/properties/manifest/properties/invocationName',
          type: 'string',
          title: 'Invocation Name',
          default: '',
          description: 'This is the unique name for this Agent to directly invoke it within a voice (spoken) context. Policies require that the invocation name is phonetically very similar to the displayName field.'
        },
        shortDescription: {
          $id: '/properties/manifest/properties/shortDescription',
          type: 'string',
          title: 'Short Description',
          description: 'The default short description for the Agent (if there is not a translation available). This is limited to 80 characters (consistent with Play store).'
        },
        longDescription: {
          $id: '/properties/manifest/properties/longDescription',
          type: 'string',
          title: 'Long Description',
          description: 'The default long description for the Agent (if there is not a translation available). This is limited to 4000 characters (consistent with Play store).'
        },
        category: {
          $id: '/properties/manifest/properties/category',
          type: 'string',
          title: 'Category',
          default: '',
          description: 'The category for the Agent. The value must be one of the allowed categories for Agents. See the Actions on Google console for the list of allowed categories.'
        },
        smallSquareLogoUrl: {
          $id: '/properties/manifest/properties/smallSquareLogoUrl',
          type: 'string',
          title: 'Small Square Logo URL',
          description: 'Small square image. The dimensions must be 192px by 192px.'
        },
        largeLandscapeLogoUrl: {
          $id: '/properties/manifest/properties/largeLandscapeLogoUrl',
          type: 'string',
          title: 'Large Landscape Logo URL',
          description: 'Large landscape image. The dimensions musst be 2208px by 1242px.'
        },
        companyName: {
          $id: '/properties/manifest/properties/companyName',
          type: 'string',
          title: 'Company Name',
          description: 'The name of the company that the Agent is associated with.'
        },
        contactEmail: {
          $id: '/properties/manifest/properties/contactEmail',
          type: 'string',
          title: 'Contact Email',
          description: 'The contact email address to allow users to reach out regarding the Agent.'
        },
        termsOfServiceUrl: {
          $id: '/properties/manifest/properties/termsOfServiceUrl',
          type: 'string',
          title: 'Terms of Service URL',
          description: 'The URL to the ToS (Terms of Service) for the Agent.'
        },
        privacyUrl: {
          $id: '/properties/manifest/properties/privacyUrl',
          type: 'string',
          title: 'Privacy URL',
          description: 'The URL for the Agent\'s privacy policy.'
        },
        sampleInvocation: {
          $id: '/properties/manifest/properties/sampleInvocation',
          type: 'array',
          name: 'Sample Invocation',
          description: 'Sample invocation phrase displayed as part of Agent description in the directory of all Agents. Only 5 values can be given.',
          items: {
            $id: '/properties/manifest/properties/sampleInvocation/items',
            type: 'string',
            title: 'Invocation',
            examples: [
              'open my app',
              'ask my app'
            ]
          }
        },
        introduction: {
          $id: '/properties/manifest/properties/introduction',
          type: 'string',
          title: 'The Introduction Schema ',
        },
        testingInstructions: {
          $id: '/properties/manifest/properties/testingInstructions',
          type: 'string',
          title: 'The Testinginstructions Schema ',
        },
        voiceName: {
          $id: '/properties/manifest/properties/voiceName',
          type: 'string',
          title: 'The Voicename Schema ',
          default: ''
        },
        surfaceRequirements: {
          $id: '/properties/manifest/properties/surfaceRequirements',
          type: 'object',
          properties: {
            minimumCapabilities: {
              $id: '/properties/manifest/properties/surfaceRequirements/properties/minimumCapabilities',
              type: 'array',
              items: {
                $id: '/properties/manifest/properties/surfaceRequirements/properties/minimumCapabilities/items',
                type: 'object',
                properties: {
                  name: {
                    $id: '/properties/manifest/properties/surfaceRequirements/properties/minimumCapabilities/items/properties/name',
                    type: 'string',
                    title: 'The Name Schema ',
                  }
                }
              }
            }
          }
        }
      }
    },
    accountLinking: {
      $id: '/properties/accountLinking',
      type: 'object',
      description: 'The details for account linking on this App.',
      properties: {
        clientId: {
          $id: '/properties/accountLinking/properties/clientId',
          type: 'string',
          title: 'Client ID'
        },
        clientSecret: {
          $id: '/properties/accountLinking/properties/clientSecret',
          type: 'string',
          title: 'Client Secret'
        },
        grantType: {
          $id: '/properties/accountLinking/properties/grantType',
          type: 'string',
          title: 'Grant Type'
        },
        authenticationUrl: {
          $id: '/properties/accountLinking/properties/authenticationUrl',
          type: 'string',
          title: 'Authentication URL'
        },
        accessTokenUrl: {
          $id: '/properties/accountLinking/properties/accessTokenUrl',
          type: 'string',
          title: 'Access Token URL'
        },
        scopes: {
          $id: '/properties/accountLinking/properties/scopes',
          type: 'array',
          title: 'Scopes',
          items: {
            $id: '/properties/accountLinking/properties/scopes/items',
            type: 'string',
            title: 'Scope'
          }
        },
        scopeExplanationUrl: {
          $id: '/properties/accountLinking/properties/scopeExplanationUrl',
          type: 'string',
          title: 'Scope Explanation URL'
        },
        googleSignInClientId: {
          $id: '/properties/accountLinking/properties/googleSignInClientId',
          type: 'string',
          title: 'Google Sign In Client ID'
        },
        assertionTypes: {
          $id: '/properties/accountLinking/properties/assertionTypes',
          type: 'array',
          title: 'Assertion Types',
          items: {
            $id: '/properties/accountLinking/properties/assertionTypes/items',
            type: 'string',
            title: 'Assertion Type'
          }
        }
      }
    },
    actions: {
      $id: '/properties/actions',
      type: 'array',
      description: 'List of actions the App is able to handle.',
      items: {
        $id: '/properties/actions/items',
        type: 'object',
        properties: {
          description: {
            $id: '/properties/actions/items/properties/description',
            type: 'string',
            title: 'Description'
          },
          name: {
            $id: '/properties/actions/items/properties/name',
            type: 'string',
            title: 'Name',
            default: '',
            examples: [
              'MAIN'
            ]
          },
          fulfillment: {
            $id: '/properties/actions/items/properties/fulfillment',
            type: 'object',
            properties: {
              conversationName: {
                $id: '/properties/actions/items/properties/fulfillment/properties/conversationName',
                type: 'string',
                title: 'Conversation Name',
                default: '',
                examples: [
                  'conversation_1'
                ]
              }
            }
          },
          intent: {
            $id: '/properties/actions/items/properties/intent',
            type: 'object',
            properties: {
              name: {
                $id: '/properties/actions/items/properties/intent/properties/name',
                type: 'string',
                title: 'The Name Schema ',
                default: '',
                examples: [
                  'actions.intent.MAIN'
                ]
              },
              trigger: {
                $id: '/properties/actions/items/properties/intent/properties/trigger',
                type: 'object',
                properties: {
                  queryPatterns: {
                    $id: '/properties/actions/items/properties/intent/properties/trigger/properties/queryPatterns',
                    type: 'array',
                    items: {
                      $id: '/properties/actions/items/properties/intent/properties/trigger/properties/queryPatterns/items',
                      type: 'string',
                      title: 'Query Pattern',
                      examples: [
                        'talk to illuminate me'
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    types: {
      $id: '/properties/types',
      type: 'array',
      description: 'List of types defined by the developer.',
      items: {
        $id: '/properties/types/items',
        type: 'object',
        properties: {
          name: {
            $id: '/properties/types/items/properties/name',
            type: 'string',
            title: 'The Name Schema '
          },
          entities: {
            $id: '/properties/types/items/properties/entities',
            type: 'array',
            items: {
              $id: '/properties/types/items/properties/entities/items',
              type: 'object',
              properties: {
                key: {
                  $id: '/properties/types/items/properties/entities/items/properties/key',
                  type: 'string',
                  title: 'The Key Schema '
                },
                synonyms: {
                  $id: '/properties/types/items/properties/entities/items/properties/synonyms',
                  type: 'array',
                  items: {
                    $id: '/properties/types/items/properties/entities/items/properties/synonyms/items',
                    type: 'string',
                    title: 'The 0th Schema '
                  }
                }
              }
            }
          },
          isUserDefined: {
            $id: '/properties/types/items/properties/isUserDefined',
            type: 'boolean',
            title: 'The Isuserdefined Schema ',
            default: false
          }
        }
      }
    },
    types: {
      $id: '/properties/types',
      type: 'array',
      name: 'Entity Types',
      items: {
        $id: '/properties/types/items',
        type: 'object',
        properties: {
          name: {
            $id: '/properties/types/items/properties/name',
            type: 'string',
            title: 'Name',
            description: 'The name of the entity type.  It must start with a $ symbol.',
            examples: [
              '$Flavor'
            ]
          },
          entities: {
            $id: '/properties/types/items/properties/entities',
            type: 'array',
            items: {
              $id: '/properties/types/items/properties/entities/items',
              type: 'object',
              required: ['key', 'synonyms'],
              properties: {
                key: {
                  $id: '/properties/types/items/properties/entities/items/properties/key',
                  type: 'string',
                  title: 'Key',
                  examples: [
                    'chocolate'
                  ]
                },
                synonyms: {
                  $id: '/properties/types/items/properties/entities/items/properties/synonyms',
                  type: 'array',
                  items: {
                    $id: '/properties/types/items/properties/entities/items/properties/synonyms/items',
                    type: 'string',
                    title: 'Synonyms',
                    examples: [
                      'chocolate',
                      'fudge',
                      'cocoa',
                      'cacao'
                    ]
                  }
                }
              }
            }
          },
          isUserDefined: {
            $id: '/properties/types/items/properties/isUserDefined',
            type: 'boolean',
            title: 'Is User Defined',
            default: true
          }
        }
      }
    },
    conversations: {
      $id: '/properties/conversations',
      type: 'object',
      description: 'Map conversations that can be shared across Actions. For example see the conversationName in Fulfillment.',
      properties: {
        conversation_1: {
          $id: '/properties/conversations/properties/conversation_1',
          type: 'object',
          properties: {
            name: {
              $id: '/properties/conversations/properties/conversation_1/properties/name',
              type: 'string',
              title: 'The Name Schema ',
              default: '',
              examples: [
                'conversation_1'
              ]
            },
            url: {
              $id: '/properties/conversations/properties/conversation_1/properties/url',
              type: 'string',
              title: 'The Url Schema ',
              examples: [
                'https://94d35685.ngrok.io'
              ]
            },
            inDialogIntents: {
              $id: '/properties/conversations/properties/api.ai/properties/inDialogIntents',
              type: 'array',
              items: {
                $id: '/properties/conversations/properties/api.ai/properties/inDialogIntents/items',
                type: 'object',
                required: ['name', 'trigger'],
                properties: {
                  name: {
                    $id: '/properties/conversations/properties/api.ai/properties/inDialogIntents/items/properties/name',
                    type: 'string',
                    title: 'Name',
                    description: 'An intent name',
                  },
                  trigger: {
                    $id: '/properties/conversations/properties/api.ai/properties/inDialogIntents/items/properties/trigger',
                    type: 'object',
                    properties: {
                      queryPatterns: {
                        $id: '/properties/conversations/properties/api.ai/properties/inDialogIntents/items/properties/trigger/properties/queryPatterns',
                        type: 'array',
                        items: {
                          $id: '/properties/conversations/properties/api.ai/properties/inDialogIntents/items/properties/trigger/properties/queryPatterns/items',
                          type: 'string',
                          title: 'Query Pattern',
                        }
                      }
                    }
                  }
                }
              }
            },
            fulfillmentApiVersion: {
              $id: '/properties/conversations/properties/conversation_1/properties/fulfillmentApiVersion',
              type: 'integer',
              title: 'The Fulfillmentapiversion Schema ',
              default: 2
            }
          }
        }
      }
    }
  }
};

