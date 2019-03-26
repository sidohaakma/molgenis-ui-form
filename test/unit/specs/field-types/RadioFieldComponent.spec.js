import RadioFieldComponent from '@/components/field-types/RadioFieldComponent'
import { mount } from 'vue-test-utils'

describe('RadioFieldComponent unit tests', () => {
  const field = {
    type: 'radio',
    id: 'radio-field',
    label: 'Radio field',
    description: 'This is a nice radio button selection',
    disabled: false,
    options: () => {
      return new Promise((resolve, reject) => {
        resolve([
          {
            id: 'id1',
            label: 'Option 1',
            value: '1'
          },
          {
            id: 'id2',
            label: 'Option 2',
            value: '2'
          },
          {
            id: 'id3',
            label: 'Option 3',
            value: '3'
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
    value: '',
    field: field,
    fieldState: fieldState,
    isRequired: true,
    isValid: true
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

  it('should emit an updated value and set fieldState on change', () => {
    wrapper.setData({localValue: '1'})
    expect(wrapper.emitted().input[0]).to.deep.equal(['1'])
    expect(fieldState.$touched).to.equal(true)
    expect(fieldState.$untouched).to.equal(false)
    expect(fieldState.$dirty).to.equal(true)
    expect(fieldState.$pristine).to.equal(false)
  })
})
