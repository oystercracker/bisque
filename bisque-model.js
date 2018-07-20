module.exports = {
  invocation: '',
  sampleInvocations: [],
  intents: {
    Launch: {
      slots: {
        foo: {
          type(platform, locale){
            if(locale === 'en-US') return 'FooBar';
          },
          patterns: [
            'i like {foo} and {bar:Wocka}',
            '{foo:FooBar} is great'
          ]
        }
      }
    },
    Cancel: {},
    Stop: {},
    Help: {
      slots: {
        foo: {
          type: 'FooBar',
          patterns: ['this is {foo}']
        }
      }
    },
    Fallback: {}
  },
  slotTypes: {
    FooBar: {
      values: []
    }
  }
};