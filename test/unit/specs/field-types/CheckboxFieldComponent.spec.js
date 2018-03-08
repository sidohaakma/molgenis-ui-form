import CheckboxFieldComponent from '@/components/field-types/CheckboxFieldComponent'
import { shallow } from 'vue-test-utils'

describe('CheckboxFieldComponent unit tests', () => {
  const options = [
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
  ]
  const field = {
    id: 'checkbox-field',
    label: 'Checkbox Field',
    description: 'This is a checkbox field',
    type: 'checkbox',
    disabled: false,
    options: () => Promise.resolve(options)
  }

  const fieldState = {
    $touched: false,
    $submitted: false,
    $invalid: false,
    _addControl: () => null
  }

  const propsData = {
    field: field,
    fieldState: fieldState,
    isRequired: true,
    isValid: true
  }

  let wrapper

  beforeEach(function (done) {
    wrapper = shallow(CheckboxFieldComponent, {
      attachToDocument: true,
      propsData: propsData,
      stubs: ['fieldMessages']
    })
    wrapper.vm.$nextTick().then(function () {
      done()
    })
  })

  it('should set empty array as localValue when value is undefined', () => {
    expect(wrapper.vm.localValue).to.deep.equal([])
  })

  it('should render an input for every option', () => {
    const inputs = wrapper.findAll('input')
    expect(inputs.length).to.equal(2)
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
