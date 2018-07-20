'use strict';

const { existsSync,
        readdirSync,
        lstatSync,
        unlinkSync,
        rmdirSync } = require('fs');

/**
 * rm -rf for Node.js
 * @param {string} path
 */
function rmrf(path) {
  if(!existsSync(path)) return;
  readdirSync(path).forEach(file => {
    const curPath = path + '/' + file;
    if(lstatSync(curPath).isDirectory()) return rmrf(curPath);
    unlinkSync(curPath);
  });
  rmdirSync(path);
}
/**
 * Returns true if the object is undefined, null, or NaN.  Treats zero as non-nil.
 * @param {*} obj 
 */
function isNil(obj){
  if(obj === null) return true;
  if(typeof obj === 'undefined') return true;
  if(!obj && isNaN(obj)) return true;
  return false;
}
/**
 * Indicates if the object is just a plain ol' object. (and not an array or function)
 * @param {object} object
 */
function isPlainObject(object){
  return !isNil(object) && (typeof object === 'object') && !Array.isArray(object);
}
/**
 * If the object is a "wholesome" value, aka not a plain object or a function, return true;
 * @param {*} object 
 */
function isRawType(object){
  const rawTypes = ['string', 'boolean', 'number', 'symbol', 'undefined'];
  return Array.isArray(object) || rawTypes.indexOf(typeof object) > -1;
}
/**
 * Indicates if an object is a function.
 * @param {*} object
 */
function isFunction(object){
  return typeof object === 'function';
}

/**
 * Used in tests for capturing console output.
 * Also emits 'write' event for both stdout and stderr.
 * @param {function} callback
 */
async function captureStdout(callback){
  const originalOut = process.stdout.write,
        originalErr = process.stderr.write,
        output      = {};
  process.stdout.write = function(text){
    output.output = (output.output || '') + text;
  };
  process.stderr.write = function(text){
    output.errors = (output.errors || '') + text;
  };
  try {
    await callback();
  } catch(err) {
    console.error(err);
  }
  process.stdout.write = originalOut;
  process.stderr.write = originalErr;
  return output;
}

/**
 * Crawl AST
 */
function crawl(object, callback){
  function walk(obj, parent){
    if(isPlainObject(obj)){
      if(callback(obj)) return {object: obj, parent};
    }
    let enumerable = [];
    if(isPlainObject(obj)) enumerable  = Object.values(obj);
    if(Array.isArray(obj)) enumerable = obj;
    const len = enumerable.length;
    let i = 0;
    while(i < len){
      const o = enumerable[i];
      const walked = walk(o, obj);
      if(walked) return walked;
      i++;
    }
  }
  return walk(object);
}

module.exports = {
  crawl,
  rmrf,
  isNil,
  isPlainObject,
  isRawType,
  isFunction,
  captureStdout
};