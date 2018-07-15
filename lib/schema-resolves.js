'use strict';

function resolves(config){
  const type  = [].concat(config.type || []);
  config.type = type.indexOf('object') < 0 ? type.concat('object') : type;
  config.oneOf = [
    {
      $ref: '#/definitions/resolver'
    },
    {
      type
    }
  ];
  // Since we are relying on the second anyOf object as a fallback to the
  // original behavior, move strict behavior to that second object.
  // if(config.required) {
  //   config.oneOf[1].required = config.required;
  //   delete config.required
  // }
  return config;
};

module.exports = resolves;