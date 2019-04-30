import TextAreaFieldComponent from '@/components/field-types/TextAreaFieldComponent'
import { mount } from 'vue-test-utils'

describe('TextAreaFieldComponent unit tests', () => {
  const field = {
    id: 'text-area-field',
    label: 'Text Area Field',
    description: 'This is a text area field',
    type: 'text-area',
    disabled: false
  }

  const mockParentFunction = () => {
    return null
  }

  const fieldState = {
    $touched: false,
    $submitted: false,
    $invalid: false,
    _addControl: mockParentFunction
  }

  const propsData = {
    value: 'This is data',
    field: field,
    fieldState: fieldState,
    isRequired: true,
    isValid: true,
    inputDebounceTime: 0
  }

  const wrapper = mount(TextAreaFieldComponent, {
    propsData: propsData,
    stubs: { 'fieldMessages': '<div>This field is required</div>' }
  })

  it('should set localValue if value is defined', () => {
    expect(wrapper.vm.localValue).to.deep.equal('This is data')
  })

  it('should render a textarea element', () => {
    expect(wrapper.findAll('textarea').length).to.equal(1)
  })

  it('should emit an updated value on change', (done) => {
    wrapper.setData({ localValue: 'test text area MESSAGE!!' })
    setTimeout(function () {
      expect(wrapper.emitted().input[0]).to.deep.equal(['test text area MESSAGE!!'])
      done()
    }, 1000)
  })
})
