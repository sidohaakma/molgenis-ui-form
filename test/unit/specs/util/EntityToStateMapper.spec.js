import EntityToStateMapper from '@/util/EntityToStateMapper'

describe('Entity to state mapper', () => {
  describe('String type mapper', () => {
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
        expect(field.options).to.deep.equal({})
        expect(field.required({'text': 'not test'})).to.equal(true)
        expect(field.required({'text': 'test'})).to.equal(false)
        expect(field.validators[0]({'string': 'valid'})).to.deep.equal({valid: true, message: null})
        expect(field.validators[0]({'string': 'not valid'})).to.deep.equal({valid: false, message: 'Invalid value!'})
      })
    })

    describe('generateFormData', () => {
      it('should map a string type data row to form data', () => {

        const formData = EntityToStateMapper.generateFormData(formFields, data)
        expect(formData).to.deep.equal({string: 'string value'})
      })
    })

  })
})
