'use strict';

const { entries,
        keys } = Object;

function isNil(obj){
  if(obj === null) return true;
  if(typeof obj === 'undefined') return true;
  if(!obj && isNaN(obj)) return true;
  return false;
}

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

function isPlainObject(object){
  return !isNil(object) && (typeof object === 'object') && !Array.isArray(object);
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

function isRawType(object){
  const rawTypes = ['string', 'boolean', 'number', 'symbol', 'undefined'];
  return Array.isArray(object) || rawTypes.indexOf(typeof object) > -1;
}

function isFunction(object){
  return typeof object === 'function';
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

