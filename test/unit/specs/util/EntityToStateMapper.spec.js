import EntityToStateMapper from '@/util/EntityToStateMapper'

describe('Entity to state mapper', () => {
  describe('General generateFormData functions', () => {
    it('should thrown an error for a unknown fieldType', () => {
      const invalidSchema = {
        attributes: [{
          'fieldType': 'NON_EXISTING_TYPE'
        }]
      }
      const result = () => {
        EntityToStateMapper.generateFormFields(invalidSchema)
      }
      expect(result).to.throw('unknown fieldType (NON_EXISTING_TYPE)')
    })
  })

  describe('STRING type mapper', () => {
    const schema = {
      'href': '/api/v2/it_emx_datatypes_TypeTest',
      'hrefCollection': '/api/v2/it_emx_datatypes_TypeTest',
      'name': 'it_emx_datatypes_TypeTest',
      'label': 'TypeTest',
      'description': 'MOLGENIS Data types test entity',
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
      ],
      'labelAttribute': 'id',
      'idAttribute': 'id',
      'lookupAttributes': [
        'id'
      ],
      'isAbstract': false,
      'writable': true,
      'languageCode': 'en'
    }

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {string: 'string value'}

    describe('generateFormFields', () => {
      it('should map a STRING entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('text')
        expect(field.id).to.equal('string')
        expect(field.label).to.equal('String Field')
        expect(field.description).to.equal('STRING description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
        expect(field.inputProperties).to.equal(undefined)
        expect(field.required({'text': 'not test'})).to.equal(true)
        expect(field.required({'text': 'test'})).to.equal(false)
        expect(field.validators[0]({'string': 'valid'})).to.deep.equal({valid: true, message: null})
        expect(field.validators[0]({'string': 'not valid'})).to.deep.equal({valid: false, message: 'Invalid value!'})
      })
    })

    describe('generateFormFields with visible expression', () => {
      const schema = {
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

      const formFields = EntityToStateMapper.generateFormFields(schema)
      it('should map a STRING entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('text')
        expect(field.id).to.equal('string')
        expect(field.label).to.equal('String Field')
        expect(field.description).to.equal('STRING description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible({'string': 'hide me'})).to.deep.equal(false)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a string type data row to form data', () => {
        expect(formData).to.deep.equal({string: 'string value'})
      })
    })
  })

  describe('EMAIL type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {email: 'foobar@molgenis.org'}

    describe('generateFormFields', () => {
      it('should map a Email entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('email')
        expect(field.id).to.equal('email')
        expect(field.label).to.equal('Email Field')
        expect(field.description).to.equal('Email description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({email: 'foobar@molgenis.org'})
      })
    })
  })

  describe('TEXT type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {text: 'text value'}

    describe('generateFormFields', () => {
      it('should map a TEXT entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('text-area')
        expect(field.id).to.equal('text')
        expect(field.label).to.equal('Text Field')
        expect(field.description).to.equal('TEXT description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
        expect(field.inputProperties).to.equal(undefined)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({text: 'text value'})
      })
    })
  })

  describe('BOOL type mapper', () => {
    const data = {boolean: false}

    describe('generateFormFields', () => {
      it('should map a nullable BOOLEAN entity to state object with a null option', () => {
        const schema = {
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

        const formFields = EntityToStateMapper.generateFormFields(schema)
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('radios')
        expect(field.id).to.equal('boolean')
        expect(field.label).to.equal('Boolean Field')
        expect(field.description).to.equal('Boolean description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
        expect(field.inputProperties).to.deep.equal({
          options: [
            {id: 'true', value: true, label: 'True'},
            {id: 'false', value: false, label: 'False'},
            {id: 'null', value: 'null', label: 'N/A'}
          ]
        }
        )
      })
      it('should map a non nullable BOOLEAN entity to state object without a null option', () => {
        const schema = {
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

        const formFields = EntityToStateMapper.generateFormFields(schema)
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('radios')
        expect(field.id).to.equal('boolean')
        expect(field.label).to.equal('Boolean Field')
        expect(field.description).to.equal('Boolean description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
        expect(field.inputProperties).to.deep.equal({
          options: [
            {id: 'true', value: true, label: 'True'},
            {id: 'false', value: false, label: 'False'}
          ]
        })
      })
    })

    describe('generateFormData', () => {
      const schema = {
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

      const formFields = EntityToStateMapper.generateFormFields(schema)
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({boolean: false})
      })
    })
  })

  describe('INT type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {integer: 99}

    describe('generateFormFields', () => {
      it('should map a INT entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('number')
        expect(field.id).to.equal('integer')
        expect(field.label).to.equal('Integer Field')
        expect(field.description).to.equal('Integer description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({integer: 99})
      })
    })
  })

  describe('LONG type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {long: 2147483648} // max java int + 1

    describe('generateFormFields', () => {
      it('should map a Long entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('number')
        expect(field.id).to.equal('long')
        expect(field.label).to.equal('Long Field')
        expect(field.description).to.equal('Long description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({long: 2147483648})
      })
    })
  })

  describe('DECIMAL type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {decimal: 0.205}

    describe('generateFormFields', () => {
      it('should map a Decimal entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('number')
        expect(field.id).to.equal('decimal')
        expect(field.label).to.equal('Decimal Field')
        expect(field.description).to.equal('Decimal description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({decimal: 0.205})
      })
    })
  })

  describe('FILE type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {
      file: {
        'href': '/api/v1/sys_FileMeta/aaa123bbb',
        'id': 'aaa123bbb',
        'filename': 'foo.txt',
        'contentType': 'text/plain',
        'size': 5,
        'url': 'https://someserver/files/api',
        'ownerUsername': 'admin'
      }
    }

    describe('generateFormFields', () => {
      it('should map a File entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('file')
        expect(field.id).to.equal('file')
        expect(field.label).to.equal('File Field')
        expect(field.description).to.equal('File description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({
          file: {
            'href': '/api/v1/sys_FileMeta/aaa123bbb',
            'id': 'aaa123bbb',
            'filename': 'foo.txt',
            'contentType': 'text/plain',
            'size': 5,
            'url': 'https://someserver/files/api',
            'ownerUsername': 'admin'
          }
        })
      })
    })
  })

  describe('HTML type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {html: '<p>gloves on</p>'}

    describe('generateFormFields', () => {
      it('should map a Html entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('text-area')
        expect(field.id).to.equal('html')
        expect(field.label).to.equal('Html Field')
        expect(field.description).to.equal('Html description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({html: '<p>gloves on</p>'})
      })
    })
  })

  describe('HYPERLINK type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {hyperlink: 'https://google.com'}

    describe('generateFormFields', () => {
      it('should map a HyperLink entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('url')
        expect(field.id).to.equal('hyperlink')
        expect(field.label).to.equal('Hyperlink Field')
        expect(field.description).to.equal('Hyperlink description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({hyperlink: 'https://google.com'})
      })
    })
  })

  describe('ENUM type mapper', () => {
    describe('generateFormFields', () => {
      it('should map a nullable ENUM entity to state object with a null option', () => {
        const schema = {
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

        const formFields = EntityToStateMapper.generateFormFields(schema)
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('radios')
        expect(field.id).to.equal('enum')
        expect(field.label).to.equal('Enum Field')
        expect(field.description).to.equal('Enum description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
        expect(field.inputProperties).to.deep.equal({
          options: [
            {id: 'enum1', value: 'enum1', label: 'enum1'},
            {id: 'enum2', value: 'enum2', label: 'enum2'},
            {id: 'enum3', value: 'enum3', label: 'enum3'},
            {id: 'null', value: 'null', label: 'N/A'}
          ]
        })
      })
      it('should map a non nullable ENUM entity to state object without a null option', () => {
        const schema = {
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

        const formFields = EntityToStateMapper.generateFormFields(schema)
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('radios')
        expect(field.id).to.equal('enum')
        expect(field.label).to.equal('Enum Field')
        expect(field.description).to.equal('Enum description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
        expect(field.inputProperties).to.deep.equal({
          options: [
            {id: 'enum1', value: 'enum1', label: 'enum1'},
            {id: 'enum2', value: 'enum2', label: 'enum2'},
            {id: 'enum3', value: 'enum3', label: 'enum3'}
          ]
        })
      })
    })

    describe('generateFormData', () => {
      const data = {enum: 'enum1'}
      const schema = {
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

      const formFields = EntityToStateMapper.generateFormFields(schema)
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({enum: 'enum1'})
      })
    })
  })

  describe('DATE type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {date: '1947/04/07'}

    describe('generateFormFields', () => {
      it('should map a Date entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('date')
        expect(field.id).to.equal('date')
        expect(field.label).to.equal('Date Field')
        expect(field.description).to.equal('Date description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({date: '1947/04/07'})
      })
    })
  })

  describe('DATE_TIME type mapper', () => {
    const schema = {
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

    const formFields = EntityToStateMapper.generateFormFields(schema)
    const data = {datetime: '1985-08-12T11:12:13+0500'}

    describe('generateFormFields', () => {
      it('should map a Datetime entity to state object', () => {
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('date-time')
        expect(field.id).to.equal('datetime')
        expect(field.label).to.equal('Date and time Field')
        expect(field.description).to.equal('Date and time description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
      })
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({datetime: '1985-08-12T11:12:13+0500'})
      })
    })
  })

  describe('CATEGORICAL type mapper', () => {
    describe('generateFormFields', () => {
      // it('should map a nullable CATEGORICAL entity to state object with a null option', () => {
      //   const schema = {
      //     'attributes': [
      //       {
      //         'href': '/api/v2/it_emx_datatypes_TypeTest/meta/enum',
      //         'fieldType': 'CATEGORICAL',
      //         'name': 'categorical',
      //         'label': 'Categorical Field',
      //         'attributes': [],
      //         'auto': false,
      //         'nillable': true,
      //         'readOnly': false,
      //         'labelAttribute': true,
      //         'unique': true,
      //         'visible': true,
      //         'lookupAttribute': true,
      //         'isAggregatable': false,
      //         'description': 'Categorical description',
      //         'refEntity': {
      //           href: '/api/v1/it_emx_datatypes_TypeTestRef/meta',
      //           hrefCollection: '/api/v1/it_emx_datatypes_TypeTestRef',
      //           idAttribute: 'value',
      //           languageCode: 'en',
      //           writable: true
      //         }
      //       }
      //     ]
      //   }
      //
      //   const formFields = EntityToStateMapper.generateFormFields(schema)
      //   expect(formFields.length).to.equal(1)
      //   const field = formFields[0]
      //   expect(field.type).to.equal('radios')
      //   expect(field.id).to.equal('categorical')
      //   expect(field.label).to.equal('Categorical Field')
      //   expect(field.description).to.equal('Categorical description')
      //   expect(field.disabled).to.equal(false)
      //   expect(field.readOnly).to.equal(false)
      //   expect(field.visible).to.equal(true)
      //   const inputProperties = field.inputProperties
      //   expect(inputProperties.options).to.deep.equal([{id: 'null', value: 'null', label: 'N/A'}])
      //   expect(inputProperties.uri).to.equal('/api/v1/it_emx_datatypes_TypeTestRef')
      //
      // })
      it('should map a non nullable CATEGORICAL entity to state object without a null option', () => {
        const schema = {
          'attributes': [
            {
              'href': '/api/v2/it_emx_datatypes_TypeTest/meta/enum',
              'fieldType': 'CATEGORICAL',
              'name': 'categorical',
              'label': 'Categorical Field',
              'attributes': [],
              'auto': false,
              'nillable': false,
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

        const formFields = EntityToStateMapper.generateFormFields(schema)
        expect(formFields.length).to.equal(1)
        const field = formFields[0]
        expect(field.type).to.equal('radios')
        expect(field.id).to.equal('categorical')
        expect(field.label).to.equal('Categorical Field')
        expect(field.description).to.equal('Categorical description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible).to.equal(true)
        const inputProperties = field.inputProperties
        expect(inputProperties.options).to.deep.equal([])
        expect(inputProperties.uri).to.equal('/api/v1/it_emx_datatypes_TypeTestRef')
      })
    })

    describe('generateFormData', () => {
      const data = {
        categorical: {
          href: '/api/v1/it_emx_datatypes_TypeTestRef/ref1',
          value: 'ref1',
          label: 'label1'
        }
      }
      const schema = {
        'attributes': [
          {
            'href': '/api/v2/it_emx_datatypes_TypeTest/meta/enum',
            'fieldType': 'CATEGORICAL',
            'name': 'categorical',
            'label': 'Categorical Field',
            'attributes': [],
            'auto': false,
            'nillable': false,
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

      const formFields = EntityToStateMapper.generateFormFields(schema)
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({
          categorical: {
            href: '/api/v1/it_emx_datatypes_TypeTestRef/ref1',
            value: 'ref1',
            label: 'label1'
          }
        })
      })
    })
  })
})
