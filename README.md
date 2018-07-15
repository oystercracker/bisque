Bisque
========

Write your language model once and compile it for multiple platforms.

## Installation

```sh
npm install -g bisquejs
```

## Getting started

Before you begin using Bisque, you should familiarize yourself with the concept of [Intents and Slots/Entities](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html) (in short, they are the natural language equivalent of "commands" and "arguments").  If you have already made skills for Alexa or actions for Google, then you probably have the prerequisite knowledge to continue.

`cd` into the directory of your smart speaker project and initialize a new model:

```sh
bisque init
```

A new file will appear in the current working directory called `manifest.js`.  This is a CommonJS module that represents your 

```javascript
// manifest.js
'use strict';

const manifest = {
  version: '1.0',
  description: {
    name: '',
    contactEmail: '',
    shortSummary: '',
    longSummary: '',
    keywords: [],
    invocation: '',
    exampleInvocations: [],
    termsOfUseUrl: '',
    privacyPolicyUrl: '',
    testingInstructions: '',
  },
  targetPlatforms: [],
  targetLocales: [],
  distributionCountries: [],
  isAvailableWorldwide: false,
  allowsPurchases: false,
  usesPersonalInfo: false,
  isChildDirected: false,
  isExportCompliant: true,
  containsAds: false,
  sourceDir: '.',
  outputDir: './dist',
  endpoint: {},
  languageModel: require('./language-model')
};

module.exports = manifest;
```

In the same directory, a file called `language-model` will also appear and include some basic intent names.  Notice how it is required in the `manifest.js`.  

It should look something like this:

```javascript
const languageModel = {
  intents: {
    Stop: {
      patterns: [],
      slots: {}
    },
    Cancel: {
      patterns: [],
      slots: {}
    },
    Help: {
      patterns: [],
      slots: {}
    },
    Fallback: {
      patterns: [],
      slots: {}
    }
  },
  slotTypes: {

  }
};

module.exports = languageModel;
```

## Configuration Concepts

Intended allows flexible locale and platform targeting.

Nearly every property in the manifest can be set to target a specific platform(e.g. Alexa, google), a set of locales(e.g. "en-US", "de-DE", "fr-FR"), or both.

This will be illustrated in the following subsection.

## Adding an invocation phrase

Making a "hello world" app?  You can set your invocation in the `description` object:

```javascript
// manifest.js
{
  //...
  description: {
    invocation: 'hello world'
  }
  // ...
}
```

Every platform-specific manifests that gets built out(e.g. skill.json, action.json) will include "hello world" as the invocation phrase.

### Targeting locales

If your application is multi-lingual, you can easily configure unique invocation phrases for different locales:

```javascript
// manifest.js
{
  //...
  description: {
    invocation: {
      byLocale: {
        'en-US': 'hello world',
        'de-DE': 'hallo welt',
        'fr-FR': 'bonjour le monde'
      }
    }
  }
  // ...
}
```

Or perhaps if the invocation should be different for each platform:

```javascript
// manifest.js
{
  //...
  description: {
    invocation: {
      byPlatform: {
        alexa: 'hello world',
        google: 'whats up'
      }
    }
  }
  // ...
}
```

Even specific versions for each locale can be set for each platform:

```javascript
// manifest.js
{
  //...
  description: {
    invocation: {
      byPlatform: {
        alexa: {
          byLocale: {
            'en-US': 'hello world',
            'de-DE': 'hallo welt',
            'fr-FR': 'bonjour le monde'
          }
        },
        google: {
          byLocale: {
            'en-US': 'whats up',
            'de-DE': 'was geht',
            'fr-FR': 'quoi de neuf'
          }
        }
      }
    }
  }
  // ...
}
```

Keep in mind that while all properties support `byPlatform`, not all properties are locale-specific in their target platforms, thus `byLocale` is not always supported.

## Adding intents

Intents exist in `language-model.js` as arbitrary keys under the `intents` property.  Here's how to add an intent `HelloWorld`:

```javascript
const languageModel = {
  intents: {
    HelloWorld: {
      patterns: [
        'hello world'
      ],
    }
  },
  slotTypes: {

  }
};
```

*NOTE: Intent names should only include letters A-z with no spaces.  This is because platforms such as Alexa impose limitations on how an intent can be named while other platforms like Google/Dialogflow do not.  It's a good practice to stick with [PascalCase](https://en.wikipedia.org/wiki/Camel_case) as a means of writing cross-compatible intent names.*

The `patterns` property under the intent is simply a list of *sample language patterns* used by target NLP platforms to match intents from phrases.  In this example, a single pattern of 'hello world' is pretty much all that is needed.  *Or is it?*

Wanna know something crazy?  Just like with `manifest.js`, properties in `language-model.js` can be set to target specific locales and platforms.  If we want the `HelloWorld` intent to work for the locales specified in our manifest, we would need to do the following:

