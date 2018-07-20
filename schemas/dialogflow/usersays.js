module.exports = {
  $id: 'http://example.com/example.json',
  type: 'array',
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  items: {
    $id: 'http://example.com/example.json/items',
    type: 'object',
    properties: {
      id: {
        $id: 'http://example.com/example.json/items/properties/id',
        type: 'string',
        title: 'ID',
        description: 'A UUID.',
        default: ''
      },
      data: {
        $id: 'http://example.com/example.json/items/properties/data',
        type: 'array',
        items: {
          $id: 'http://example.com/example.json/items/properties/data/items',
          type: 'object',
          properties: {
            text: {
              $id: 'http://example.com/example.json/items/properties/data/items/properties/text',
              type: 'string',
              title: 'Text',
              default: ''
            },
            alias: {
              $id: 'http://example.com/example.json/items/properties/data/items/properties/alias',
              type: 'string',
              title: 'Alias',
              default: ''
            },
            meta: {
              $id: 'http://example.com/example.json/items/properties/data/items/properties/meta',
              type: 'string',
              title: 'Meta'
            },
            userDefined: {
              $id: 'http://example.com/example.json/items/properties/data/items/properties/userDefined',
              type: 'boolean',
              title: 'User Defined',
              default: false
            }
          }
        }
      },
      isTemplate: {
        $id: 'http://example.com/example.json/items/properties/isTemplate',
        type: 'boolean',
        title: 'Is Template',
        default: false
      },
      count: {
        $id: 'http://example.com/example.json/items/properties/count',
        type: 'integer',
        title: 'The Count Schema ',
        default: 0
      },
      updated: {
        $id: 'http://example.com/example.json/items/properties/updated',
        type: 'integer',
        title: 'The Updated Schema ',
        default: 0,
      }
    }
  }
};

