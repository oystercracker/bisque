const glob = require('glob'),
    { isPlainObject } = require('./lib/utils'),
    { writeFileSync } = require('fs'),
      defaults        = require('json-schema-defaults'),
    { instantiate }   = require('json-schema-instantiator'),
      path            = require('path');

glob.sync(`${__dirname}/schemas/*.js`).forEach(file => {
  const schema    = require(file),
        basename  = path.basename(file),
        flattened = [];
        output    = [];
  function flatten(schema, level=1){
    if(!isPlainObject(schema)) return;
    if(!Array.isArray(schema.type)) schema.type = [schema.type || '*'];
    flattened.push([level, schema]);
    Object.entries(schema.properties || schema.patternProperties || {}).forEach(([key, config]) => {
      flatten(config, Math.min(level + 1, 6)); 
    });
    if(schema.items) flatten(schema.items, Math.min(level + 1, 6));
    Object.entries(schema.definitions || {}).forEach(([key, config]) => {
      flatten(config, Math.min(level + 1, 6)); 
    });
  }

  flatten(schema);

  const parent = (flattened.shift() || [])[1] || {};
  output.push(parent.title)
  output.push('='.repeat((parent.title || '').length))
  output.push(parent.description);

  flattened.forEach(([level, schema]) => {
    const {
      title,
      type,
      description,
      properties,
      patternProperties,
      examples,
      required
    } = schema;
    output.push(`${'#'.repeat(level)} ${title}`);
    if(!Array.isArray(schema.type)) schema.type = [schema.type || '*'];
    output.push(`__Type:__ ${schema.type.join(' | ')}`);
    output.push(`__Description:__ ${description}`);
    schema.$schema = 'http://json-schema.org/draft-07/schema#';
    if(schema.type.some(x => x === 'object')){
      try{
        const syntax = JSON.stringify(instantiate(schema), null, 2);
        if(syntax.length){
          output.push(`__Syntax:__`);
          output.push('```json');
          output.push(syntax);
          output.push('```');
        }
      } catch(err){
        
      }

    }
    const hasProperties = properties || patternProperties;
    if(hasProperties){
      output.push('__Properties:__');
      output.push('| Parameter | Description | Type | Required |');
      output.push('|-----------|-------------|------|----------|');
      Object.entries(properties || patternProperties || {}).forEach(([key, config]) => {
        output.push(`|\`${key}\`|${config.description}|${config.type || '*'}| ${(required || []).some(r => r == key)} |`);
      });
    }
    if((examples || []).length){
      output.push('__Examples:__');
      (examples || []).forEach(example => output.push(`- \`${example}\``));
    }
  });
  writeFileSync(`${__dirname}/tmp/${basename}.md`, output.join('\n'), 'utf8');
});

