import FormFieldMessages from '@/components/FormFieldMessages'
import { mount } from 'vue-test-utils'

describe('FormFieldMessages unit tests', () => {
  const mockParentFunction = () => {
    return null
  }

  const fieldState = {
    showOptionalFields: false,
    $touched: false,
    $submitted: false,
    $invalid: true,
    _addControl: mockParentFunction
  }

  const propsData = {
    fieldId: 'testField',
    fieldState: fieldState
  }

  describe('with min = 1 and max = 10', () => {
    const wrapper = mount(FormFieldMessages, {propsData: {...propsData, min: 1, max: 10}, stubs: ['fieldMessages']})
    it('should render range message for min validation errors', () => {
      expect(wrapper.vm.minMessage).to.equal('Value is outside of range (1 - 10)')
    })
    it('should render range message for max validation errors', () => {
      expect(wrapper.vm.maxMessage).to.equal('Value is outside of range (1 - 10)')
    })
  })

  describe('with min = 1', () => {
    const wrapper = mount(FormFieldMessages, {propsData: {...propsData, min: 1}, stubs: ['field-messages']})
    it('should render min message for min validation errors', () => {
      expect(wrapper.vm.minMessage).to.equal('Value is below allowed value 1')
    })
  })

  describe('with max = 10', () => {
    const wrapper = mount(FormFieldMessages, {propsData: {...propsData, max: 10}, stubs: ['field-messages']})
    it('should render max message for max validation errors', () => {
      expect(wrapper.vm.maxMessage).to.equal('Value is above allowed value 10')
    })
  })
})
