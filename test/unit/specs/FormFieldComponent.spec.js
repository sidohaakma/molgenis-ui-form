import FormFieldComponent from '@/components/FormFieldComponent'
import { shallow, mount } from 'vue-test-utils'

describe('FormFieldComponents unit tests', () => {
  const field = {
    id: 'string',
    type: 'text',
    validate: (data) => data['string'] === 'data',
    visible: () => true,
    required: () => true
  }

  const state = {
    'string': {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: () => {}
    }
  }

  const propsData = {
    formData: {'string': 'data'},
    field: field,
    state: state,
    showOptionalFields: true
  }

  const wrapper = shallow(FormFieldComponent, {
    propsData: propsData
  })

  describe('validate', () => {
    it('should succeed in validating a field', () => {
      expect(wrapper.vm.validate(field)).to.equal(true)
    })

    it('should fail in validating a field', () => {
      wrapper.setData({
        formData: {
          'string': 'not valid'
        }
      })
      expect(wrapper.vm.validate(field)).to.equal(false)
    })
  })

  describe('onDataChange', () => {
    it('should emit a dataChange event on dataChange', () => {
      wrapper.vm.onDataChange()
      expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
    })
  })

  describe('isVisible', () => {
    it('should return true if schema-field visibility is set to true', () => {
      expect(wrapper.vm.isVisible(field)).to.equal(true)
    })
  })

  describe('isRequired', () => {
    const wrapper = mount(FormFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    it('should return true if schema-field required is set to true', () => {
      expect(wrapper.vm.isRequired(field)).to.equal(true)
    })

    it('should add a the "required-field" class to the fieldset', () => {
      expect(wrapper.classes()).contain('required-field')
    })
  })
})
