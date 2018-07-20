'use strict';

const readline = require('readline');

module.exports = class ReadPromise {
  constructor(options={}){
    this.options = options;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  async question(text){
    if(this.options.skipQuestions) return;
    return new Promise((resolve, reject) => {
      try {
        this.rl.question(text, (answer) => resolve(answer, this.rl));
      } catch(err) {
        reject(err);
      }
    });
  }
  close(){
    this.rl.close();
  }
}

