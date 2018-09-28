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
              'isAggregatable': true
            },
            {
              'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound_string',
              'fieldType': 'LONG',
              'name': 'nested-compound-long',
              'label': 'Nested Compound Long field',
              'description': 'TypeTest compound long attribute',
              'attributes': [],
              'maxLength': 255,
              'auto': false,
              'nillable': false,
              'readOnly': false,
              'labelAttribute': false,
              'unique': false,
              'visible': false,
              'lookupAttribute': false,
              'isAggregatable': true
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
          'visibleExpression': '$("nested-compound-string").value() === "show"',
          'nullableExpression': '$("compound-int").value() === 1',
          'validationExpression': '$("compound-string").value() === "valid"'
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

export const intSchemaWithRange = {
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
      'description': 'Integer description',
      'range': {
        'min': 1,
        'max': 45
      }
    }
  ]
}

export const intSchemaWithMinRange = {
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
      'description': 'Integer description',
      'range': {
        'min': 1
      }
    }
  ]
}

export const intSchemaWithMaxRange = {
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
      'description': 'Integer description',
      'range': {
        'max': 45
      }
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

export const scriptSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/script',
      'fieldType': 'SCRIPT',
      'name': 'script',
      'label': 'Script Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'Script description'
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
        languageCode: 'en',
        writable: true
      }
    }
  ]
}

export const categoricalSchemaIncludingOptions = {
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
        languageCode: 'en',
        writable: true
      },
      'categoricalOptions': [
        {
          'id': 'ref1',
          'label': 'label1'
        },
        {
          'id': 'ref2',
          'label': 'label2'
        }
      ]
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

export const mrefSchema = {
  'attributes': [
    {
      'href': '/api/v1/it_emx_datatypes_TypeTest/meta/mref',
      'fieldType': 'MREF',
      'name': 'mref',
      'label': 'MREF Field',
      'description': 'MREF description',
      'attributes': [],
      'enumOptions': [],
      'refEntity': {
        'href': '/api/v1/it_emx_datatypes_TypeTestRef/meta',
        'hrefCollection': '/api/v1/it_emx_datatypes_TypeTestRef',
        'idAttribute': 'value',
        'labelAttribute': 'label',
        'languageCode': 'en',
        'writable': true
      },
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'defaultValue': 'ref1',
      'labelAttribute': false,
      'unique': false,
      'visible': true,
      'lookupAttribute': false,
      'isAggregatable': false
    }
  ]
}

export const xrefSchema = {
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xref',
      'fieldType': 'XREF',
      'name': 'xref',
      'label': 'XREF Field',
      'attributes': [],
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'XREF description',
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

export const oneToManySchema = {
  'attributes': [
    {
      'href': '/api/v2/sys_md_EntityType/meta/attributes',
      'fieldType': 'ONE_TO_MANY',
      'name': 'one_to_many',
      'label': 'One to many Field',
      'attributes': [],
      'refEntity': {
        'href': '/api/v1/it_emx_datatypes_TypeTestRef/meta',
        'hrefCollection': '/api/v1/it_emx_datatypes_TypeTestRef',
        'name': 'sys_md_Attribute',
        'label': 'Attribute',
        'description': 'Meta data for attributes',
        'attributes': [
          {
            'href': '/api/v1/sys_md_Attribute/meta/id',
            'fieldType': 'STRING',
            'name': 'id',
            'label': 'Identifier',
            'attributes': [],
            'maxLength': 255,
            'auto': true,
            'nillable': false,
            'readOnly': true,
            'labelAttribute': false,
            'unique': true,
            'visible': false,
            'lookupAttribute': false,
            'isAggregatable': false
          },
          {
            'href': '/api/v2/sys_md_Attribute/meta/name',
            'fieldType': 'STRING',
            'name': 'name',
            'label': 'Name',
            'attributes': [],
            'maxLength': 255,
            'auto': false,
            'nillable': false,
            'readOnly': true,
            'labelAttribute': true,
            'unique': false,
            'visible': true,
            'lookupAttribute': true,
            'isAggregatable': false
          }
        ],
        'labelAttribute': 'label',
        'idAttribute': 'value',
        'lookupAttributes': [
          'name',
          'label'
        ],
        'isAbstract': false,
        'writable': true,
        'languageCode': 'en'
      },
      'mappedBy': 'entity',
      'auto': false,
      'nillable': true,
      'readOnly': false,
      'labelAttribute': false,
      'unique': false,
      'visible': true,
      'lookupAttribute': false,
      'isAggregatable': false,
      'description': 'This is a one to many. It is a readonly multi select'
    }
  ]
}

export const autoIdSchema = {
  'attributes': [
    {
      'attributes': [],
      'auto': true,
      'description': 'automatically generated internal id, only for internal use.',
      'fieldType': 'STRING',
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/id',
      'isAggregatable': false,
      'label': 'id',
      'labelAttribute': false,
      'lookupAttribute': false,
      'maxLength': 255,
      'name': 'id',
      'nillable': false,
      'readOnly': true,
      'unique': true,
      'visible': false
    }
  ]
}

export const createRowSchema = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'fieldType': 'STRING',
      'href': '/api/v2/sys_sec_User/meta/username',
      'isAggregatable': false,
      'label': 'Username',
      'labelAttribute': true,
      'lookupAttribute': true,
      'maxLength': 255,
      'name': 'username',
      'nillable': false,
      'readOnly': true,
      'unique': true,
      'visible': true
    }
  ]
}

