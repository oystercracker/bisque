'use strict';

const { entries,
        keys } = Object,
      { isNil,
        isPlainObject,
        isFunction,
        isRawType } = require('./utils');

/**
 * A config object is used to "resolve" any object based on
 * a target platform and/or locale.  It will execute function properties
 * as well as resolve any "resolver" objects that contain high-level
 * conditional keys.
 */
class ConfigObject {
  static from({ __base }){
    if(__base) return new this(__base);
    return new this(...arguments)
  }
  static resolve(object, platform, locale){
    const output = resolver(object, platform, locale);
    return this.from(output);
  }
  constructor(base){
    this.__base = base;
  }
  get(path, defaultObject){
    const keys = Array.from(path.match(/[\w|-|\d]+/g) || []);
    let ctx = this.__base,
        i   = 0,
        len = keys.length;
    while(i<len){
      if(isNil(ctx)) return defaultObject;
      const key = keys[i];
      let obj;
      if(typeof ctx.get === 'function' && ctx.__base){
        obj = ctx.get(key);
      } else {
        obj = ctx[key];
      }
      i++;
      if(isNil(obj)) return defaultObject;
      ctx = obj;
    }
    return isNil(ctx) ? defaultObject : ctx;
  }
}

function resolveLogic(object, platform, locale){
  const props    = keys(object),
        logic    = ['default', 'byPlatform', 'byLocale'],
        hasLogic = props.some(p => logic.indexOf(p.trim()) > -1);
  if(!hasLogic) return resolver(object, platform, locale);
  const { default: _default, byPlatform, byLocale } = object;
  let output;
  if(_default)   output = resolver(_default, platform, locale);
  if(byPlatform) output = resolver(byPlatform[platform], platform, locale) || output;
  if(byLocale)   output = resolver(byLocale[locale], platform, locale)   || output;
  return output;
}

function resolver(object, platform, locale){
  if(isRawType(object)) return object;
  let clone = {};
  if(typeof object === 'function') return resolver(object(platform, locale), platform, locale);
  entries(object).forEach(([key, value]) => {
    if(isFunction(value))    value = resolver(value, platform, locale);
    if(isPlainObject(value)) value = resolveLogic(value, platform, locale);
    if(!isNil(value))        clone[key] = value;
  });
  return clone;
}

module.exports = ConfigObject;

