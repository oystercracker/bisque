Intended
========

Write your VUI/Language Model/Intent Schema once.

## Installation

```sh
npm install -g intended
```

## Getting started

`cd` into the directory of your smart speaker project and initialize a new model:

```sh
indended init
```

A new file will appear in the current working directory called `indended.js`.  This is a CommonJS module that represents your language model.

```javascript
// indended.js
'use strict';

const model = {
  description: {},
  actions: {}
};

module.exports = model;
```

## Adding an invocation phrase

Making a "hello world" app?  If you are targeting the `en-US` locale:

```javascript
// indended.js
'use strict';

const model = {
  description: {
    'en-US': {
      invocation: 'hello world'
    }
  },
  actions: {}
};

module.exports = model;
```

## Adding new action

```sh
intended g action SayGoodbye
```

```javascript
// indended.js
'use strict';

const model = {
  description: {
    'en-US': {
      invocation: 'hello world'
    }
  },
  actions: {
    SayGoodbye: {
      patterns: {},
      slots: {}
    }
  }
};

module.exports = model;
```

## Adding sample patterns to an action

Patterns are added on a per-locale basis.  For example, you would include samples like this if you were publishing a skill with the locale `en-US`:

```javascript
const model = {
  description: {
    'en-US': {
      invocation: 'hello world'
    }
  },
  actions: {
    SayGoodbye: {
      patterns: {
        'en-US': [
          'bye',
          'goodbye',
          'so long'
        ]
      },
      slots: {}
    }
  }
};

module.exports = model;
```


## Adding new slots

A slot is essentially a value that the NLP platform should be matched to parts of a user's utterance based on provided sample utterance patterns.

```sh
intended g slot <ActionName>:<SlotName>
```

