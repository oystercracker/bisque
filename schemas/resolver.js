module.exports = {
  $id: '#/definitions/resolver',
  type: 'object',
  title: 'Resolver',
  additionalProperties: false,
  description: 'A resolver object is used to resolve a property based on different targets such as platform and locale.  For example, when building a manifest file to multiple platforms, a resolver object can be used to give a manifest property different values depending on the platform currently being built for.  A value set for a resolver property can also be another Resolver object.',
  properties: {
    'default': {
      title: 'Default',
      description: 'A default property value to always apply if not resolved by another resolver property such as `byLocale` or `byPlatform`.',
      anyOf: [
        {
          not: {
            type: 'object'
          }
        },
        {
          type: 'object',
          not: {
            required: [
              'default',
              'byLocale',
              'byPlatform'
            ]
          }
        },
        {
          $ref: '#/definitions/resolver'
        }
      ]
    },
    byLocale: {
      $id: '#/properties/byLocale',
      title: 'By Locale',
      type: 'object',
      description: 'Resolves a property value based on the contextual locale being targeted.  This will not resolve for objects that are not locale-specific such as the manifest.',
      patternProperties: {
        '^[a-z]{2}\-[A-Z]{2}$': {
          title: 'Locale-specific Value',
          description: 'The locale-specific value to resolve to, the property name being an i18n locale code. (e.g. \'en-US\', \'de-DE\').',
          anyOf: [
            {
              not: {
                type: 'object'
              }
            },
            {
              $ref: '#/definitions/resolver'
            }
          ]
        }
      }
    },
    byPlatform: {
      title: 'By Platform',
      description: 'Resolves a property value based on the contextual platform being targeted.  This will not resolve if the context is not platform-specific.',
      patternProperties: {
        '^[a-z]*$': {
          title: 'Platform-specific Value',
          description: 'The platform-specific value to resolve to, the property name being the name of a platform in all-lowercase. (e.g. \'alexa\', \'dialogflow\').',
          anyOf: [
            {
              not: {
                type: 'object'
              }
            },
            {
              $ref: '#/definitions/resolver'
            }
          ]
        }
      }
    }
  }
}

