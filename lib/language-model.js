'use strict';

const recast        = require('recast'),
    { isPlainObject,
      crawl } = require('./utils'),
      toJS    = require('javascript-stringify'),
      toAST   = require('to-ast'),
    { readFileSync } = require('fs');

class LanguageModel {
  constructor(path){
    const file = readFileSync(path, 'utf8');
    this.ast = recast.parse(file);
  }
  get object(){
    return eval(this.code);
  }
  get code(){
    return this.ast.code;
  }
  get root(){
    return this.ast.program.body.find(x => x.type === 'VariableDeclaration').declarations[0].init;
  }
  addIntents(intents={}){
    const intentsObject = crawl(this.ast.program.body, (obj) => {
      return obj.key && obj.key.name === 'intents';
    });
    
    if(!intentsObject) return;

    const newIntents = recast.parse(`(${toJS(intents, null, 2)});`);

    newIntents.program.body[0].expression.properties.forEach(p => intentsObject.object.value.properties.push(p));

    debugger

    const newCode = recast.print(this.ast).code;

    debugger

  }
}

module.exports = LanguageModel;

