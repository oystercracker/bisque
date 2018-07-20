module.exports = {
  invocation: '',
  sampleInvocations: [],
  intents: {
    Help: {
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