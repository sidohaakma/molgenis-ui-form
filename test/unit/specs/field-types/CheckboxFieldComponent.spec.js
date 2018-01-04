import CheckboxFieldComponent from '@/components/field-types/CheckboxFieldComponent'
import { mount } from 'vue-test-utils'

describe('CheckboxFieldComponent unit tests', () => {
  const field = {
    id: 'checkbox-field',
    label: 'Checkbox Field',
    description: 'This is a checkbox field',
    type: 'checkbox',
    visible: true,
    required: true,
    disabled: false,
    validators: [],
    options: () => {
      return new Promise((resolve, reject) => {
        resolve([
          {
            id: '1',
            label: 'Option 1',
            value: '1'
          }
        ])
      })
    }
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

  const mockValidateFunction = () => {}

  const propsData = {
    field: field,
    state: state,
    validate: mockValidateFunction
  }

  const wrapper = mount(CheckboxFieldComponent, {
    propsData: propsData,
    stubs: {'fieldMessages': '<div>This field is required</div>'}
  })

  it('should set empty array as localValue when value is undefined', () => {
    expect(wrapper.vm.localValue).to.deep.equal([])
  })

  it('should render an input for every option', () => {
    const inputs = wrapper.findAll('input')
    expect(inputs.at(0).element.id).to.equal('checkbox-field-0')
  })

  it('should emit an updated value on change', () => {
    wrapper.setData({localValue: ['1']})
    expect(wrapper.emitted().input[0]).to.deep.equal([['1']])
  })
})
