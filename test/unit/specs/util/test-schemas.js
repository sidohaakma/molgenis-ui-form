export const compoundSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound',
      'fieldType': 'COMPOUND',
      'name': 'compound-field',
      'label': 'Compound field',
      'description': 'Compound description',
      'attributes': [
        {
          'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound_int',
          'fieldType': 'INT',
          'name': 'compound-int',
          'label': 'Compound integer field',
          'attributes': [],
          'auto': false,
          'nillable': false,
          'readOnly': false,
          'defaultValue': '1',
          'labelAttribute': false,
          'unique': false,
          'visible': true,
          'lookupAttribute': false,
          'isAggregatable': true,
          'description': 'Cool Integer child description'
        },
        {
          'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound',
          'fieldType': 'COMPOUND',
          'name': 'nested-compound',
          'label': 'Nested Compound field',
          'description': 'Nested Compound description',
          'attributes': [
            {
              'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound_int',
              'fieldType': 'ENUM',
              'name': 'nested-compound-enum',
              'label': 'An enum, inside a compound, inside a compound',
              'attributes': [],
              'enumOptions': ['enum1', 'enum2', 'enum3'],
              'auto': false,
              'nillable': true,
              'readOnly': false,
              'defaultValue': '1',
              'labelAttribute': false,
              'unique': false,
              'visible': true,
              'lookupAttribute': false,
              'isAggregatable': true,
              'description': 'Cool Nested enumceptions'
            },
            {
              'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound_string',
              'fieldType': 'STRING',
              'name': 'nested-compound-string',
              'label': 'Nested Compound string field',
              'description': 'TypeTest compound string attribute',
              'attributes': [],
              'maxLength': 255,
              'auto': false,
              'nillable': false,
              'readOnly': false,
              'defaultValue': 'xcompound_string',
              'labelAttribute': false,
              'unique': false,
              'visible': true,
              'lookupAttribute': false,
              'isAggregatable': true,
              'validationExpression': '$("compound-string").value() === "string"'
            }
          ],
          'auto': false,
          'nillable': false,
          'readOnly': false,
          'labelAttribute': false,
          'unique': false,
          'visible': true,
          'lookupAttribute': false,
          'isAggregatable': false
        },
        {
          'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound_string',
          'fieldType': 'STRING',
          'name': 'compound-string',
          'label': 'Compound string field',
          'description': 'TypeTest compound string attribute',
          'attributes': [],
          'maxLength': 255,
          'auto': false,
          'nillable': false,
          'readOnly': false,
          'defaultValue': 'xcompound_string',
          'labelAttribute': false,
          'unique': false,
          'visible': true,
          'lookupAttribute': false,
          'isAggregatable': true,
          'validationExpression': '$("compound-string").value() === "string"'
        }],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': false,
      'unique': false,
      'visible': true,
      'lookupAttribute': false,
      'isAggregatable': false
    }
  ]
}

export const stringSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/string',
      'fieldType': 'STRING',
      'name': 'string',
      'label': 'String Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'STRING description',
      'nullableExpression': '$("text").value() !== "test"',
      'validationExpression': '$("string").value() === "valid"'
    }
  ]
}

export const stringSchemaWithVisibleExpression = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/string',
      'fieldType': 'STRING',
      'name': 'string',
      'label': 'String Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visibleExpression': '$("string").value() === "show me"',
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'STRING description'
    }
  ]
}

export const emailSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/email',
      'fieldType': 'EMAIL',
      'name': 'email',
      'label': 'Email Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Email description'
    }
  ]
}

export const textSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/text',
      'fieldType': 'TEXT',
      'name': 'text',
      'label': 'Text Field',
      'attributes': [],
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'TEXT description'
    }
  ]
}

export const booleanSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/boolean',
      'fieldType': 'BOOL',
      'name': 'boolean',
      'label': 'Boolean Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Boolean description'
    }
  ]
}

export const booleanSchemaNillable = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/boolean',
      'fieldType': 'BOOL',
      'name': 'boolean',
      'label': 'Boolean Field',
      'attributes': [],
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Boolean description'
    }
  ]
}

export const intSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/integer',
      'fieldType': 'INT',
      'name': 'integer',
      'label': 'Integer Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Integer description'
    }
  ]
}

export const longSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/long',
      'fieldType': 'LONG',
      'name': 'long',
      'label': 'Long Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Long description'
    }
  ]
}

export const decimalSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/decimal',
      'fieldType': 'DECIMAL',
      'name': 'decimal',
      'label': 'Decimal Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Decimal description'
    }
  ]
}

export const fileSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/file',
      'fieldType': 'FILE',
      'name': 'file',
      'label': 'File Field',
      'attributes': [],
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'File description'
    }
  ]
}

export const htmlSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/html',
      'fieldType': 'HTML',
      'name': 'html',
      'label': 'Html Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Html description'
    }
  ]
}

export const hyperlinkSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/hyperlink',
      'fieldType': 'HYPERLINK',
      'name': 'hyperlink',
      'label': 'Hyperlink Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Hyperlink description'
    }
  ]
}

export const enumSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/enum',
      'fieldType': 'ENUM',
      'name': 'enum',
      'label': 'Enum Field',
      'attributes': [],
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Enum description',
      'enumOptions': ['enum1', 'enum2', 'enum3']
    }
  ]
}

export const enumSchemaNillable = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/enum',
      'fieldType': 'ENUM',
      'name': 'enum',
      'label': 'Enum Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Enum description',
      'enumOptions': ['enum1', 'enum2', 'enum3']
    }
  ]
}

export const dateSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/date',
      'fieldType': 'DATE',
      'name': 'date',
      'label': 'Date Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Date description'
    }
  ]
}

export const dateTimeSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/datetime',
      'fieldType': 'DATE_TIME',
      'name': 'datetime',
      'label': 'Date and time Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Date and time description'
    }
  ]
}

export const categoricalSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/categorical',
      'fieldType': 'CATEGORICAL',
      'name': 'categorical',
      'label': 'Categorical Field',
      'attributes': [],
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Categorical description',
      'refEntity': {
        href: '/api/v1/it_emx_datatypes_TypeTestRef/meta',
        hrefCollection: '/api/v1/it_emx_datatypes_TypeTestRef',
        idAttribute: 'value',
        labelAttribute: 'label',
        languageCode: 'en',
        writable: true
      }
    }
  ]
}

export const categoricalMrefSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/categorical_mref',
      'fieldType': 'CATEGORICAL_MREF',
      'name': 'categorical_mref',
      'label': 'Categorical MREF Field',
      'attributes': [],
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Categorical MREF description',
      'refEntity': {
        href: '/api/v1/it_emx_datatypes_TypeTestRef/meta',
        hrefCollection: '/api/v1/it_emx_datatypes_TypeTestRef',
        idAttribute: 'value',
        labelAttribute: 'label',
        languageCode: 'en',
        writable: true
      }
    }
  ]
}
