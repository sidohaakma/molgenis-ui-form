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

  it.only('should set language to python if programming language is python', () => {
    wrapper.setData({localValue: 'def greet(name):\n\tprint "Hello", name\ngreet("Jack")\ngreet("Jill")\ngreet("Bob")'})
    expect(wrapper.vm.getLanguage()).to.equal('Python')
  })
})
