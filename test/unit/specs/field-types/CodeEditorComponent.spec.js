import CodeEditorFieldComponent from '@/components/field-types/CodeEditorFieldComponent'
import { mount } from 'vue-test-utils'

describe('CodeEditorFieldComponent unit tests', () => {
  const field = {
    id: 'script-field',
    label: 'Script field',
    description: 'This is a script field',
    type: 'script',
    disabled: false
  }

  const mockParentFunction = () => {
    return null
  }

  const state = {
    $touched: false,
    $submitted: false,
    $invalid: false,
    _addControl: mockParentFunction
  }

  const propsData = {
    field: field,
    state: state,
    isRequired: true,
    isValid: true
  }

  const wrapper = mount(CodeEditorFieldComponent, {
    propsData: propsData,
    stubs: {'fieldMessages': '<div>This field is required</div>'}
  })

  it('should set empty string as localValue when value is empty', () => {
    expect(wrapper.vm.localValue).to.equal('')
  })

  it('should return javascript as language if the localvalue is written in javascript', () => {
    wrapper.setData({localValue: 'var price1 = 5;\nvar price2 = 6;\nvar total = price1 + price2;\ndocument.getElementById("demo").innerHTML ="The total is: " + total;'})
    expect(wrapper.vm.inputLanguage).to.equal('javascript')
  })

  it('should return python as language if the localvalue is written in python', () => {
    wrapper.setData({localValue: 'def greet():\n    print("hello")'})
    expect(wrapper.vm.inputLanguage).to.equal('python')
  })

  it('should return r as language if the localvalue is written in r', () => {
    wrapper.setData({localValue: 'test <- "hello world"'})
    expect(wrapper.vm.inputLanguage).to.equal('r')
  })

  it('should return other as language if the localvalue is written in an unrecognized language', () => {
    wrapper.setData({localValue: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'})
    expect(wrapper.vm.inputLanguage).to.equal('unknown')
  })

  it('should set language mode to python if code programmed in python', () => {
    wrapper.setData({localValue: 'def greet():\n    print("hello")'})
    expect(wrapper.vm.options.mode).to.equal('python')
  })

  it('should set language mode to javascript if code programmed in javascript', () => {
    wrapper.setData({localValue: 'var price1 = 5;\nvar price2 = 6;\nvar total = price1 + price2;\ndocument.getElementById("demo").innerHTML ="The total is: " + total;'})
    expect(wrapper.vm.options.mode).to.equal('javascript')
  })

  it('should set language mode to r if code programmed in r', () => {
    wrapper.setData({localValue: 'test <- "hello world"'})
    expect(wrapper.vm.options.mode).to.equal('r')
  })

  it('should set language mode to r if code programmed in unrecognized language', () => {
    wrapper.setData({localValue: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'})
    expect(wrapper.vm.options.mode).to.equal('r')
  })

  it('should make code editor not read only if disable is false', () => {
    expect(wrapper.vm.options.readOnly).to.equal(false)
  })

  it('should make code editor read only if disable is true', () => {
    const altField = {
      id: 'script-field',
      label: 'Script field',
      description: 'This is a script field',
      type: 'script',
      disabled: true
    }
    const altPropsData = {
      field: altField,
      state: state,
      isRequired: true,
      isValid: true
    }

    const altWrapper = mount(CodeEditorFieldComponent, {
      propsData: altPropsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })
    expect(altWrapper.vm.options.readOnly).to.equal(true)
  })
})
