'use strict';

const config = {
  version: '1.0',
  targets: ['alexa'],
  defaultLocale: 'en-US',
  targetLocales: ['en-US', 'fr-FR', 'de-DE'],
  description: {
    byLocale: {
      'en-US': {
        name: 'Hello World',
        shortSummary: 'Hello World implemented using Saltine.',
        longSummary: '',
        invocation: 'hello world',
        exampleInvocations: [
          'open hello world',
          'tell hello world',
          'ask hello world'
        ],
        termsOfServiceUrl: '',
        contactEmail: '',
        privacyUrl: '',
        testingInstructions: '',
        targets: {
          alexa: {
            category: 'EDUCATION_AND_REFERENCE'
          }
        }
      }
    }
  },
  intents: {
    Launch: {
      targets: {
        alexa: {
          mapRequestType: 'LaunchRequest'
        }
      }
    },
    Stop: {
      targets: {
        alexa: {
          alias: 'AMAZON.StopIntent'
        }
      },
      patterns: {
        byLocale: {
          'en-US': [
            'stop',
            'off',
            'shut up'
          ],
          'fr-FR': [
            'arrête'
          ]
        }
      }
    },
    Cancel: {
      targets: {
        alexa: {
          alias: 'AMAZON.CancelIntent'
        }
      },
      patterns: {
        byLocale: {
          'en-US': [
            'cancel',
            'nevermind',
            'forget it'
          ],
          'fr-FR': [
            'annule',
            'cancelle'
          ],
          'de-DE': [
            'abbrechen',
            'abbreche',
            'vergiss es'
          ]
        }
      }
    },
    Help: {
      targets: {
        alexa: {
          alias: 'AMAZON.HelpIntent'
        }
      },
      patterns: {
        byLocale: {
          'en-US': [
            'help',
            'help me',
            'can you help me',
            'a {numbah}'
          ],
          'fr-FR': [
            'aide',
            'aide moi',
            'j\'ai besoin d\'aide'
          ],
          'de-DE': [
            'hilfe',
            'hilf mir',
            'Kannst du mir helfen'
          ]
        }
      },
      slots: {
        numbah: {
          required: true,
          patterns: ['love me some {numbah:Number}']
        }
      }
    },
    Fallback: {
      targets: {
        alexa: {
          alias: 'AMAZON.FallbackIntent'
        }
      }
    }
  },
  slotTypes: {
    Number: {
      target: {
        alexa: {
          alias: {
            byLocale: {
              'en-US': 'AMAZON.NUMBER'
            }
          }
        }
      },
      values: [
        {
          name: '1',
          synonyms: [
            'one',
            'single'
          ]
        }
      ]
    }
  }
};

module.exports = config;

