'use strict';

function makeDefault(schema){
  if(typeof schema.default !== 'object') return schema;
  debugger
  Object.entries(schema.properties || {}).forEach(([k,v]) => {
    if(!v || typeof v.default === 'undefined') return;
    schema.default[k] = v.default;
  });
  return schema;
}

module.exports = makeDefault;

