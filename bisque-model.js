module.exports = {
  invocation: '',
  sampleInvocations: [],
  intents: {
    Hello: {

    },
    Help: {
      alias: 'AMAZON.HelpIntent',
      mapToRequestProperty: {
        key: 'type',
        value: 'LaunchRequest'
      },
      patterns: [
        'i like {foo}'
      ],
      slots: {
        foo: {
          type: 'FooBar',
          patterns: ['this is {foo}']
        }
      }
    }
  },
  slotTypes: {
    FooBar: {
      values: [
        {
          name: 'bleh',
          synonyms: [
            'caca',
            'flarp'
          ]
        }
      ]
    }
  }
};