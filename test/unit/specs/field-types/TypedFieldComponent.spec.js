import TypedFieldComponent from '@/components/field-types/TypedFieldComponent'
import { mount } from 'vue-test-utils'

describe('TypedFieldComponent unit tests', () => {
  const mockParentFunction = () => {
    return null
  }

  const mockValidateFunction = () => {}

  describe('TypedFieldComponent with type text', () => {
    const field = {
      id: 'test-field',
      label: 'Test Field',
      description: 'This is a test field',
      type: 'text',
      visible: true,
      required: true,
      disabled: false,
      validate: (inputValue) => inputValue.indexOf('test') !== -1

    }

    const state = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'hallo',
      field: field,
      state: state,
      validate: mockValidateFunction
    }

    const wrapper = mount(TypedFieldComponent,
      {
        propsData: propsData,
        stubs: {'fieldMessages': '<div>This field is required</div>'}
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
        'form-control form-control-lg vf-pristine vf-invalid vf-untouched vf-invalid-validate')
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
        state: {
          $touched: true,
          $invalid: true
        }
      })

      expect(wrapper.find('input').classes()).to.deep.equal(['form-control', 'form-control-lg', 'is-invalid',
        'vf-pristine', 'vf-invalid', 'vf-untouched', 'vf-pending', 'vf-invalid-validate'])
    })

    it('should show a field message if input is invalid', () => {
      wrapper.setData({
        state: {
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
      visible: true,
      required: true,
      disabled: false,
      validate: () => true
    }

    const state = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 42,
      field: field,
      state: state,
      validate: mockValidateFunction
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

  describe('TypedFieldComponent with type email', () => {
    const field = {
      id: 'typed-field',
      label: 'Typed Field',
      description: 'This is a field that supports many types',
      type: 'email',
      visible: true,
      required: true,
      disabled: false,
      validate: () => true
    }

    const state = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'test@mail.org',
      field: field,
      state: state,
      validate: mockValidateFunction
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
      visible: true,
      required: true,
      disabled: false,
      validate: () => true
    }

    const state = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'super secret password',
      field: field,
      state: state,
      validate: mockValidateFunction
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
      visible: true,
      required: true,
      disabled: false,
      validate: () => true
    }

    const state = {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const propsData = {
      value: 'https://www.test.org',
      field: field,
      state: state,
      validate: mockValidateFunction
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
