'use strict';

const glob = require('glob'),
    { entries }       = Object,
    { min }           = Math,
    { isPlainObject } = require('./lib/utils'),
    { writeFileSync } = require('fs'),
      defaults        = require('json-schema-defaults'),
      stringify       = require('javascript-stringify'),
    { instantiate }   = require('json-schema-instantiator'),
      path            = require('path');

glob.sync(`${__dirname}/schemas/*.js`).forEach(file => {
  const schema    = require(file),
        basename  = path.basename(file),
        flattened = [],
        output    = [];
  function flatten(schema, level=1){
    if(!isPlainObject(schema)) return;
    const type = Array.isArray(schema.type) ? schema.type : [schema.type];
    if(type.indexOf('object') > -1) flattened.push([level, schema]);
    entries(schema.properties || schema.patternProperties || {}).forEach(([key, config]) => {
      flatten(config, min(level + 1, 6));
    });
    if(schema.items) flatten(schema.items, min(level + 1, 6));
    entries(schema.definitions || {}).forEach(([key, config]) => {
      flatten(config, min(level + 1, 6)); 
    });
  }

  flatten(schema);

  flattened.forEach(([level, schema]) => {
    const {
      title,
      description,
      properties,
      patternProperties,
      examples,
      required
    } = schema;
    output.push(`\n${'#'.repeat(level)} ${title}`);
    const type = (Array.isArray(schema.type) ? schema.type.join(' | ') : schema.type) || '*';
    output.push(description);
    // SYNTAX
    schema.$schema = 'http://json-schema.org/draft-07/schema#';
    if(type === 'object'){
      let obj;
      if(schema.examples && schema.examples[0]) {
        obj = schema.examples[0];
      } else {
        obj = instantiate(schema, {requiredPropertiesOnly: true});
      }
      output.push(`\n__Syntax:__\n`);
      output.push('```javascript');
      output.push(stringify(obj, null, 2));
      output.push('```');
    }
    // PROPERTIES
    const hasProperties = properties || patternProperties;
    if(hasProperties){
      output.push('\n__Properties:__\n');
      output.push('| Parameter | Description | Type | Required |');
      output.push('|-----------|-------------|------|----------|');
      entries(properties || patternProperties || {}).forEach(([key, config]) => {
        output.push(`|\`${key}\`|${config.description}|${config.type || '*'}| ${(required || []).some(r => r == key)} |`);
      });
    }
    if(type !== 'object'){
      // EXAMPLES
      if((examples || []).length){
        output.push('\n__Examples:__\n');
        (examples || []).forEach(example => output.push(`- \`${example}\``));
      }
    }
  });
  writeFileSync(`${__dirname}/tmp/${basename}.md`, output.join('\n'), 'utf8');
});

