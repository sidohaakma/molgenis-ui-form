import TypedFieldComponent from '@/components/field-types/TypedFieldComponent'
import { mount } from 'vue-test-utils'

const MIN_JAVA_INT = -2147483648
const MAX_JAVA_INT = 2147483647

describe('TypedFieldComponent unit tests', () => {
  const mockParentFunction = () => {
    return null
  }

  describe('TypedFieldComponent with type text', () => {
    const field = {
      id: 'test-field',
      label: 'Test Field',
      description: 'This is a test field',
      type: 'text',
      disabled: false
    }

    const fieldState = {
      showOptionalFields: false,
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'hallo',
      field: field,
      fieldState: fieldState,
      isRequired: true,
      isValid: false,
      inputDebounceTime: 0
    }

    let wrapper

    beforeEach(() => {
      wrapper = mount(TypedFieldComponent,
        {
          propsData: propsData,
          stubs: {'formFieldMessages': '<div class="form-control-feedback"><div class="invalid-feedback">This field is required</div></div>'}
        }
      )
    })

    it('should load the component with "TypedFieldComponent" as a name', () => {
      expect(TypedFieldComponent.name).to.equal('TypedFieldComponent')
    })

    it('renders correctly with minimal props', () => {
      expect(wrapper.contains('input')).to.equal(true)
      expect(wrapper.contains('label')).to.equal(true)
      expect(wrapper.contains('small')).to.equal(true)
    })

    it('should load default data with the help of props', () => {
      expect(wrapper.vm.localValue).to.equal('hallo')
    })

    it('should render the label correctly', () => {
      expect(wrapper.contains('label')).to.equal(true)
      const label = wrapper.find('label')
      expect(label.text()).to.equal('Test Field')
      expect(label.element.htmlFor).to.equal('test-field')
    })

    it('should render the description correctly', () => {
      expect(wrapper.contains('small')).to.equal(true)
      const description = wrapper.find('small')
      expect(description.text()).to.equal('This is a test field')
      expect(description.element.id).to.equal('test-field-description')
      expect(description.element.className).to.equal('form-text text-muted')
    })

    it('should render the input correctly', () => {
      expect(wrapper.contains('input')).to.equal(true)
      const input = wrapper.find('input').element
      expect(input.id).to.equal('test-field')
      expect(input.name).to.equal('test-field')
      expect(input.type).to.equal('text')
      expect(input.required).to.equal(true)
      expect(input.className).to.equal(
        'form-control vf-pristine vf-invalid vf-untouched vf-invalid-validate')
    })

    it('should emit an updated value on change', (done) => {
      wrapper.setData({localValue: 'test'})
      setTimeout(function () {
        expect(wrapper.emitted().input[0]).to.deep.equal(['test'])
        done()
      }, 1000)
    })

    it('should receive the "is-invalid" class if not valid', () => {
      wrapper.setData({
        fieldState: {
          $touched: true,
          $invalid: true
        }
      })

      expect(wrapper.find('input').classes()).to.deep.equal(['form-control', 'is-invalid',
        'vf-pristine', 'vf-invalid', 'vf-untouched', 'vf-invalid-validate'])
    })

    it('should show a field message if input is invalid', () => {
      wrapper.setData({
        fieldState: {
          $touched: true,
          $invalid: true
        }
      })
      expect(wrapper.contains('div.form-control-feedback')).to.equal(true)

      const fieldMessageElement = wrapper.find('div.form-control-feedback')
      expect(fieldMessageElement.text()).to.equal('This field is required')
    })
  })

  describe('TypedFieldComponent with number', () => {
    const field = {
      id: 'typed-field',
      label: 'Typed Field',
      description: 'This is a field that supports many types',
      type: 'integer',
      disabled: false,
      range: {
        min: 1,
        max: 9
      }
    }

    const fieldState = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 42,
      field: field,
      fieldState: fieldState,
      isRequired: true,
      isValid: true
    }

    let wrapper

    beforeEach(() => {
      wrapper = mount(TypedFieldComponent,
        {
          propsData: propsData,
          stubs: {'fieldMessages': '<div>This field is required</div>'}
        }
      )
    })

    it('should emit an updated integer if value is valid integer on change', (done) => {
      wrapper.setData({localValue: '1'})
      setTimeout(function () {
        expect(wrapper.emitted().input[0]).to.deep.equal([1])
        done()
      }, 1000)
    })

    it('should emit null if value empty on change', (done) => {
      wrapper.setData({localValue: ''})
      setTimeout(function () {
        expect(wrapper.emitted().input[0]).to.deep.equal([null])
        done()
      }, 1000)
    })

    it('should render an input of type number', () => {
      const input = wrapper.find('input')
      expect(input.element.type).to.equal('number')
    })

    it('should return 1 for integer stepSize', () => {
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      expect(wrapper.vm.stepSize).to.equal(1)
    })

    it('should use range from props when one is set', () => {
      expect(wrapper.vm.range).to.deep.equal({min: 1, max: 9})
    })

    it('should use range for integer datatype when no range is set in props', () => {
      wrapper.setProps({...propsData, field: {...propsData.field, range: undefined}})
      expect(wrapper.vm.range).to.deep.equal({min: MIN_JAVA_INT, max: MAX_JAVA_INT})
    })

    it('should use range for long datatype when no range is set in props', () => {
      wrapper.setProps({...propsData, field: {...propsData.field, range: undefined, type: 'long'}})
      expect(wrapper.vm.range).to.deep.equal({min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER})
    })

    it('should combine strictest min value from ranges', () => {
      wrapper.setProps({...propsData, field: {...propsData.field, range: {min: 0}}})
      expect(wrapper.vm.range).to.deep.equal({min: 0, max: MAX_JAVA_INT})
    })

    it('should combine strictest max value from ranges', () => {
      wrapper.setProps({...propsData, field: {...propsData.field, range: {max: 0}}})
      expect(wrapper.vm.range).to.deep.equal({min: MIN_JAVA_INT, max: 0})
    })

    it('should set specified range max for decimal datatype', () => {
      wrapper.setProps({...propsData, field: {...propsData.field, range: {max: 0}, type: 'decimal'}})
      expect(wrapper.vm.range).to.deep.equal({max: 0})
    })

    it('should set specified range min for decimal datatype', () => {
      wrapper.setProps({...propsData, field: {...propsData.field, range: {min: 0}, type: 'decimal'}})
      expect(wrapper.vm.range).to.deep.equal({min: 0})
    })
  })

  describe('isWithinRange', () => {
    let propsData = {
      field: {
        id: 'typed-field',
        type: 'long'
      },
      fieldState: {
        $touched: false,
        $submitted: false,
        $invalid: false,
        _addControl: mockParentFunction
      }
    }
    describe('should return true if range is (1, 9) and value is 5', () => {
      propsData.field.range = {
        min: 1,
        max: 9
      }
      propsData.value = 5
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      it('if the value is between min and max', () => {
        expect(wrapper.vm.isValidRange).to.equal(true)
      })
    })
    describe('should return false if range is (1, 9) and value is 11', () => {
      propsData.field.range = {
        min: 1,
        max: 9
      }
      propsData.value = 11
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      it('if the value is between min and max', () => {
        expect(wrapper.vm.isValidRange).to.equal(false)
      })
    })
    describe('should return false if range is (1, 9) and value is -1', () => {
      propsData.field.range = {
        min: 1,
        max: 9
      }
      propsData.value = -1
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      it('if the value is between min and max', () => {
        expect(wrapper.vm.isValidRange).to.equal(false)
      })
    })
    describe('should return false if range is (1, 9) and value is \'foo\'', () => {
      propsData.field.range = {
        min: 1,
        max: 9
      }
      propsData.value = 'foo'
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      it('if the value is not a number', () => {
        expect(wrapper.vm.isValidRange).to.equal(false)
      })
    })
  })

  describe('isValidInt', () => {
    let propsData

    beforeEach(() => {
      propsData = {
        field: {
          id: 'typed-field',
          type: 'integer'
        },
        fieldState: {
          $touched: false,
          $submitted: false,
          $invalid: false,
          _addControl: mockParentFunction
        }
      }
    })

    describe('isValidInt should return true for valid integer values', () => {
      it('if value is 19 in integer validation should return true', () => {
        propsData.value = 19
        const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
        expect(wrapper.vm.isValidInt).to.equal(true)
      })
      it('if value is -2 should return true', () => {
        propsData.value = -2
        const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
        expect(wrapper.vm.isValidInt).to.equal(true)
      })
      it('if value is 0.25 should return false', () => {
        propsData.value = 0.25
        const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
        expect(wrapper.vm.isValidInt).to.equal(false)
      })
      it('if value is \'foo\' should return false', () => {
        propsData.value = 'foo'
        const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
        expect(wrapper.vm.isValidInt).to.equal(false)
      })
    })
  })

  describe('isValidLong', () => {
    let propsData = {
      field: {
        id: 'typed-field',
        type: 'long'
      },
      fieldState: {
        $touched: false,
        $submitted: false,
        $invalid: false,
        _addControl: mockParentFunction
      }
    }
    describe('should return true for valid long values', () => {
      it('if value is 2147483657 (max java int + 10) should return true', () => {
        const maxJavaInt = 2147483647
        propsData.value = maxJavaInt + 10
        const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
        expect(wrapper.vm.isValidLong).to.equal(true)
      })
      it('if value is 0.25 should return false', () => {
        propsData.value = 0.25
        const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
        expect(wrapper.vm.isValidLong).to.equal(false)
      })
      it('if value is \'foo\' return false', () => {
        propsData.value = 'foo'
        const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
        expect(wrapper.vm.isValidLong).to.equal(false)
      })
    })
  })

  describe('TypedFieldComponent with type email', () => {
    const field = {
      id: 'typed-field',
      label: 'Typed Field',
      description: 'This is a field that supports many types',
      type: 'email',
      disabled: false
    }

    const fieldState = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'test@mail.org',
      field: field,
      fieldState: fieldState,
      isRequired: true,
      isValid: true
    }

    const wrapper = mount(TypedFieldComponent,
      {
        propsData: propsData,
        stubs: {'fieldMessages': '<div>This field is required</div>'}
      }
    )

    it('should render an input of type email', () => {
      const input = wrapper.find('input')
      expect(input.element.type).to.equal('email')
    })
  })

  describe('TypedFieldComponent with type password', () => {
    const field = {
      id: 'typed-field',
      label: 'Typed Field',
      description: 'This is a field that supports many types',
      type: 'password',
      disabled: false
    }

    const fieldState = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'super secret password',
      field: field,
      fieldState: fieldState,
      isRequired: true,
      isValid: true
    }

    const wrapper = mount(TypedFieldComponent,
      {
        propsData: propsData,
        stubs: {'fieldMessages': '<div>This field is required</div>'}
      }
    )

    it('should render an input of type password', () => {
      const input = wrapper.find('input')
      expect(input.element.type).to.equal('password')
    })
  })

  describe('TypedFieldComponent with type url', () => {
    const field = {
      id: 'typed-field',
      label: 'Typed Field',
      description: 'This is a field that supports many types',
      type: 'url',
      disabled: false
    }

    const fieldState = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'https://www.test.org',
      field: field,
      fieldState: fieldState,
      isRequired: true,
      isValid: true
    }

    const wrapper = mount(TypedFieldComponent,
      {
        propsData: propsData,
        stubs: {'fieldMessages': '<div>This field is required</div>'}
      }
    )

    it('should render an input of type url', () => {
      const input = wrapper.find('input')
      expect(input.element.type).to.equal('url')
    })
  })

  describe('onKeyUp method', () => {
    let propsData
    let event = {target: {validity: {badInput: true}}}

    beforeEach(() => {
      propsData = {
        field: {
          id: 'typed-field',
          type: 'integer'
        },
        fieldState: {
          $touched: false,
          $submitted: false,
          $invalid: false,
          _addControl: mockParentFunction
        }
      }
    })

    it('should do nothing if the event is valid', () => {
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      wrapper.setData({localValue: null})
      wrapper.setData({value: 4})
      event.target.validity.badInput = false
      wrapper.vm.onKeyUp(event)
      expect(wrapper.vm.localValue).to.equal(null)
    })

    it('should do nothing if the field type is not a number', () => {
      propsData.field.type = 'text'
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      wrapper.setData({localValue: 'hello'})
      wrapper.setData({value: 'hell'})
      event.target.validity.badInput = true
      wrapper.vm.onKeyUp(event)
      expect(wrapper.vm.localValue).to.equal('hello')
    })

    it('should put back the "old" value if the event target input is bad', () => {
      const wrapper = mount(TypedFieldComponent, {propsData: propsData, stubs: ['fieldMessages']})
      wrapper.setData({localValue: null})
      wrapper.setData({value: 4})
      event.target.validity.badInput = true
      wrapper.vm.onKeyUp(event)
      expect(wrapper.vm.localValue).to.equal(4)
    })
  })
})
