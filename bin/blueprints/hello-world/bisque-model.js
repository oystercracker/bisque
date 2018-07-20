module.exports = {
  invocation(platform, locale){
    return ({
      'en-US': 'favorite ice cream',
      'de-DE': 'lieblingseis',
      'fr-FR': 'glace préférée'
    })[locale];
  },
  sampleInvocations: [],
  intents: {
    Launch: {
      mapToRequestType(platform){
        if(platform === 'alexa') return 'LaunchRequest';
      }
    },
    FavoriteIceCream: {

    }
  },
  slotTypes: {}
};