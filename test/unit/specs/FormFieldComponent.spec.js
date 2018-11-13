import FormFieldComponent from '@/components/FormFieldComponent'
import { mount, shallow } from 'vue-test-utils'
import Vue from 'vue'

describe('FormFieldComponents unit tests', () => {
  const field = {
    id: 'string',
    type: 'text',
    validate: (data) => data['string'] === 'data',
    visible: () => true,
    required: () => true
  }

  const formState = {
    'string': {
      $pending: false,
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: () => {}
    }
  }

  const propsData = {
    formData: {'string': 'data'},
    field: field,
    formState: formState,
    showOptionalFields: true,
    eventBus: {}
  }

  const wrapper = shallow(FormFieldComponent, {
    propsData: propsData
  })

  describe('validate', () => {
    it('should succeed in validating a field', () => {
      expect(wrapper.vm.isValid).to.equal(true)
    })

    it('should fail in validating a field', () => {
      wrapper.setData({
        formData: {
          'string': 'not valid'
        }
      })
      expect(wrapper.vm.isValid).to.equal(false)
    })
  })

  describe('onDataChange', () => {
    it('should emit a dataChange when its field\'s pending validation finishes in the formState', (done) => {
      formState.string.$pending = true
      Vue.nextTick(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(wrapper.emitted().dataChange).to.be.undefined
        formState.string.$pending = false
        Vue.nextTick(() => {
          expect(wrapper.emitted().dataChange).to.deep.equal([[]])
          done()
        })
      })
    })
  })

  describe('isVisible', () => {
    it('should return true if schema-field visibility is set to true', () => {
      expect(wrapper.vm.isVisible).to.equal(true)
    })

    it('should return true if field is of type field-group', () => {
      const propsData = {
        formData: {},
        field: {
          id: 'group',
          type: 'field-group',
          visible: () => true,
          required: () => true,
          validate: () => true,
          children: [
            {
              id: 'string',
              type: 'text',
              visible: () => true,
              required: () => true,
              validate: () => true
            }
          ]
        },
        formState: formState,
        showOptionalFields: true,
        eventBus: {}
      }

      const wrapper = shallow(FormFieldComponent, {
        propsData: propsData
      })

      expect(wrapper.vm.isVisible).to.equal(true)
    })
  })

  describe('isRequired passed as true in component', () => {
    const wrapper = mount(FormFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    it('should return true if schema-field required is set to true', () => {
      expect(wrapper.vm.isRequired).to.equal(true)
    })

    it('should add the "required-field" class to the fieldset', () => {
      expect(wrapper.classes()).contain('required-field')
    })
  })

  describe('isRequired passed as false in component', () => {
    const field = {
      id: 'string',
      type: 'text',
      validate: (data) => data['string'] === 'data',
      required: () => false,
      visible: () => true
    }

    const propsData = {
      formData: {'string': 'data'},
      field: field,
      formState: formState,
      showOptionalFields: true,
      eventBus: {}
    }

    const wrapper = mount(FormFieldComponent, {
      propsData: propsData
    })

    it('should return false if schema-field required is set to false', () => {
      expect(wrapper.vm.isRequired).to.equal(false)
    })
  })

  describe('noOptionsMessage constructs a message', () => {
    const field = {
      id: 'string',
      type: 'text',
      validate: (data) => data['string'] === 'data',
      required: () => false,
      visible: () => true
    }

    const propsData = {
      formData: {'string': 'data'},
      field: field,
      formState: formState,
      showOptionalFields: true,
      eventBus: {}
    }

    let wrapper

    it('should return the default message is i18n message is not configured', () => {
      wrapper = mount(FormFieldComponent, {propsData: propsData})
      expect(wrapper.vm.noOptionsMessage).to.equal('No options found for given search term.')
    })

    it('should return the default message is i18n configured but no options messsage is set', () => {
      wrapper = mount(FormFieldComponent, {
        propsData: propsData,
        mocks: {
          $t: () => 'form_no_options'
        }
      })
      expect(wrapper.vm.noOptionsMessage).to.equal('No options found for given search term.')
    })

    it('should return the i18n no options message if set', () => {
      wrapper = mount(FormFieldComponent, {
        propsData: propsData,
        mocks: {
          $t: (param) => param === 'ui-form:form_no_options' ? 'Message set' : 'No message set'
        }
      })
      expect(wrapper.vm.noOptionsMessage).to.equal('Message set')
    })
  })

  describe('Hide optional fields', () => {
    const field = {
      id: 'string',
      type: 'text',
      validate: (data) => true,
      required: () => true,
      visible: () => true
    }

    const propsData = {
      formData: {'string': 'data'},
      field: field,
      formState: formState,
      showOptionalFields: false,
      eventBus: {}
    }

    const wrapper = mount(FormFieldComponent, {
      propsData: propsData
    })

    it('should be visible because field is required', () => {
      expect(wrapper.vm.isVisible).to.equal(true)
    })
  })

  describe('Async isUnique function', () => {
    const field = {
      id: 'string',
      type: 'text',
      validate: (data) => true,
      required: () => true,
      visible: () => true,
      unique: (valueToTest, context) => {
        return new Promise((resolve, reject) => {
          resolve(valueToTest === 'test-value' && context.id === 'abc')
        })
      }
    }

    let propsData
    let wrapper

    beforeEach(() => {
      propsData = {
        formData: {'string': 'data', id: 'abc'},
        field: field,
        formState: formState,
        showOptionalFields: false,
        eventBus: {}
      }

      wrapper = shallow(FormFieldComponent, {
        propsData: propsData
      })
    })

    it('should return a promise that resolve to a boolean', (done) => {
      const promise = wrapper.vm.isUnique('test-value')
      promise.then((result) => {
        expect(result).to.equal(true)
        done()
      }, (error) => {
        console.log(error)
      })
    })

    it('should emit dataChange when validation is no longer pending', () => {
      propsData.formData.string = 'data123'
      propsData.formState.string.$pending = true
      wrapper.setProps(propsData)
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.emitted().dataChange).to.be.undefined
      propsData.formState.string.$pending = false
      wrapper.setProps(propsData)
      expect(wrapper.emitted().dataChange.length).to.eq(1)
    })
  })
})
