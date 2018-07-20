module.exports = {
  type: 'object',
  name: 'Dialogflow Intent JSON',
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  required: ['id', 'name', 'contexts', 'responses', 'auto'],
  properties: {
    id: {
      $id: '/properties/id',
      type: 'string',
      title: 'ID',
      default: '',
      description: 'A version 4 RFC 4122 variant GUID for the intent.',
      examples: [
        '1ae0f2c1-4cdb-45c8-b0d5-f692f153bd85'
      ]
    },
    name: {
      $id: '/properties/name',
      type: 'string',
      title: 'Name',
      default: '',
      pattern: '^[A-Za-z\s]*$',
      examples: [
        'Flight Information Intent'
      ]
    },
    auto: {
      $id: '/properties/auto',
      type: 'boolean',
      title: 'Auto',
      default: true
    },
    contexts: {
      $id: '/properties/contexts',
      type: 'array'
    },
    responses: {
      $id: '/properties/responses',
      type: 'array',
      items: {
        $id: '/properties/responses/items',
        type: 'object',
        required: ['resetContexts', 'affectedContexts', 'parameters', 'messages', 'defaultResponsePlatforms', 'speech'],
        properties: {
          resetContexts: {
            $id: '/properties/responses/items/properties/resetContexts',
            type: 'boolean',
            title: 'Reset Contexts',
            default: false
          },
          action: {
            $id: '/properties/responses/items/properties/action',
            type: 'string',
            title: 'Action',
            description: 'The name of a Google Action',
            examples: [
              'input.welcome'
            ]
          },
          affectedContexts: {
            $id: '/properties/responses/items/properties/affectedContexts',
            type: 'array',
            title: 'Affected Contexts',
            items: {
              $id: '/properties/responses/items/properties/affectedContexts/items',
              type: 'object',
              required: ['name', 'parameters', 'lifespan'],
              properties: {
                name: {
                  $id: '/properties/responses/items/properties/affectedContexts/items/properties/name',
                  type: 'string',
                  title: 'Name',
                  description: 'The name of a context.',
                  examples: [
                    'DefaultWelcomeIntent-followup'
                  ]
                },
                parameters: {
                  $id: '/properties/responses/items/properties/affectedContexts/items/properties/parameters',
                  type: 'object'
                },
                lifespan: {
                  $id: '/properties/responses/items/properties/affectedContexts/items/properties/lifespan',
                  type: 'integer',
                  title: 'The lifespan of the context in minutes.',
                  default: 5
                }
              }
            }
          },
          parameters: {
            $id: '/properties/responses/items/properties/parameters',
            type: 'array'
          },
          messages: {
            $id: '/properties/responses/items/properties/messages',
            type: 'array',
            items: {
              $id: '/properties/responses/items/properties/messages/items',
              type: 'object',
              required: ['type', 'lang', 'speech'],
              properties: {
                type: {
                  $id: '/properties/responses/items/properties/messages/items/properties/type',
                  type: 'integer',
                  title: 'Type',
                  default: 0,
                  examples: [
                    0
                  ]
                },
                lang: {
                  $id: '/properties/responses/items/properties/messages/items/properties/lang',
                  type: 'string',
                  title: 'Lang',
                  default: 'en',
                  examples: [
                    'en'
                  ]
                },
                speech: {
                  $id: '/properties/responses/items/properties/messages/items/properties/speech',
                  type: 'array',
                  items: {
                    $id: '/properties/responses/items/properties/messages/items/properties/speech/items',
                    type: 'string',
                    examples: [
                      'Hi!',
                      'Hello!',
                      'Good day!',
                      'Greetings!'
                    ]
                  }
                }
              }
            }
          },
          defaultResponsePlatforms: {
            $id: '/properties/responses/items/properties/defaultResponsePlatforms',
            type: 'object',
            properties: {
              google: {
                $id: '/properties/responses/items/properties/defaultResponsePlatforms/properties/google',
                type: 'boolean',
                title: 'Google',
                default: false
              }
            }
          },
          speech: {
            $id: '/properties/responses/items/properties/speech',
            type: 'array'
          }
        }
      }
    },
    priority: {
      $id: '/properties/priority',
      type: 'integer',
      title: 'Priority',
      default: 500000
    },
    webhookUsed: {
      $id: '/properties/webhookUsed',
      type: 'boolean',
      title: 'Webhook Used',
      default: true
    },
    webhookForSlotFilling: {
      $id: '/properties/webhookForSlotFilling',
      type: 'boolean',
      title: 'Webhook Used For Slot Filling',
      default: false
    },
    lastUpdate: {
      $id: '/properties/lastUpdate',
      type: 'integer',
      title: 'Last Update',
      default: 0,
      examples: [
        1531347685
      ]
    },
    fallbackIntent: {
      $id: '/properties/fallbackIntent',
      type: 'boolean',
      title: 'The Fallbackintent Schema ',
      default: false
    },
    events: {
      $id: '/properties/events',
      type: 'array',
      items: {
        $id: '/properties/events/items',
        type: 'object',
        properties: {
          name: {
            $id: '/properties/events/items/properties/name',
            type: 'string',
            title: 'Name',
            examples: [
              'GOOGLE_ASSISTANT_WELCOME'
            ]
          }
        }
      }
    }
  }
};

