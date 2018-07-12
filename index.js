'use strict';

const builders   = {
        alexa(){
          return buildForAlexa(...arguments);
        }
      },
    { entries,
      assign }   = Object,
      BaseObject = require('./lib/base-object');

function build(model, targetLocale='en-US'){
  const errors = validateModel(model);
  if(errors) throw new Error(errors[0]);
  return model.targets.map(target => builders[target](model));
}

function validateModel(model){
  const errors = [];
  if(!model) errors.push('Expected an interaction model but none provided.');
  if(!model.targets || !model.targets.length) errors.push('Provided model has no targets.');
  if(!model.targetLocales || !model.targetLocales.length) errors.push('Model should have at least one target locale.');
  if(!model.description) errors.push('Description property was expected but not found.');
  if(errors.length) return errors;
}

function buildForAlexa(model){
  const modelsByLocale = {};
  model.targetLocales.forEach(locale => modelsByLocale[locale] = buildAlexaModel(model, locale));
  return modelsByLocale;
}

function buildAlexaModel(model, locale){
  const outputModel = {
          interactionModel: {
            languageModel: {
              invocationName: '',
              intents: [],
              types: []
            }
          }
        },
        description     = (model.description.byLocale ? model.description.byLocale[locale] : model.description) || model.description,
        requiredIntents = ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'AMAZON.HelpIntent', 'AMAZON.FallbackIntent'];
  outputModel.interactionModel.languageModel.invocationName = description.invocation;
  // INTENTS
  entries(model.intents || {}).forEach(([name, config]) => {
    const intentConfig = BaseObject.create(config),
          outputIntent = {
            name,
            samples: []
          },
          alias = intentConfig.get('targets.alexa.alias');
    if(intentConfig.get('targets.alexa.mapRequestType')) return;
    if(alias) {
      if(requiredIntents.find(i => i === name.trim()) && requiredIntents.find(i => i === alias.trim())){
        throw new Error(`Alexa built-in intent '${name}' cannot have an alias to another built-in intent.`);
      }
      outputIntent.name = alias;
    }
    // PATTERNS
    const patterns = intentConfig.get(`patterns.byLocale['${locale}']`, intentConfig.get('patterns', []));
    let outputSamples = [];
    if(Array.isArray(patterns))       outputSamples = patterns;
    if(patterns && patterns.byLocale) outputSamples = (patterns.byLocale || {})[locale] || [];
    outputIntent.samples = outputSamples;
    // SLOTS
    const inferredSlots = inferSlotsFromPatterns(outputIntent.samples),
          explicitSlots = assign({}, intentConfig.get('slots', {}));
    entries(explicitSlots).forEach(([eSlot, _eSlotConfig]) => {
      // WHERE YOU LEFT OFF: reconciling byLocale versus an aray
      const iSlotConfig = BaseObject.create(inferredSlots[eSlot] || {}),
            eSlotConfig = BaseObject.create(_eSlotConfig, {}),
            iPatterns   = Array.isArray(iSlotConfig.get('patterns')) ? iSlotConfig.get('patterns') : iSlotConfig.get(`patterns.byLocale['${locale}']`, []),
            ePatterns   = Array.isArray(eSlotConfig.get('patterns')) ? eSlotConfig.get('patterns') : eSlotConfig.get(`patterns.byLocale['${locale}']`, []);
      if(name === 'Help') debugger;
      iSlotConfig.set('type', eSlotConfig.get('type', iSlotConfig.get('type')));
      Array.prototype.push.apply(iPatterns, []
                                              .concat(ePatterns)
                                              .filter((it, i, ar) => ar.indexOf(it) === i));
    });
    intentConfig.set('slots', inferredSlots);
    entries(intentConfig.get('slots', [])).forEach(([slot, slotConfig]) => {
      if(!slotConfig.type) throw new Error(`Slot '${slot}' of intent '${name}' has no type.`);
      outputIntent.slots = outputIntent.slots || [];
      outputIntent.slots.push({
        name:    slot,
        type:    slotConfig.type,
        samples: slotConfig.patterns.map(s => stripImplicitTypeDeclarations(s))
      });
    });
    outputIntent.samples = (outputIntent.samples || []).map(s => stripImplicitTypeDeclarations(s))
    outputModel.interactionModel.languageModel.intents.push(outputIntent);
  });
  return outputModel;
}

function stripImplicitTypeDeclarations(pattern){
  return pattern.replace(/{\s*(\w*):(\w+)}/g, (x,y) => `{${y}}`);
}

function inferSlotsFromPatterns(patterns=[]){
  const inferredSlots = {};
  patterns.forEach(p => {
    ((p || '').match(/{\s*([\w|\:]+)\s*}/g) || [])
              .map(s => s.replace(/[\{|\}]/g, '').split(':'))
              .forEach(([name, type]) => {
                inferredSlots[name] = inferredSlots[name] || {
                  type:     null,
                  patterns: [],
                  required: true
                };
                if(type && type !== 'undefined') inferredSlots[name].type = type;
                // Strip out inline-type declaration
                inferredSlots[name].patterns.push(stripImplicitTypeDeclarations(p));
              });
  });
  return inferredSlots;
}


module.exports = {
  build,
  buildAlexaModel,
  inferSlotsFromPatterns,
  validateModel
}