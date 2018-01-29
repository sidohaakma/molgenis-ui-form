import CheckboxFieldComponent from '@/components/field-types/CheckboxFieldComponent'
import { mount } from 'vue-test-utils'

describe('CheckboxFieldComponent unit tests', () => {
  const field = {
    id: 'checkbox-field',
    label: 'Checkbox Field',
    description: 'This is a checkbox field',
    type: 'checkbox',
    disabled: false,
    options: () => {
      return new Promise((resolve, reject) => {
        resolve([
          {
            id: '1',
            label: 'Option 1',
            value: '1'
          },
          {
            id: '2',
            label: 'Option 2',
            value: '2'
          }
        ])
      })
    }
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
    field: field,
    fieldState: fieldState,
    isRequired: true,
    isValid: true
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

    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })

  it('should put all options in the localValue', () => {
    wrapper.vm.selectAll()
    expect(wrapper.vm.localValue).to.deep.equal(['1', '2'])
  })

  it('should make the localValue empty', () => {
    wrapper.vm.deSelectAll()
    expect(wrapper.vm.localValue).to.deep.equal([])
  })
})
