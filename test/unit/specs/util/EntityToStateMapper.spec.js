import EntityToStateMapper from '@/util/EntityToStateMapper'

describe('Entity to state mapper', () => {
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

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a string type data row to form data', () => {
        expect(formData).to.deep.equal({string: 'string value'})
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
    const data = {boolean: false}

    describe('generateFormFields', () => {
      it('should map a BOOLEAN entity to state object', () => {
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
    })

    describe('generateFormData', () => {
      const formData = EntityToStateMapper.generateFormData(formFields, data)
      it('should map a type data row to form data', () => {
        expect(formData).to.deep.equal({boolean: false})
      })
    })
  })
})
