'use strict';

const { inferSlotsFromPatterns } = require('./index');

const slots = inferSlotsFromPatterns([
  'i like {eggs}',
  'i love {eggs:Food}',
  'i heart {bacon:Food} and {milk:Drink}'
]);

console.log(JSON.stringify(slots, null, 2));