```javascript
const languageModel = {
  intents: {
    HelloWorld: {
      patterns: {
        byLocale: {
          'en-US': ['hello world'],
          'de-DE': ['hallo welt'],
          'fr-FR': ['bonjour le monde']
        }
      },
    }
  },
// ...
};
```

What if we're targeting mostly English locales but one non-English locale?  That's where the `default` property comes in:

```javascript
const languageModel = {
  intents: {
    HelloWorld: {
      patterns: {
        default: ['hello world'],
        byLocale: {
          'fr-FR': ['bonjour le monde']
        }
      },
    }
  },
// ...
};
```

By using `default`, we're specifying that all targeted locales use "hello world" as a sample language pattern for the `HelloWorld` intent, except for the `fr-FR` locale where "bonjour le monde" should be used instead.


## Aliasing built-in intents

For example, Alexa has [built-in intents](https://developer.amazon.com/docs/custom-skills/standard-built-in-intents.html) for common user commands.  When creating a multi-platform application, it's useful to create a common intent as an *alias* to platform-specific built-in intents.

Here is an example of how to create a multi-platform `Stop` intent that works for both Alexa and Google:

```javascript
const languageModel = {
  intents: {
    Stop: {
      alias: {
        byPlatform: {
          alexa: 'AMAZON.StopIntent'
        }
      }
      patterns: [
        'stop',
        'quit',
        'cut it out'
      ]
    }
  }
};
// ...
```


## Mapping intents to request types (Alexa only)

The Alexa platform has a concept of [request types](https://developer.amazon.com/docs/custom-skills/request-types-reference.html).  It can be useful to map an intent to a request type so your application can read your manifest and know to treat a certain request type as an intent.  This can be an important feature if one platform implements a behavior through a request type while another does so through a built-in intent; one example of this is how Alexa implements a `LaunchRequest` as a request type while Google/Dialogflow uses a "Default Welcome Intent".  Here's one way you can create a unified `Launch` intent that works between both platforms:

```javascript
const languageModel = {
  intents: {
    Launch: {
      mapToRequestType: {
        byPlatform: {
          alexa: 'LaunchRequest'
        }
      },
      alias: {
        byPlatform: {
          google: 'Default Welcome Intent'
        }
      }
    }
  }
};
// ...
```

Note that you do not actually need the `alias` property if you rename your "Default Welcome Intent" to "Launch" in Dialogflow.

The result of this configuration is that the `Launch` intent will not be written out to generated Alexa or Dialogflow language models, since the intent is only an *alias* that will be applied by an application that reads `manifest.js`.


## Adding slots

As mentioned earlier, you can think of **intents** as equivalent to *commands*, and **slots** as equivalent to *arguments* or *parameters* to an intent.

Let's say we're building an application that asks the user what their favorite flavor of ice cream is, and we have an intent that the user responds with called `IceCreamFlavor`.  Let's add some patterns that include a **slot name** delimited by curly-braces:

```javascript
const languageModel = {
  intents: {
    IceCreamFlavor: {
      patterns: [
        'my favorite flavor is {flavor}',
        'my favorite is {flavor}',
        'i like {flavor} ice cream',
        'i love {flavor}'
      ],
      slots: {
        flavor: {
          patterns: [
            'i like {flavor}',
            'my favorite is {flavor}'
          ]
        }
      }
    }
  },
  slotTypes: {

  }
};
// ...
```

In order for the NLP platform to correctly interpret the value for our slot, the slot needs to be given a custom **Slot Type**.

```javascript
const languageModel = {
  intents: {
    IceCreamFlavor: {
      patterns: [
        'my favorite flavor is {flavor}',
        'my favorite is {flavor}',
        'i like {flavor} ice cream',
        'i love {flavor}'
      ],
      slots: {
        flavor: {
          type: 'Flavor'
          patterns: [
            'i like {flavor}',
            'my favorite is {flavor}'
          ]
        }
      }
    }
  },
  slotTypes: {
    Flavor: {
      values: [
        {
          name: 'chocolate',
          synonyms: [
            'choco',
            'double fudge'
          ]
        },
        {
          name: 'vanilla',
        },
        {
          name: 'strawberry'
        }
      ]
    }
  }
};
// ...
```

As you can see, the values for a flavor can also support *synonyms*, which are helpful in improving slot-filling accuracy(if a given platform supports synonyms).

### Specifying platform-specific built-in slot types

Different NLP platforms like Amazon Alexa and Google/Dialogflow have some [built-in slot types](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html).

If we were building an application that asks the user to pick a number, rather than creating a custom slot type, we can target built-in slot types for each platform:

```javascript
const languageModel = {
  intents: {
    PickANumber: {
      patterns: [
        '{number}',
        'i pick {number}',
        'lets go with {number}'
      ],
      slots: {
        number: {
          type: {
            byPlatform: {
              alexa: 'AMAZON.NUMBER',
              google: '@sys.number-integer'
            }
          }
        }
      }
    }
  },
// ...
```

## License

See [LICENSE.txt](LICENSE.txt)

