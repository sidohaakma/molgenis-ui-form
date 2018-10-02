import EntityToFormMapper from '@/util/EntityToFormMapper'
import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'

import * as schemas from './test-schemas'

const response = {
  items: [
    {value: 'ref1', label: 'label1'},
    {value: 'ref2', label: 'label2'},
    {value: 'ref3', label: 'label3'}
  ]
}

const responseBySearch = {
  items: [
    {value: 'ref1', label: 'label1'}
  ]
}

const get = td.function('api.get')
td.when(get('/api/v2/it_emx_datatypes_TypeTestRef')).thenResolve(response)
td.when(get('/api/v2/it_emx_datatypes_TypeTestRef?q=value=like=ref1,label=like=ref1')).thenResolve(responseBySearch)
td.when(get('/api/v2/it_emx_datatypes_TypeTestRef?q=value=in=(ref1,ref2,ref3),label=in=(ref1,ref2,ref3)')).thenResolve(response)
td.when(get('/api/v2/sys_demo/unique_example?&num=1&q=unique_demo==\'am%20i%20unique%3F\'')).thenResolve({items: []})
td.when(get('/api/v2/sys_demo/unique_example?&num=1&q=unique_demo==\'i%20am%20not%20unique%3F\';id!=123')).thenResolve({items: []})
td.replace(api, 'get', get)

