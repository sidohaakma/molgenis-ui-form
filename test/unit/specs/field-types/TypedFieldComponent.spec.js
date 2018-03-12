import TypedFieldComponent from '@/components/field-types/TypedFieldComponent'
import { mount } from 'vue-test-utils'

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
      isValid: false
    }

    const wrapper = mount(TypedFieldComponent,
      {
        propsData: propsData,
        stubs: {'formFieldMessages': '<div class="form-control-feedback"><div class="invalid-message">This field is required</div></div>'}
      }
    )

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

    it('should emit an updated value on change', () => {
      wrapper.setData({localValue: 'test'})
      expect(wrapper.emitted().input[0]).to.deep.equal(['test'])

      wrapper.setData({localValue: 'test another'})
      expect(wrapper.emitted().input[1]).to.deep.equal(['test another'])

      expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
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

  describe('TypedFieldComponent with type number', () => {
    const field = {
      id: 'typed-field',
      label: 'Typed Field',
      description: 'This is a field that supports many types',
      type: 'number',
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

    const wrapper = mount(TypedFieldComponent,
      {
        propsData: propsData,
        stubs: {'fieldMessages': '<div>This field is required</div>'}
      }
    )

    it('should render an input of type number', () => {
      const input = wrapper.find('input')
      expect(input.element.type).to.equal('number')
    })
  })

  describe('isWithinRange', () => {
    let propsData = {
      field: {
        id: 'typed-field',
        type: 'number'
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
        const result = wrapper.vm.isWithinRange()
        expect(result).to.equal(true)
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
        const result = wrapper.vm.isWithinRange()
        expect(result).to.equal(false)
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
        const result = wrapper.vm.isWithinRange()
        expect(result).to.equal(false)
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
})
