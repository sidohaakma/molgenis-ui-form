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

  const state = {
    $touched: false,
    $submitted: false,
    $invalid: false,
    _addControl: mockParentFunction
  }

  const propsData = {
    field: field,
    state: state,
    isRequired: true,
    isValid: true
  }

  const wrapper = mount(FileFieldComponent, {
    propsData: propsData,
    stubs: {'fieldMessages': '<div>This field is required</div>'}
  })

  it('should render a an empty label when no initial value is set', () => {
    expect(wrapper.vm.label).to.equal('')
  })

  it('should render a string when initial value is a file name', () => {
    propsData.value = 'file.zip'
    wrapper.setProps(propsData)
    expect(wrapper.vm.label).to.equal('file.zip')
  })

  it('should render the file name when initial value is a file ', () => {
    const blob = new Blob([''], {type: 'text/html'})
    blob['lastModifiedDate'] = ''
    blob['name'] = 'new_file.zip'

    propsData.value = blob
    wrapper.setProps(propsData)
    expect(wrapper.vm.label).to.equal('new_file.zip')
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
    expect(wrapper.emitted().input[0]).deep.equal(['file'])
    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })
})
