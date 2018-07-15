'use strict';

const { entries,
        assign }   = Object;
  
function isPlainObject(obj){
  return typeof obj === 'object' && !Array.isArray(obj);
}

// function resolve(platform, locale, obj){
//   if(!isPlainObject(obj)) return obj;
//   let outObject = {};
//   entries(obj).forEach(([key, value]) => {
//     if(!isPlainObject(value) && outObject) return outObject[key] = value;
//     if(key === 'default') {
//       const parsed = resolve(platform, locale, value);
//       if(typeof parsed === 'undefined') return;
//       outObject = isPlainObject(parsed) ? assign(outObject, parsed) : parsed;
//       return;
//     }
//     if(locale && key === 'byLocale') {
//       const parsed = resolve(platform, locale, value[locale]);
//       if(typeof parsed === 'undefined') return;
//       outObject = isPlainObject(parsed) ? assign(outObject, parsed) : parsed;
//       return;
//     }
//     if(platform && key === 'byPlatform') {
//       const parsed = resolve(platform, locale, value[platform]);
//       if(typeof parsed === 'undefined') return;
//       outObject = isPlainObject(parsed) ? assign(outObject, parsed) : parsed;
//       return;
//     }
//     outObject[key] = resolve(platform, locale, value);
//   });
//   return outObject;
// }

function resolve(platform, locale, obj){
  if(!isPlainObject(obj)) return obj;
  let outObject;
  if(obj.hasOwnProperty('default')) {
    outObject = resolve(platform, locale, obj.default);
  }
  if(obj.hasOwnProperty('byLocale')) {
    const parsed = resolve(platform, locale, obj.byLocale[locale]);
    return parsed || outObject;
  }
  if(obj.hasOwnProperty('byPlatform')) {
    const parsed = resolve(platform, locale, obj.byPlatform[platform]);
    return parsed || outObject;
  }
  if(outObject) return outObject;
  return obj;
}



class ConfigResolver {
  static create(base){
    const object = new this();
    object.__base = base;
    return object;
  }
  constructor(base){
    this.__base = base;
  }
  fetch(platform, locale, path){
    const keys = Array.from(path.match(/[\w|-|\d]+/g) || []);
    let ctx = resolve(platform, locale, this.__base),
        i   = 0,
        len = keys.length;
    while(i<len){
      if(!ctx) return;
      const key = keys[i],
            obj = ctx[key];
      i++;
      if(!obj) return obj;
      ctx = resolve(platform, locale, obj);
    }
    return ctx;
  }
}

module.exports = ConfigResolver;

