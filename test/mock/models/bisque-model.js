'use strict';

const languageModel = {
  invocation: '',
  sampleInvocations: [],
  intents: {
    Launch: {
      mapToRequestType(platform, locale){
        if(platform === 'alexa'){
          return 'LaunchRequest';
        } else {
          return '';
        }
      }
    },
    Stop: {
      alias(platform){
        if(platform === 'alexa') return 'AMAZON.StopIntent';
      },
      patterns(platform, locale){
        if(locale === 'en-US'){
          return [
            'stop',
            'off',
            'shut up'
          ];
        }
        if(locale === 'fr-FR') return ['arrête'];
        return [];
      }
    },
    Cancel: {
      alias(platform){
        if(platform === 'alexa') return 'AMAZON.CancelIntent'
      },
      patterns(platform, locale){
        return ({
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
        })[locale];
      }
    },
    Help: {
      alias(platform){
        if(platform === 'alexa') return 'AMAZON.HelpIntent';
      },
      patterns(platform, locale){
        return ({
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
        })[locale];
      },
      slots: {
        numbah: {
          type(platform, locale){
            if(locale === 'en-US') return 'Number';
            return 'FooBar';
          },
          patterns(platform, locale){
            if(locale === 'en-US') return ['love me some {numbah}'];
          }
        }
      }
    },
    Fallback: {
      alias(platform){
        if(platform === 'alexa') return 'AMAZON.FallbackIntent';
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

