import FormFieldComponent from '@/components/FormFieldComponent'
import { shallow } from 'vue-test-utils'

describe('FormFieldComponents unit tests', () => {
  const field = {
    id: 'string',
    type: 'text',
    visible: () => true
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
    data: {'string': 'data'},
    field: field,
    state: state,
    validate: () => {}
  }

  const wrapper = shallow(FormFieldComponent, {
    propsData: propsData
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
})
