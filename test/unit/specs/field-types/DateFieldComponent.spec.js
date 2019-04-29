import DateFieldComponent from '@/components/field-types/DateFieldComponent'
import { mount, shallow } from 'vue-test-utils'

describe('DateFieldComponent', () => {
  describe('component', () => {
    it('should load the component with "DateFieldComponent" as a name', () => {
      expect(DateFieldComponent.name).to.equal('DateFieldComponent')
    })

    it('should have the correct props listed', () => {
      const props = DateFieldComponent.props
      expect(typeof props.value).to.equal('object')
      expect(typeof props.field).to.equal('object')
      expect(typeof props.fieldState).to.equal('object')
      expect(typeof props.isValid).to.equal('object')
      expect(typeof props.isRequired).to.equal('object')
      expect(typeof props.isTimeIncluded).to.equal('object')
    })
  })

  describe('Date only', () => {
    const field = {
      id: 'date-field',
      label: 'Date Field',
      type: 'date',
      disabled: false
    }

    const fieldState = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: () => null
    }

    const propsData = {
      value: '2018-01-01',
      field: field,
      fieldState: fieldState,
      isRequired: true,
      isValid: true
    }

    describe('on value change', () => {
      const wrapper = shallow(DateFieldComponent, {propsData: propsData})

      it('should emit an updated Date object on change', () => {
        wrapper.setData({localValue: '2018-03-13'})

        const expectedDateValue = '2018-03-13'

        expect(wrapper.emitted().input[0]).to.deep.equal([expectedDateValue])
      })
    })

    describe('isValidDateTime', () => {
      const wrapper = mount(DateFieldComponent, {propsData: propsData})

      it('should return true if the localValue is set to a valid date', () => {
        expect(wrapper.vm.isValidDateTime('2018-01-02')).to.equal(true)
      })

      it('should return false if the localValue is set to a invalid date', () => {
        expect(wrapper.vm.isValidDateTime('2018-bla-bla')).to.equal(false)
      })
    })
  })

  describe('Date and time', () => {
    const field = {
      id: 'date--time-field',
      disabled: false
    }

    const fieldState = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: () => null
    }

    const propsData = {
      value: '1985-08-12T11:12:13+0500',
      field: field,
      fieldState: fieldState,
      isRequired: () => true,
      validate: () => true,
      isTimeIncluded: true
    }

    describe('on value change', () => {
      const wrapper = shallow(DateFieldComponent, {propsData: propsData})

      it('should emit an updated Date object including time on change', () => {
        wrapper.setData({localValue: '2018-08-12T11:12:13+0500'})

        const expectedDateTimeValue = '2018-08-12T11:12:13+0500'

        expect(wrapper.emitted().input[0]).to.deep.equal([expectedDateTimeValue])
      })
    })

    describe('on created', () => {
      const mocks = {
        $lng: 'nl'
      }

      const wrapper = mount(DateFieldComponent, {propsData: propsData, mocks: mocks})

      it('set the language', () => {
        expect(wrapper.vm.config.locale.months.longhand[0]).to.equal('januari')
      })
    })

    describe('isValidDateTime', () => {
      const wrapper = mount(DateFieldComponent, {propsData: propsData})

      it('should return true if the localValue is set to a valid date', () => {
        expect(wrapper.vm.isValidDateTime('2018-08-12T11:12:13+0500')).to.equal(true)
      })

      it('should return false if the localValue is set to a invalid date', () => {
        expect(wrapper.vm.isValidDateTime('2018-14-12T11:62:13+0500')).to.equal(false)
      })

      it('should return true if non required field is null', () => {
        expect(wrapper.vm.isValidDateTime(null)).to.equal(true)
      })

      it('should return true if non required field is undefined', () => {
        expect(wrapper.vm.isValidDateTime(null)).to.equal(true)
      })

      it('should return false if non required field is not date (foo)', () => {
        expect(wrapper.vm.isValidDateTime('foo')).to.equal(false)
      })
    })
  })
})
