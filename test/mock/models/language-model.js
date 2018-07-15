'use strict';

const languageModel = {
  invocation: '',
  sampleInvocations: [],
  intents: {
    Launch: {
      mapToRequestType: {
        byPlatform: {
          alexa: 'LaunchRequest'
        }
      }
    },
    Stop: {
      alias: {
        byPlatform: {
          alexa: 'AMAZON.StopIntent'
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
      alias: {
        byPlatform: {
          alexa: 'AMAZON.CancelIntent'
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
      alias: {
        byPlatform: {
          alexa: 'AMAZON.HelpIntent'
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
          type: {
            default: 'FooBar',
            byLocale: {
              'en-US': 'Number'
            }
          },
          patterns: {
            byLocale: {
              'en-US': ['love me some {numbah}']
            }
          }
        }
      }
    },
    Fallback: {
      alias: {
        byPlatform: {
          alexa: 'AMAZON.FallbackIntent'
        }
      }
    }
  },
  slotTypes: {
    Number: {
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

module.exports = languageModel;

