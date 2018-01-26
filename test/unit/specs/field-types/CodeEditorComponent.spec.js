import CodeEditorFieldComponent from '@/components/field-types/CodeEditorFieldComponent'
import { mount } from 'vue-test-utils'

describe('CodeEditorFieldComponent unit tests', () => {
  const field = {
    id: 'script-field',
    label: 'Script field',
    description: 'This is a script field',
    type: 'script',
    disabled: false
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
    field: field,
    fieldState: fieldState,
    isRequired: true,
    isValid: true
  }

  const wrapper = mount(CodeEditorFieldComponent, {
    propsData: propsData,
    stubs: {'fieldMessages': '<div>This field is required</div>'}
  })

  describe('General checks', () => {
    it('should set empty string as localValue when value is empty', () => {
      expect(wrapper.vm.localValue).to.equal('')
    })

    it('should make code editor not read only if disable is false', () => {
      expect(wrapper.vm.options.readOnly).to.equal(false)
    })

    it('should make code editor read only if disable is true', () => {
      const altField = {
        id: 'script-field',
        label: 'Script field',
        description: 'This is a script field',
        type: 'script',
        disabled: true
      }
      const altPropsData = {
        field: altField,
        fieldState: fieldState,
        isRequired: true,
        isValid: true
      }

      const altWrapper = mount(CodeEditorFieldComponent, {
        propsData: altPropsData,
        stubs: {'fieldMessages': '<div>This field is required</div>'}
      })
      expect(altWrapper.vm.options.readOnly).to.equal(true)
    })
  })

  describe('Check programming languages', () => {
    it('should set language mode to python if code programmed in python', () => {
      wrapper.setData({localValue: 'def greet():\n    print("hello")'})
      expect(wrapper.vm.options.mode).to.equal('python')
    })

    it('should set language mode to javascript if code programmed in javascript', () => {
      wrapper.setData({localValue: 'var price1 = 5;\nvar price2 = 6;\nvar total = price1 + price2;\ndocument.getElementById("demo").innerHTML ="The total is: " + total;'})
      expect(wrapper.vm.options.mode).to.equal('javascript')
    })

    it('should set language mode to r if code programmed in r', () => {
      wrapper.setData({localValue: 'test <- "hello world"'})
      expect(wrapper.vm.options.mode).to.equal('r')
    })

    it('should set language mode to r if code programmed in unrecognized language', () => {
      wrapper.setData({localValue: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'})
      expect(wrapper.vm.options.mode).to.equal('r')
    })

    it('should show htmlmixed highlighting when type is html', () => {
      const htmlField = {
        id: 'html-field',
        label: 'Html field',
        description: 'This is a html field',
        type: 'html',
        disabled: true
      }
      const htmlPropsData = {
        field: htmlField,
        fieldState: fieldState,
        isRequired: false,
        isValid: true
      }

      const htmlWrapper = mount(CodeEditorFieldComponent, {
        propsData: htmlPropsData,
        stubs: {'fieldMessages': '<div>This field is required</div>'}
      })
      expect(htmlWrapper.vm.options.mode).to.equal('htmlmixed')
    })
  })

  describe('Check valid/invalid values', () => {
    const altField = {
      id: 'script-field',
      label: 'Script field',
      description: 'This is a script field',
      type: 'script',
      disabled: true
    }

    const altState = {
      $touched: true,
      $submitted: false,
      $invalid: false,
      _addControl: mockParentFunction
    }

    const altPropsData = {
      field: altField,
      fieldState: altState,
      isRequired: true,
      isValid: true
    }

    const altWrapper = mount(CodeEditorFieldComponent, {
      propsData: altPropsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    it('should correctly set value to invalid', () => {
      altWrapper.setData('')
      expect(altWrapper.vm.isInvalid).to.equal(true)
    })

    it('should correctly set value to valid', () => {
      altWrapper.setData({localValue: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'})
      expect(altWrapper.vm.isInvalid).to.equal(false)
    })
  })
})
