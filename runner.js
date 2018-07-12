'use strict';

const model       = require('./test/mock/models/model'),
    { build }     = require('./index'),
    { stringify } = JSON;

console.log(stringify(build(model), null, 2));

