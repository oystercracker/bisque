'use strict';

const { isPlainObject } = require('./utils'),
      { entries }       = Object;

/**
 * This function is used to crawl a JSON schema and add default properties
 * to their respective parent objects.  That way, objects that are set to
 * be default properties won't be generated as blank with json-schema-defaults.
 */

module.exports = function defaultify(object){
  if(!isPlainObject(object) || !object.hasOwnProperty('properties')) return;
  entries(object.properties).forEach(([key, value]) => {
    if(!isPlainObject(value)) return;
    defaultify(value);
    if(isPlainObject(object.default) && value.hasOwnProperty('default')) object.default[key] = value.default; 
  });
  return object;
};

