import RadioFieldComponent from '@/components/field-types/RadioFieldComponent'
import { mount } from 'vue-test-utils'

describe('RadioFieldComponent unit tests', () => {
  const field = {
    type: 'radio',
    id: 'radio-field',
    label: 'Radio field',
    description: 'This is a nice radio button selection',
    visible: true,
    required: true,
    disabled: false,
    validators: [],
    options: () => {
      return [
        {
          id: '1',
          label: 'Option 1',
          value: '1'
        },
        {
          id: '2',
          label: 'Option 2',
          value: '2'
        },
        {
          id: '3',
          label: 'Option 3',
          value: '3'
        }
      ]
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
    value: '',
    field: field,
    state: state,
    validate: mockValidateFunction
  }

  const wrapper = mount(RadioFieldComponent,
    {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    }
  )

  it('should render an input for every option', () => {
    const inputs = wrapper.findAll('input')

    expect(inputs.at(0).element.id).to.equal('radio-field-0')
    expect(inputs.at(1).element.id).to.equal('radio-field-1')
    expect(inputs.at(2).element.id).to.equal('radio-field-2')
  })

  it('should emit an updated value on change', () => {
    wrapper.setData({localValue: 'test'})
    expect(wrapper.emitted().input[0]).to.deep.equal(['test'])

    wrapper.setData({localValue: 'test another'})
    expect(wrapper.emitted().input[1]).to.deep.equal(['test another'])

    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })
})