describe('Entity to state mapper', () => {
  describe('General functions', () => {
    it('should throw an error for an unknown fieldType', () => {
      const invalidSchema = {
        attributes: [{
          'fieldType': 'NON_EXISTING_TYPE'
        }]
      }

      const result = () => {
        EntityToFormMapper.generateForm(invalidSchema)
      }

      expect(result).to.throw('unknown fieldType (NON_EXISTING_TYPE)')
    })
  })

  describe('generate form fields and data for a [COMPOUND] attribute', () => {
    const data = {
      'compound-string': 'string value',
      'compound-int': 1
    }

    const form = EntityToFormMapper.generateForm(schemas.compoundSchema, data)
    const field = form.formFields[0]

    it('should map a [COMPOUND] attribute to a form field object', () => {
      expect(field.children.length).to.equal(3)
      expect(field.type).to.equal('field-group')
      expect(field.id).to.equal('compound-field')
      expect(field.label).to.equal('Compound field')
      expect(field.description).to.equal('Compound description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    const compoundString = field.children[2]
    it('should have working validation expressions', () => {
      expect(compoundString.validate({'compound-string': 'valid'})).to.equal(true)
      expect(compoundString.validate({'compound-string': 'not valid'})).to.equal(false)
    })

    it('should have working required expressions', () => {
      expect(compoundString.required({'compound-int': 1})).to.equal(false)
      expect(compoundString.required({'compound-int': 2})).to.equal(true)
    })

    it('should have working visible expressions', () => {
      expect(compoundString.visible({'nested-compound-string': 'show'})).to.equal(true)
      expect(compoundString.visible({'nested-compound-string': 'don not show'})).to.equal(false)
    })

    const compoundInt = field.children[0]
    it('should create boolean functions when no expressions are present', () => {
      expect(compoundInt.validate({})).to.equal(true)
      expect(compoundInt.visible({})).to.equal(true)
      expect(compoundInt.required({})).to.equal(true)
    })

    it('should map a [COMPOUND] entity to a form data object', () => {
      const expectedData = {
        'compound-int': 1,
        'nested-compound-enum': undefined,
        'nested-compound-string': undefined,
        'nested-compound-long': undefined,
        'compound-string': 'string value'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [STRING] attribute', () => {
    const data = {
      'string': 'string value'
    }

    const form = EntityToFormMapper.generateForm(schemas.stringSchema, data)
    const field = form.formFields[0]

    it('should map a [STRING] attribute to a form field object', () => {
      expect(field.type).to.equal('text')
      expect(field.id).to.equal('string')
      expect(field.label).to.equal('String Field')
      expect(field.description).to.equal('STRING description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(field.required({'text': 'not test'})).to.equal(false)
      expect(field.required({'text': 'test'})).to.equal(true)

      expect(typeof field.validate).to.equal('function')
      expect(field.validate({'string': 'valid'})).to.equal(true)
      expect(field.validate({'string': 'not-valid'})).to.equal(false)
    })

    it('should map a [STRING] entity to a form data object', () => {
      const expectedData = {
        'string': 'string value'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [EMAIL] attribute', () => {
    const data = {
      'email': 'foobar@molgenis.org'
    }

    const form = EntityToFormMapper.generateForm(schemas.emailSchema, data)
    const field = form.formFields[0]

    it('should map a [EMAIL] attribute to a form field object', () => {
      expect(field.type).to.equal('email')
      expect(field.id).to.equal('email')
      expect(field.label).to.equal('Email Field')
      expect(field.description).to.equal('Email description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [EMAIL] entity to a form data object', () => {
      const expectedData = {
        'email': 'foobar@molgenis.org'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [TEXT] attribute', () => {
    const data = {
      'text': 'text value'
    }

    const form = EntityToFormMapper.generateForm(schemas.textSchema, data)
    const field = form.formFields[0]

    it('should map a [TEXT] attribute to a form field object', () => {
      expect(field.type).to.equal('text-area')
      expect(field.id).to.equal('text')
      expect(field.label).to.equal('Text Field')
      expect(field.description).to.equal('TEXT description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [TEXT] entity to a form data object', () => {
      const expectedData = {
        'text': 'text value'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [BOOLEAN] attribute', () => {
    const data = {
      'boolean': false
    }

    const form = EntityToFormMapper.generateForm(schemas.booleanSchema, data)
    const field = form.formFields[0]

    it('should map a [BOOLEAN] attribute to a form field object', done => {
      expect(field.type).to.equal('radio')
      expect(field.id).to.equal('boolean')
      expect(field.label).to.equal('Boolean Field')
      expect(field.description).to.equal('Boolean description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')

      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'true', value: true, label: 'True'},
          {id: 'false', value: false, label: 'False'}
        ])
        done()
      })
    })

    it('should map a [BOOLEAN] entity to a form data object', () => {
      const expectedData = {
        'boolean': false
      }

      expect(form.formData).to.deep.equal(expectedData)
    })

    it('should map a nillable [BOOLEAN] attribute to a form field object', done => {
      const form = EntityToFormMapper.generateForm(schemas.booleanSchemaNillable, {})
      const field = form.formFields[0]

      expect(field.type).to.equal('radio')
      expect(field.id).to.equal('boolean')
      expect(field.label).to.equal('Boolean Field')
      expect(field.description).to.equal('Boolean description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')

      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'true', value: true, label: 'True'},
          {id: 'false', value: false, label: 'False'},
          {id: 'null', value: null, label: 'N/A'}
        ])
        done()
      })
    })

    it('should hide \'N/A\' option for nillable [BOOLEAN] attribute is mapperOptions.showNillableBooleanOption is set to false', done => {
      const data = null
      const mapperOptions = {
        showNillableBooleanOption: false
      }
      const form = EntityToFormMapper.generateForm(schemas.booleanSchemaNillable, data, mapperOptions)
      const field = form.formFields[0]

      expect(field.type).to.equal('radio')
      expect(field.id).to.equal('boolean')
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')

      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'true', value: true, label: 'True'},
          {id: 'false', value: false, label: 'False'}
        ])
        done()
      })
    })

    it('should use the mapper options.booleanLabels when available ', done => {
      const options = {
        booleanLabels: {
          trueLabel: 'oui',
          falseLabel: 'non',
          nillLabel: 'inconnu'
        }
      }
      const form = EntityToFormMapper.generateForm(schemas.booleanSchemaNillable, {}, options)
      const field = form.formFields[0]

      expect(field.type).to.equal('radio')
      expect(field.id).to.equal('boolean')
      expect(field.label).to.equal('Boolean Field')
      expect(field.description).to.equal('Boolean description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')

      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'true', value: true, label: 'oui'},
          {id: 'false', value: false, label: 'non'},
          {id: 'null', value: null, label: 'inconnu'}
        ])
        done()
      })
    })
  })

  describe('Generate form fields and data for a [INT] attribute', () => {
    const data = {
      'integer': 99
    }

    const form = EntityToFormMapper.generateForm(schemas.intSchema, data)
    const field = form.formFields[0]

    it('should map a [INT] attribute to a form field object', () => {
      expect(field.type).to.equal('integer')
      expect(field.id).to.equal('integer')
      expect(field.label).to.equal('Integer Field')
      expect(field.description).to.equal('Integer description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [INT] entity to a form data object', () => {
      const expectedData = {
        'integer': 99
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [INT] attribute having a range property', () => {
    const form = EntityToFormMapper.generateForm(schemas.intSchemaWithRange, {})
    const field = form.formFields[0]

    it('should map a [INT] attribute to a form field object', () => {
      expect(field.type).to.equal('integer')
      expect(field.id).to.equal('integer')
      expect(field.range).to.deep.equal({
        min: 1,
        max: 45
      })
    })
  })

  describe('Generate form fields and data for a [INT] attribute having only the min part of the range property', () => {
    const form = EntityToFormMapper.generateForm(schemas.intSchemaWithMinRange, {})
    const field = form.formFields[0]

    it('should map a [INT] attribute to a form field object', () => {
      expect(field.type).to.equal('integer')
      expect(field.id).to.equal('integer')
      expect(field.range).to.deep.equal({
        min: 1
      })
    })
  })

  describe('Generate form fields and data for a [INT] attribute having only the max part of the range property', () => {
    const form = EntityToFormMapper.generateForm(schemas.intSchemaWithMaxRange, {})
    const field = form.formFields[0]

    it('should map a [INT] attribute to a form field object', () => {
      expect(field.type).to.equal('integer')
      expect(field.id).to.equal('integer')
      expect(field.range).to.deep.equal({
        max: 45
      })
    })
  })

  describe('Generate form fields and data for a [LONG] attribute', () => {
    const data = {
      'long': 2147483648
    }

    const form = EntityToFormMapper.generateForm(schemas.longSchema, data)
    const field = form.formFields[0]

    it('should map a [LONG] attribute to a form field object', () => {
      expect(field.type).to.equal('long')
      expect(field.id).to.equal('long')
      expect(field.label).to.equal('Long Field')
      expect(field.description).to.equal('Long description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [LONG] entity to a form data object', () => {
      const expectedData = {
        'long': 2147483648
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [DECIMAL] attribute', () => {
    const data = {
      'decimal': 0.205
    }

    const form = EntityToFormMapper.generateForm(schemas.decimalSchema, data)
    const field = form.formFields[0]

    it('should map a [DECIMAL] attribute to a form field object', () => {
      expect(field.type).to.equal('decimal')
      expect(field.id).to.equal('decimal')
      expect(field.label).to.equal('Decimal Field')
      expect(field.description).to.equal('Decimal description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [DECIMAL] entity to a form data object', () => {
      const expectedData = {
        'decimal': 0.205
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [FILE] attribute', () => {
    const data = {
      'file': {
        'href': '/api/v1/sys_FileMeta/aaa123bbb',
        'id': 'aaa123bbb',
        'filename': 'foo.txt',
        'contentType': 'text/plain',
        'size': 5,
        'url': 'https://someserver/files/api',
        'ownerUsername': 'admin'
      }
    }

    const form = EntityToFormMapper.generateForm(schemas.fileSchema, data)
    const field = form.formFields[0]

    it('should map a [FILE] attribute to a form field object', () => {
      expect(field.type).to.equal('file')
      expect(field.id).to.equal('file')
      expect(field.label).to.equal('File Field')
      expect(field.description).to.equal('File description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [FILE] entity to a form data object', () => {
      const expectedData = {
        'file': 'foo.txt'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [HTML] attribute', () => {
    const data = {
      'html': '<p>gloves on</p>'
    }

    const form = EntityToFormMapper.generateForm(schemas.htmlSchema, data)
    const field = form.formFields[0]

    it('should map a [HTML] attribute to a form field object', () => {
      expect(field.type).to.equal('html')
      expect(field.id).to.equal('html')
      expect(field.label).to.equal('Html Field')
      expect(field.description).to.equal('Html description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [HTML] entity to a form data object', () => {
      const expectedData = {
        'html': '<p>gloves on</p>'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [SCRIPT] attribute', () => {
    const data = {
      'script': 'print("Python is awesome")'
    }

    const form = EntityToFormMapper.generateForm(schemas.scriptSchema, data)
    const field = form.formFields[0]

    it('should map a [SCRIPT] attribute to a form field object', () => {
      expect(field.type).to.equal('script')
      expect(field.id).to.equal('script')
      expect(field.label).to.equal('Script Field')
      expect(field.description).to.equal('Script description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [SCRIPT] entity to a form data object', () => {
      const expectedData = {
        'script': 'print("Python is awesome")'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [HYPERLINK] attribute', () => {
    const data = {
      'hyperlink': 'https://google.com'
    }

    const form = EntityToFormMapper.generateForm(schemas.hyperlinkSchema, data)
    const field = form.formFields[0]

    it('should map a [HYPERLINK] attribute to a form field object', () => {
      expect(field.type).to.equal('url')
      expect(field.id).to.equal('hyperlink')
      expect(field.label).to.equal('Hyperlink Field')
      expect(field.description).to.equal('Hyperlink description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [HYPERLINK] entity to a form data object', () => {
      const expectedData = {
        'hyperlink': 'https://google.com'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [ENUM] attribute', () => {
    const data = {
      'enum': 'enum1'
    }

    const form = EntityToFormMapper.generateForm(schemas.enumSchema, data)
    const field = form.formFields[0]

    it('should map a [ENUM] attribute to a form field object', done => {
      expect(field.type).to.equal('radio')
      expect(field.id).to.equal('enum')
      expect(field.label).to.equal('Enum Field')
      expect(field.description).to.equal('Enum description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')

      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'enum1', value: 'enum1', label: 'enum1'},
          {id: 'enum2', value: 'enum2', label: 'enum2'},
          {id: 'enum3', value: 'enum3', label: 'enum3'},
          {id: 'null', value: 'null', label: 'N/A'}
        ])
        done()
      })
    })

    it('should map a [ENUM] entity to a form data object', () => {
      const expectedData = {
        'enum': 'enum1'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })

    it('should map a nillable [ENUM] attribute to a form field object', done => {
      const form = EntityToFormMapper.generateForm(schemas.enumSchemaNillable, {})
      const field = form.formFields[0]

      expect(field.type).to.equal('radio')
      expect(field.id).to.equal('enum')
      expect(field.label).to.equal('Enum Field')
      expect(field.description).to.equal('Enum description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')

      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'enum1', value: 'enum1', label: 'enum1'},
          {id: 'enum2', value: 'enum2', label: 'enum2'},
          {id: 'enum3', value: 'enum3', label: 'enum3'}
        ])
        done()
      })
    })
  })

  describe('Generate form fields and data for a [DATE] attribute', () => {
    const data = {
      'date': '1947/04/07'
    }

    const form = EntityToFormMapper.generateForm(schemas.dateSchema, data)
    const field = form.formFields[0]

    it('should map a [DATE] attribute to a form field object', () => {
      expect(field.type).to.equal('date')
      expect(field.id).to.equal('date')
      expect(field.label).to.equal('Date Field')
      expect(field.description).to.equal('Date description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [DATE] entity to a form data object', () => {
      const expectedData = {
        'date': '1947/04/07'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [DATE_TIME] attribute', () => {
    const data = {
      'datetime': '1985-08-12T11:12:13+0500'
    }

    const form = EntityToFormMapper.generateForm(schemas.dateTimeSchema, data)
    const field = form.formFields[0]

    it('should map a [DATE_TIME] attribute to a form field object', () => {
      expect(field.type).to.equal('date-time')
      expect(field.id).to.equal('datetime')
      expect(field.label).to.equal('Date and time Field')
      expect(field.description).to.equal('Date and time description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('should map a [DATE_TIME] entity to a form data object', () => {
      const expectedData = {
        'datetime': '1985-08-12T11:12:13+0500'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [CATEGORICAL] attribute', () => {
    const data = {
      'categorical': {
        value: 'ref1', label: 'ref1'
      }
    }

    describe('when categorical options are not part of the response', () => {
      const form = EntityToFormMapper.generateForm(schemas.categoricalSchema, data)
      const field = form.formFields[0]

      it('should map a [CATEGORICAL] attribute to a form field object', done => {
        expect(field.type).to.equal('radio')
        expect(field.id).to.equal('categorical')
        expect(field.label).to.equal('Categorical Field')
        expect(field.description).to.equal('Categorical description')
        expect(field.disabled).to.equal(false)
        expect(field.readOnly).to.equal(false)
        expect(field.visible()).to.equal(true)
        expect(typeof field.options).to.equal('function')

        field.options().then(response => {
          expect(response).to.deep.equal([
            {id: 'ref1', value: 'ref1', label: 'ref1'},
            {id: 'ref2', value: 'ref2', label: 'ref2'},
            {id: 'ref3', value: 'ref3', label: 'ref3'}
          ])
          done()
        })
      })

      it('should map a [CATEGORICAL] entity to a form data object', () => {
        const expectedData = {
          'categorical': 'ref1'
        }

        expect(form.formData).to.deep.equal(expectedData)
      })
    })

    describe('when categorical options are included in the response', () => {
      const form = EntityToFormMapper.generateForm(schemas.categoricalSchemaIncludingOptions, data)
      const field = form.formFields[0]

      it('should map a [CATEGORICAL] attribute to a form field object', done => {
        expect(field.type).to.equal('radio')
        expect(field.id).to.equal('categorical')
        expect(typeof field.options).to.equal('function')

        field.options().then(response => {
          expect(response).to.deep.equal([
            {id: 'ref1', value: 'ref1', label: 'label1'},
            {id: 'ref2', value: 'ref2', label: 'label2'}
          ])
          done()
        })
      })
    })
  })

  describe('Generate form fields and data for a [CATEGORICAL_MREF] attribute', () => {
    const data = {
      'categorical_mref': [
        {value: 'ref1', label: 'label2'},
        {value: 'ref2', label: 'label2'}
      ]
    }

    const form = EntityToFormMapper.generateForm(schemas.categoricalMrefSchema, data)
    const field = form.formFields[0]

    it('should map a [CATEGORICAL_MREF] attribute to a form field object', done => {
      expect(field.type).to.equal('checkbox')
      expect(field.id).to.equal('categorical_mref')
      expect(field.label).to.equal('Categorical MREF Field')
      expect(field.description).to.equal('Categorical MREF description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')

      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'ref1', value: 'ref1', label: 'label1'},
          {id: 'ref2', value: 'ref2', label: 'label2'},
          {id: 'ref3', value: 'ref3', label: 'label3'}
        ])
        done()
      })
    })

    it('should map a [CATEGORICAL_MREF] entity to a form data object', () => {
      const expectedData = {
        'categorical_mref': ['ref1', 'ref2']
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [MREF] attribute', () => {
    const data = {
      'mref': [
        {value: 'ref1', label: 'label2'}
      ]
    }

    const form = EntityToFormMapper.generateForm(schemas.mrefSchema, data)
    const field = form.formFields[0]

    it('should map a [MREF] attribute to a form field object', done => {
      expect(field.id).to.equal('mref')
      expect(field.label).to.equal('MREF Field')
      expect(field.description).to.equal('MREF description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')
      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'ref1', value: 'ref1', label: 'label1'},
          {id: 'ref2', value: 'ref2', label: 'label2'},
          {id: 'ref3', value: 'ref3', label: 'label3'}
        ])
        done()
      })
    })

    it('should filter [MREF] response based on search', done => {
      field.options(['ref1', 'ref2', 'ref3']).then(response => {
        expect(response).to.deep.equal([
          {id: 'ref1', value: 'ref1', label: 'label1'},
          {id: 'ref2', value: 'ref2', label: 'label2'},
          {id: 'ref3', value: 'ref3', label: 'label3'}
        ])
        done()
      })
    })

    it('should map a [MREF] entity to a form data object', () => {
      const expectedData = {
        'mref': ['ref1']
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [XREF] attribute', () => {
    const data = {
      'xref': {
        value: 'ref1', label: 'label2'
      }
    }

    const form = EntityToFormMapper.generateForm(schemas.xrefSchema, data)
    const field = form.formFields[0]

    it('should map a [XREF] attribute to a form field object', done => {
      expect(field.type).to.equal('single-select')
      expect(field.id).to.equal('xref')
      expect(field.label).to.equal('XREF Field')
      expect(field.description).to.equal('XREF description')
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')
      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'ref1', value: 'ref1', label: 'label1'},
          {id: 'ref2', value: 'ref2', label: 'label2'},
          {id: 'ref3', value: 'ref3', label: 'label3'}
        ])
        done()
      })
    })

    it('should filter [XREF] response based on search', done => {
      field.options('ref1').then(response => {
        expect(response).to.deep.equal([
          {id: 'ref1', value: 'ref1', label: 'label1'}
        ])
        done()
      })
    })

    it('should map a [XREF] entity to a form data object', () => {
      const expectedData = {
        'xref': 'ref1'
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Generate form fields and data for a [ONE_TO_MANY] attribute', () => {
    const data = {
      'one_to_many': [
        {value: 'ref1'},
        {value: 'ref2'},
        {value: 'ref3'}
      ]
    }

    const form = EntityToFormMapper.generateForm(schemas.oneToManySchema, data)
    const field = form.formFields[0]

    it('should map a [ONE_TO_MANY] attribute to a form field object', done => {
      expect(field.type).to.equal('multi-select')
      expect(field.id).to.equal('one_to_many')
      expect(field.label).to.equal('One to many Field')
      expect(field.description).to.equal('This is a one to many. It is a readonly multi select')
      expect(field.disabled).to.equal(true)
      expect(field.readOnly).to.equal(true)
      expect(field.visible()).to.equal(true)
      expect(typeof field.options).to.equal('function')
      field.options().then(response => {
        expect(response).to.deep.equal([
          {id: 'ref1', value: 'ref1', label: 'label1'},
          {id: 'ref2', value: 'ref2', label: 'label2'},
          {id: 'ref3', value: 'ref3', label: 'label3'}
        ])
        done()
      })
    })

    it('should map a [ONE_TO_MANY] entity to a form data object', () => {
      const expectedData = {
        'one_to_many': ['ref1', 'ref2', 'ref3']
      }

      expect(form.formData).to.deep.equal(expectedData)
    })
  })

  describe('Auto generated ( server side) field value validation', () => {
    const data = {}
    const form = EntityToFormMapper.generateForm(schemas.autoIdSchema, data)

    it('should not map auto, non-visible attribute to field', () => {
      expect(form.formFields.length).to.equal(0)
    })
  })

  describe('MapperMode option', () => {
    const data = {}

    it('Setting the mapper mode to CREATE should set readonly fields to enabled', () => {
      const form = EntityToFormMapper.generateForm(schemas.createRowSchema, data, {mapperMode: 'CREATE'})
      const field = form.formFields[0]
      expect(field.disabled).to.equal(false)
      expect(field.readOnly).to.equal(false)
      expect(field.visible()).to.equal(true)
    })

    it('Setting the mapper mode to UPDATE should set readonly fields to disabled', () => {
      const form = EntityToFormMapper.generateForm(schemas.createRowSchema, data, {mapperMode: 'UPDATE'})
      const field = form.formFields[0]
      expect(field.disabled).to.equal(true)
      expect(field.readOnly).to.equal(true)
      expect(field.visible()).to.equal(true)
    })

    it('Not setting the mapper mode result is the default UPDATE mode being used', () => {
      const form = EntityToFormMapper.generateForm(schemas.createRowSchema, data)
      const field = form.formFields[0]
      expect(field.disabled).to.equal(true)
      expect(field.readOnly).to.equal(true)
      expect(field.visible()).to.equal(true)
    })
  })

  describe('Computed expression field', () => {
    it('should not be part of the form', () => {
      const form = EntityToFormMapper.generateForm(schemas.computedXrefSchema, {})
      expect(form.formFields.length).to.equal(0)
    })
  })

  describe('Computed writable expression field', () => {
    it('should not be part of the form', () => {
      const form = EntityToFormMapper.generateForm(schemas.computedWritableXrefSchema, {})
      expect(form.formFields.length).to.equal(0)
    })
  })

  describe('MapperMode option: showNonVisibleAttributes', () => {
    const data = {}

    it('Setting showNonVisibleAttributes to true results in non visible attr mapping to visible field', () => {
      const form = EntityToFormMapper.generateForm(schemas.showNonVisibleAttributeSchema, data, {showNonVisibleAttributes: true})
      const field = form.formFields[0]
      expect(field.visible()).to.equal(true)
    })

    it('Setting showNonVisibleAttributes to false results in non visible attr mapping to non-visible field', () => {
      const form = EntityToFormMapper.generateForm(schemas.showNonVisibleAttributeSchema, data, {showNonVisibleAttributes: false})
      const field = form.formFields[0]
      expect(field.visible()).to.equal(false)
    })

    it('By default the mapper maps in non visible attr to non-visible field', () => {
      const form = EntityToFormMapper.generateForm(schemas.showNonVisibleAttributeSchema, data, {showNonVisibleAttributes: false})
      const field = form.formFields[0]
      expect(field.visible()).to.equal(false)
    })
  })

  describe('buildIsUniqueFunction', () => {
    const data = {}

    describe('when running the mapper in CREATE mode', () => {
      const form = EntityToFormMapper.generateForm(schemas.uniqueFieldSchema, data, {mapperMode: 'CREATE'})

      it('should return a function that resolve for true in case of unique value', (done) => {
        const promise = form.formFields[0].unique('am i unique?', {id: '123'})

        promise.then((result) => {
          expect(result).to.equal(true)
          done()
        }, () => {
          expect(false).to.equal(true) // fail test
          done()
        })
      })
    })

    describe('when running the mapper in UPDATE mode', () => {
      const form = EntityToFormMapper.generateForm(schemas.uniqueFieldSchema, data, {mapperMode: 'UPDATE'})

      it('should return a function that when querying the backend should exclude the row being updated', (done) => {
        const promise = form.formFields[0].unique('i am not unique?', {id: '123'})

        promise.then((result) => {
          expect(result).to.equal(true)
          done()
        }, () => {
          expect(false).to.equal(true) // fail test
          done()
        })
      })
    })
  })

  describe('Mapping default values', () => {
    describe('when running the mapper in create mode', () => {
      const data = {}
      const mapperOptions = {
        mapperMode: 'CREATE'
      }
      it('A default string value should be mapped to the form value', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultStringValue, data, mapperOptions)
        expect(form.formData['username']).to.equal('default string value')
      })

      it('A default boolean value should be mapped to the form value', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultBooleanValue, data, mapperOptions)
        expect(form.formData['username']).to.equal(true)
      })

      it('A default file value should be mapped using the file name', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultFileValue, data, mapperOptions)
        expect(form.formData['file-field']).to.equal('file_example.xlsx')
      })

      it('A default enum value should be mapped to the form value', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultEnumValue, data, mapperOptions)
        expect(form.formData['enum-field']).to.equal('option1')
      })

      it('A default categorical mref value should be mapped to the form values', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultCategoricalMref, data, mapperOptions)
        expect(form.formData['cat-mref-field']).to.deep.equal(['option1', 'option2'])
      })
    })

    describe('when running the mapper in update mode', () => {
      const data = {}
      const mapperOptions = {
        mapperMode: 'UPDATE'
      }
      it('A default string value should NOT be mapped to the form value', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultStringValue, data, mapperOptions)
        expect(form.formData['username']).to.equal(undefined)
      })

      it('A default boolean value should NOT be mapped to the form value', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultBooleanValue, data, mapperOptions)
        expect(form.formData['username']).to.equal(undefined)
      })

      it('A default file value should NOT be mapped using the file name', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultFileValue, data, mapperOptions)
        expect(form.formData['file-field']).to.equal(undefined)
      })

      it('A default enum value should NOT be mapped to the form value', () => {
        const form = EntityToFormMapper.generateForm(schemas.defaultEnumValue, data, mapperOptions)
        expect(form.formData['enum-field']).to.equal(undefined)
      })
    })
  })
})
