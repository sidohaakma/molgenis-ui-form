import DataFieldComponent from '@/components/field-types/DateFieldComponent'
import { mount } from 'vue-test-utils'

describe('DataFieldComponent', () => {
  const field = {
    id: 'checkbox-field',
    label: 'Checkbox Field',
    type: 'date',
    disabled: false
  }

  const state = {
    $touched: false,
    $submitted: false,
    $invalid: false,
    _addControl: () => null
  }

  const propsData = {
    field: field,
    state: state,
    isRequired: () => true,
    validate: () => true
  }

  const wrapper = mount(DataFieldComponent, {
    propsData: propsData,
    stubs: ['fieldMessages']
  })

  it('should load the component with "DateFieldComponent" as a name', () => {
    expect(DataFieldComponent.name).to.equal('DateFieldComponent')
  })

  it('should have the correct props listed', () => {
    const props = DataFieldComponent.props
    expect(typeof props.value).to.equal('object')
    expect(typeof props.field).to.equal('object')
    expect(typeof props.state).to.equal('object')
    expect(typeof props.validate).to.equal('object')
    expect(typeof props.isRequired).to.equal('object')
  })

  it('should emit an updated value on change', () => {
    wrapper.setData({localValue: '2018-01-01'})
    expect(wrapper.emitted().input[1]).to.deep.equal(['2018-01-01'])
    expect(wrapper.emitted().dataChange[1]).to.deep.equal([])
  })
})
