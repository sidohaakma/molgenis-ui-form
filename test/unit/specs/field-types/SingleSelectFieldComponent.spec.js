import SingleSelectFieldComponent from '@/components/field-types/SingleSelectFieldComponent'
import { mount } from 'vue-test-utils'

describe('SingleSelectFieldComponent unit tests', () => {
  const field = {
    id: 'xref-field',
    label: 'Xref Field',
    description: 'This is an xref field',
    type: 'single-select',
    visible: () => true,
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

  const mockValidateFunction = () => {}

  const propsData = {
    field: field,
    state: state,
    validate: mockValidateFunction,
    isRequired: () => true
  }

  const wrapper = mount(SingleSelectFieldComponent, {
    propsData: propsData,
    stubs: {'fieldMessages': '<div>This field is required</div>'}
  })

  it('should render an input for every option', () => {
    const options = wrapper.findAll('option')
    expect(options.length).to.equal(3)

    const disabledOption = options.at(0).element
    expect(disabledOption.disabled).to.equal(true)
    expect(disabledOption.value).to.equal('')
    expect(disabledOption.text).to.equal('Select an option...')
  })

  it('should emit an updated value on change', () => {
    wrapper.setData({localValue: 'ref1'})
    expect(wrapper.emitted().input[0]).to.deep.equal(['ref1'])
    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })
})
