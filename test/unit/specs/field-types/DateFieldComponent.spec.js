import DateFieldComponent from '@/components/field-types/DateFieldComponent'
import { mount } from 'vue-test-utils'
import moment from 'moment'

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
      const wrapper = mount(DateFieldComponent, {propsData: propsData})

      it('should emit an updated Date object on change', () => {
        wrapper.setData({localValue: '2018-03-13'})

        const expectedDateValue = '2018-03-13'

        expect(wrapper.emitted().input[0]).to.deep.equal([expectedDateValue])
        expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
      })
    })

    describe('getDateFromValue', () => {
      const wrapper = mount(DateFieldComponent, {propsData: propsData})

      it('should return a moment object for a date string', () => {
        const date = '2018-01-02'
        const actual = wrapper.vm.getDateFromValue(date)
        const expected = moment(date, 'YYYY-MM-DD', true)

        expect(actual).to.deep.equal(expected)
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
      value: '2018-01-01 13:23',
      field: field,
      fieldState: fieldState,
      isRequired: () => true,
      validate: () => true,
      isTimeIncluded: true
    }

    describe('on value change', () => {
      const wrapper = mount(DateFieldComponent, {propsData: propsData})

      it('should emit an updated Date object including time on change', () => {
        wrapper.setData({localValue: '2018-01-02 13:37'})

        const expectedDateTimeValue = '2018-01-02 13:37'

        expect(wrapper.emitted().input[0]).to.deep.equal([expectedDateTimeValue])
        expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
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

    describe('getDateTimeFromValue', () => {
      const wrapper = mount(DateFieldComponent, {propsData: propsData})

      it('should return a moment object for a date string', () => {
        const date = '2018-01-02 13:37'
        const actual = wrapper.vm.getDateFromValue(date)
        const expected = moment(date, moment.ISO_8601, true)

        expect(actual).to.deep.equal(expected)
      })
    })

    describe('isValidDateTime', () => {
      const wrapper = mount(DateFieldComponent, {propsData: propsData})

      it('should return true if the localValue is set to a valid date', () => {
        expect(wrapper.vm.isValidDateTime('2018-01-02 13:23')).to.equal(true)
      })

      it('should return false if the localValue is set to a invalid date', () => {
        expect(wrapper.vm.isValidDateTime('2018-01-02 13:23 PM')).to.equal(false)
      })
    })
  })
})
