import MultiSelectFieldComponent from '@/components/field-types/MultiSelectFieldComponent'
import { mount } from 'vue-test-utils'

describe('MultiSelectFieldComponent unit tests', () => {
  const field = {
    id: 'mref-field',
    label: 'MREF Field',
    type: 'multi-select',
    disabled: false,
    options: () => {
      return new Promise((resolve) => {
        resolve([
          {
            id: '1',
            label: 'Option 1',
            value: '1'
          },
          {
            id: '2',
            label: 'Option 2',
            value: '3'
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

  const propsData = {
    field: field,
    state: state,
    isRequired: () => true,
    validate: () => false
  }

  const wrapper = mount(MultiSelectFieldComponent, {
    propsData: propsData,
    stubs: {'fieldMessages': '<div>This field is required</div>'}
  })

  it('should render an option for every option', () => {
    const options = wrapper.findAll('option')
    expect(options.length).to.equal(2)

    const select = wrapper.find('select').element
    expect(select.multiple).to.equal(true)
  })

  it('should emit an updated value on change', () => {
    wrapper.setData({localValue: ['ref1']})
    expect(wrapper.emitted().input[0]).to.deep.equal([['ref1']])
    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })
})
