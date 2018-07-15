'use strict';

module.exports = {
  type: 'object',
  title: 'Language Model',
  description: 'Specifies a model of how users can interact with the application through utterances.',
  default: {},
  definitions: {
    intent: {
      type: 'object',
      title: 'Intent',
      description: 'Defines how an intent is matched and processed.',
      properties: {
        patterns: {
          type: [
            'array'
          ],
          title: 'Patterns',
          description: 'A list of sample utterance patterns used by a platform to identify the intent.',
          examples: [
            'my favorite ice cream is {flavor}',
            'i like {flavor} ice cream',
            'i like {flavor}'
          ]
        }
      }
    },
  },
  required: [
    'invocation',
    'sampleInvocations',
    'intents',
    'slotTypes'
  ],
  additionalProperties: false,
  properties: {
    invocation: {
      $id: '#/properties/invocation',
      type: [
        'string'
      ],
      title: 'Invocation',
      description: 'The invocation phrase used by a user to activate the application.',
      default: ''
    },
    sampleInvocations: {
      $id: '#/properties/sampleInvocations',
      type: [
        'array'
      ],
      title: 'Sample Invocations',
      description: 'A list of sample uses of the invocation phrase.  These are mainly used for building manifest files.',
      default: [],
      items: {
        $id: '#/properties/sampleInvocations/items',
        type: 'string',
        title: 'Sample Invocation',
        description: 'An example usage of the invocation phrase.',
        examples: [
          'open hello world',
          'ask hello world',
          'tell hello world'
        ]
      }
    },
    intents: {
      $id: '#/properties/intents',
      type: [
        'object'
      ],
      title: 'Intents',
      description: 'An object defining how intents are matched from user utterances.  Think of intents as equivalent to \'commands\' given to an application.',
      default: {},
      patternProperties: {
        '^[A-z]*$': {
          title: 'Intent',
          type: [
            'object'
          ],
          description: 'An intent as specified by a property name.  The name should follow PascalCase with no spaces.',
          properties: {
            alias: {
              type: [
                'string'
              ],
              title: 'Alias',
              description: 'Indicates to an application reading the manifest that it should treat the intent as if it\'s another intent.  This is useful for mapping a custom intent to platform-specific intents, unifying their behavior.  When used, the alias-value will be used in place of the actual intent name inside built-out models.'
            },
            mapToRequestType: {
              type: [
                'string'
              ],
              title: 'Map To Request Type',
              description: 'Indicates to an application reading the manifest that a request type should be treated as the intent.  Currently, this concept only works with Alexa.'
            },
            patterns: {
              type: [
                'array'
              ],
              title: 'Patterns',
              description: 'A list of example utterance patterns used to train a platform to match the intent from user input.',
              items: {
                type: 'string',
                title: 'Intent Pattern',
                description: 'An example utterance used to train a platform to match an intent.  An example utterance can include placeholders for slot names as delimited between curly-braces.',
                examples: [
                  'my favorite ice cream is {flavor}',
                  'i like {flavor} ice cream',
                  'i like {flavor}',
                  'i don\'t like ice cream'
                ]
              }
            },
            slots: {
              type: [
                'object'
              ],
              title: 'Slots',
              description: 'An object defining the slots to be matched from user utterances.  Slots are essentially the \'arguments\' or \'parameters\' to an intent that are captured from what a user says.',
              patternProperties: {
                '^[a-z]*$': {
                  title: 'Slot',
                  type: [
                    'object'
                  ],
                  description: 'The definition of slots that are expected for the intent and the type it should be mapped to.  The name should follow camelCase with no spaces.',
                  required: [
                    'type'
                  ],
                  properties: {
                    type: {
                      title: 'Type of Slot',
                      type: [
                        'string'
                      ],
                      description: 'The Slot Type that the slot should be mapped to.'
                    },
                    patterns: {
                      type: [
                        'array'
                      ],
                      title: 'Slot Patterns',
                      description: 'Example utterance patterns used to train a platform to match the slot.',
                      items: {
                        type: 'string',
                        title: 'Slot Pattern',
                        description: 'An example utternace pattern for slot-matching.',
                        examples: [
                          'what is the square root of {number}',
                          'is {number} even or odd'
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
    },
    slotTypes: {
      $id: '#/properties/slotTypes',
      title: 'Slot Types',
      description: 'Defines custom slot types and their matching values.',
      type: [
        'object'
      ],
      default: {},
      patternProperties: {
        '^[A-z]*$': {
          $id: '#/properties/slotTypes/slotType',
          type: 'object',
          title: 'Slot Type',
          description: 'Defines a custom slot type.',
          properties: {
            values: {
              type: [
                'array'
              ],
              title: 'Slot Type Values',
              description: 'A list of possible values for the platform to match for the slot type.',
              items: {
                type: [
                  'object'
                ],
                title: 'Slot Value',
                description: 'A value for for a platform to match for the slot.',
                required: [
                  'name'
                ],
                additionalProperties: false,
                properties: {
                  name: {
                    type: 'string',
                    title: 'Slot Type Value Name'
                  },
                  synonyms: {
                    type: 'array',
                    title: 'Slot Type Value Synonym',
                    items: {
                      type: 'string',
                      examples: [
                        'chocolate',
                        'choco',
                        'fudge',
                        'double fudge'
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