export const computedXrefSchema = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'description': 'Typetest computed xref attribute',
      'expression': '{Chromosome: xstring, Position: xint}',
      'fieldType': 'XREF',
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcomputedxref',
      'isAggregatable': false,
      'label': 'xcomputedxref label',
      'labelAttribute': false,
      'lookupAttribute': false,
      'name': 'xcomputedxref',
      'nillable': true,
      'readOnly': true
    }
  ]
}

export const computedWritableXrefSchema = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'description': 'Typetest computed xref attribute',
      'expression': '{Chromosome: xstring, Position: xint}',
      'fieldType': 'XREF',
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcomputedxref',
      'isAggregatable': false,
      'label': 'xcomputedxref label',
      'labelAttribute': false,
      'lookupAttribute': false,
      'name': 'xcomputedxref',
      'nillable': true,
      'readOnly': false
    }
  ]
}

export const showNonVisibleAttributeSchema = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'fieldType': 'STRING',
      'href': '/api/v2/sys_sec_User/meta/username',
      'isAggregatable': false,
      'label': 'Username',
      'labelAttribute': true,
      'lookupAttribute': true,
      'maxLength': 255,
      'name': 'username',
      'nillable': true,
      'readOnly': false,
      'unique': false,
      'visible': false
    }
  ]
}

export const uniqueFieldSchema = {
  'hrefCollection': '/api/v2/sys_demo/unique_example',
  'idAttribute': 'id',
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'fieldType': 'STRING',
      'href': '/api/v2/sys_demo/unique_example',
      'isAggregatable': false,
      'label': 'Unique demo',
      'labelAttribute': true,
      'lookupAttribute': true,
      'maxLength': 255,
      'name': 'unique_demo',
      'nillable': true,
      'readOnly': false,
      'unique': true,
      'visible': true
    }
  ]
}

export const defaultStringValue = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'fieldType': 'STRING',
      'href': '/api/v2/sys_sec_User/meta/username',
      'isAggregatable': false,
      'label': 'Username',
      'labelAttribute': true,
      'lookupAttribute': true,
      'maxLength': 255,
      'name': 'username',
      'nillable': false,
      'readOnly': true,
      'unique': true,
      'visible': true,
      'defaultValue': 'default string value'
    }
  ]
}

export const defaultBooleanValue = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'fieldType': 'BOOL',
      'href': '/api/v2/sys_sec_User/meta/username',
      'isAggregatable': false,
      'label': 'Username',
      'labelAttribute': true,
      'lookupAttribute': true,
      'maxLength': 255,
      'name': 'username',
      'nillable': false,
      'readOnly': true,
      'unique': true,
      'visible': true,
      'defaultValue': true
    }
  ]
}

// This is a guess, can not test this due to issue: https://github.com/molgenis/molgenis/issues/7857
export const defaultFileValue = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'fieldType': 'FILE',
      'href': '/api/v2/sys_sec_User/meta/username',
      'isAggregatable': false,
      'label': 'File field',
      'labelAttribute': true,
      'lookupAttribute': true,
      'maxLength': 255,
      'name': 'file-field',
      'nillable': false,
      'readOnly': true,
      'unique': true,
      'visible': true,
      'defaultValue': {
        filename: 'file_example.xlsx',
        id: 'aaaaczqwbgfstmvtrombrlyaae',
        url: 'http://localhost:8080/files/aaaaczqwbgfstmvtrombrlyaae',
        _href: '/api/v2/sys_FileMeta/aaaaczqwbgfstmvtrombrlyaae'
      }
    }
  ]
}

export const defaultEnumValue = {
  'attributes': [
    {
      'attributes': [],
      'auto': false,
      'fieldType': 'ENUM',
      'href': '/api/v2/sys_sec_User/meta/username',
      'isAggregatable': false,
      'label': 'File field',
      'labelAttribute': true,
      'lookupAttribute': true,
      'maxLength': 255,
      'name': 'enum-field',
      'nillable': false,
      'readOnly': true,
      'unique': true,
      'visible': true,
      'enumOptions': ['option1', 'option2'],
      'defaultValue': 'option1'
    }
  ]
}
