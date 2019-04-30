import FileFieldComponent from '@/components/field-types/FileFieldComponent'
import { mount } from 'vue-test-utils'

describe('FileFieldComponent unit tests', () => {
  const field = {
    id: 'file-field',
    label: 'File Field',
    description: 'This is a file field',
    type: 'file',
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
    isRequired: false,
    isValid: true
  }

  const wrapper = mount(FileFieldComponent, {
    propsData: propsData,
    stubs: { 'fieldMessages': '<div>This field is required</div>' }
  })
  wrapper.vm.$t = (x) => x

  it('should render a an empty label when no initial value is set', () => {
    expect(wrapper.vm.label).to.equal('')
  })

  it('should render a string when initial value is a file name', () => {
    propsData.value = 'file.zip'
    wrapper.setProps(propsData)
    expect(wrapper.vm.label).to.equal('file.zip')
  })

  it('should render the file name when initial value is a file ', () => {
    const blob = new Blob([''], { type: 'text/html' })
    blob['lastModifiedDate'] = ''
    blob['name'] = 'new_file.zip'

    propsData.value = blob
    wrapper.setProps(propsData)
    expect(wrapper.vm.label).to.equal('new_file.zip')
  })

  it('should render the correct button text when a file is selected', () => {
    propsData.value = 'file.zip'
    wrapper.setProps(propsData)
    expect(wrapper.vm.buttonText).to.equal('ui-form:form_file_change')
  })

  it('should render the correct button text when no file is selected', () => {
    propsData.value = null
    wrapper.setProps(propsData)
    expect(wrapper.vm.buttonText).to.equal('ui-form:form_file_browse')
  })

  it('should clear file input if the field is nillable', () => {
    expect(wrapper.vm.isRequired).to.equal(false)
    wrapper.vm.clear()
    expect(wrapper.vm.label).to.equal('')
    expect(wrapper.emitted().input.slice(-1)[0]).deep.equal([null])
  })

  it('should not clear file input if the field is required', () => {
    propsData.isRequired = true
    propsData.value = 'file.zip'
    wrapper.setProps(propsData)
    expect(wrapper.vm.isRequired).to.equal(true)
    wrapper.vm.clear()
    expect(wrapper.vm.label).to.equal('file.zip')
  })

  it('should emit change when the file input is updated', () => {
    const event = {
      target: {
        files: [
          'file'
        ]
      }
    }
    wrapper.vm.handleFileChange(event)
    expect(wrapper.emitted().input.slice(-1)[0]).deep.equal(['file'])
  })
})
