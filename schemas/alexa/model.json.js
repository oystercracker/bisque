module.exports = {
  $id: 'http://example.com/example.json',
  type: 'object',
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: {
    interactionModel: {
      $id: '/properties/interactionModel',
      type: 'object',
      properties: {
        languageModel: {
          $id: '/properties/interactionModel/properties/languageModel',
          type: 'object',
          properties: {
            invocationName: {
              $id: '/properties/interactionModel/properties/languageModel/properties/invocationName',
              type: 'string',
              title: 'The Invocationname Schema ',
              'default': '',
              examples: [
                'my space facts'
              ]
            },
            intents: {
              $id: '/properties/interactionModel/properties/languageModel/properties/intents',
              type: 'array',
              items: {
                $id: '/properties/interactionModel/properties/languageModel/properties/intents/items',
                type: 'object',
                properties: {
                  name: {
                    $id: '/properties/interactionModel/properties/languageModel/properties/intents/items/properties/name',
                    type: 'string',
                    title: 'The Name Schema ',
                    'default': '',
                    examples: [
                      'AMAZON.CancelIntent'
                    ]
                  },
                  samples: {
                    $id: '/properties/interactionModel/properties/languageModel/properties/intents/items/properties/samples',
                    type: 'array'
                  }
                }
              }
            },
            types: {
              $id: '/properties/interactionModel/properties/languageModel/properties/types',
              type: 'array',
              items: {
                $id: '/properties/interactionModel/properties/languageModel/properties/types/items',
                type: 'object',
                properties: {
                  name: {
                    $id: '/properties/interactionModel/properties/languageModel/properties/types/items/properties/name',
                    type: 'string',
                    title: 'The Name Schema ',
                    'default': '',
                    examples: [
                      'Planet'
                    ]
                  },
                  values: {
                    $id: '/properties/interactionModel/properties/languageModel/properties/types/items/properties/values',
                    type: 'array',
                    items: {
                      $id: '/properties/interactionModel/properties/languageModel/properties/types/items/properties/values/items',
                      type: 'object',
                      properties: {
                        name: {
                          $id: '/properties/interactionModel/properties/languageModel/properties/types/items/properties/values/items/properties/name',
                          type: 'object',
                          properties: {
                            value: {
                              $id: '/properties/interactionModel/properties/languageModel/properties/types/items/properties/values/items/properties/name/properties/value',
                              type: 'string',
                              title: 'The Value Schema ',
                              'default': '',
                              examples: [
                                'Mercury'
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
        dialog: {
          $id: '/properties/interactionModel/properties/dialog',
          type: 'object',
          properties: {
            intents: {
              $id: '/properties/interactionModel/properties/dialog/properties/intents',
              type: 'array',
              items: {
                $id: '/properties/interactionModel/properties/dialog/properties/intents/items',
                type: 'object',
                properties: {
                  name: {
                    $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/name',
                    type: 'string',
                    title: 'The Name Schema ',
                    'default': '',
                    examples: [
                      'GetTravelTime'
                    ]
                  },
                  confirmationRequired: {
                    $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/confirmationRequired',
                    type: 'boolean',
                    title: 'The Confirmationrequired Schema ',
                    'default': false,
                    examples: [
                      false
                    ]
                  },
                  prompts: {
                    $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/prompts',
                    type: 'object'
                  },
                  slots: {
                    $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots',
                    type: 'array',
                    items: {
                      $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots/items',
                      type: 'object',
                      properties: {
                        name: {
                          $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots/items/properties/name',
                          type: 'string',
                          title: 'The Name Schema ',
                          'default': '',
                          examples: [
                            'DepartingPlanet'
                          ]
                        },
                        type: {
                          $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots/items/properties/type',
                          type: 'string',
                          title: 'The Type Schema ',
                          'default': '',
                          examples: [
                            'Planet'
                          ]
                        },
                        confirmationRequired: {
                          $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots/items/properties/confirmationRequired',
                          type: 'boolean',
                          title: 'The Confirmationrequired Schema ',
                          'default': false,
                          examples: [
                            false
                          ]
                        },
                        elicitationRequired: {
                          $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots/items/properties/elicitationRequired',
                          type: 'boolean',
                          title: 'The Elicitationrequired Schema ',
                          'default': false,
                          examples: [
                            true
                          ]
                        },
                        prompts: {
                          $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots/items/properties/prompts',
                          type: 'object',
                          properties: {
                            elicitation: {
                              $id: '/properties/interactionModel/properties/dialog/properties/intents/items/properties/slots/items/properties/prompts/properties/elicitation',
                              type: 'string',
                              title: 'The Elicitation Schema ',
                              'default': '',
                              examples: [
                                'Elicit.Intent-GetTravelTime.IntentSlot-DepartingPlanet'
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
        prompts: {
          $id: '/properties/interactionModel/properties/prompts',
          type: 'array',
          items: {
            $id: '/properties/interactionModel/properties/prompts/items',
            type: 'object',
            properties: {
              id: {
                $id: '/properties/interactionModel/properties/prompts/items/properties/id',
                type: 'string',
                title: 'The Id Schema ',
                'default': '',
                examples: [
                  'Elicit.Intent-GetTravelTime.IntentSlot-DepartingPlanet'
                ]
              },
              variations: {
                $id: '/properties/interactionModel/properties/prompts/items/properties/variations',
                type: 'array',
                items: {
                  $id: '/properties/interactionModel/properties/prompts/items/properties/variations/items',
                  type: 'object',
                  properties: {
                    type: {
                      $id: '/properties/interactionModel/properties/prompts/items/properties/variations/items/properties/type',
                      type: 'string',
                      title: 'The Type Schema ',
                      'default': '',
                      examples: [
                        'PlainText'
                      ]
                    },
                    value: {
                      $id: '/properties/interactionModel/properties/prompts/items/properties/variations/items/properties/value',
                      type: 'string',
                      title: 'The Value Schema ',
                      'default': '',
                      examples: [
                        'Which planet are you starting from?'
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
};

