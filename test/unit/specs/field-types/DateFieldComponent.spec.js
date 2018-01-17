import DateFieldComponent from '@/components/field-types/DateFieldComponent'
import { mount } from 'vue-test-utils'

describe('DateFieldComponent', () => {
  const field = {
    id: 'date-field',
    label: 'Date Field',
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
    value: '2018-01-01',
    field: field,
    state: state,
    isRequired: true,
    isValid: true
  }

  describe('component', () => {
    it('should load the component with "DateFieldComponent" as a name', () => {
      expect(DateFieldComponent.name).to.equal('DateFieldComponent')
    })

    it('should have the correct props listed', () => {
      const props = DateFieldComponent.props
      expect(typeof props.value).to.equal('object')
      expect(typeof props.field).to.equal('object')
      expect(typeof props.state).to.equal('object')
      expect(typeof props.isValid).to.equal('object')
      expect(typeof props.isRequired).to.equal('object')
    })
  })

  describe('on value change', () => {
    const wrapper = mount(DateFieldComponent, { propsData: propsData })

    it('should emit an updated value on change', () => {
      wrapper.setData({localValue: '2018-01-02'})
      expect(wrapper.emitted().input[0]).to.deep.equal(['2018-01-02'])
      expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
    })
  })

  describe('isValidDate', () => {
    const wrapper = mount(DateFieldComponent, {propsData: propsData})

    it('should return true if the localValue is set to a valid date', () => {
      expect(wrapper.vm.isValidDate('2018-01-02')).to.equal(true)
    })

    it('should return false if the localValue is set to a invalid date', () => {
      expect(wrapper.vm.isValidDate('2018-bla-bla')).to.equal(false)
    })
  })
})
