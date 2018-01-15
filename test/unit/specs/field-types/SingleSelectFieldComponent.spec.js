import SingleSelectFieldComponent from '@/components/field-types/SingleSelectFieldComponent'
import { mount } from 'vue-test-utils'

describe('SingleSelectFieldComponent unit tests', () => {
  const field = {
    id: 'xref-field',
    label: 'Xref Field',
    description: 'This is an xref field',
    type: 'single-select',
    disabled: false,
    options: (search) => {
      return search ? new Promise((resolve) => {
        resolve([
          {
            id: 'ref1',
            label: 'label1',
            value: 'ref1'
          }
        ])
      }) : new Promise((resolve) => {
        resolve([
          {
            id: 'ref1',
            label: 'ref1',
            value: 'ref1'
          },
          {
            id: 'ref2',
            label: 'ref2',
            value: 'ref2'
          }
        ])
      })
    }
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
    validate: () => true,
    isRequired: () => true,
    visible: () => true
  }

  it('should have an empty option list when no initial value is present', done => {
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.options).to.deep.equal([])
      done()
    })
  })

  it('should fetch options on create with a search query when initial value is set', done => {
    propsData.value = 'ref1'
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.options).to.deep.equal([{id: 'ref1', label: 'label1', value: 'ref1'}])
      done()
    })
  })

  it('should set the list of options when searched', done => {
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    wrapper.vm.fetchOptions('ref1', (loading) => true)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.options).to.deep.equal([{id: 'ref1', label: 'label1', value: 'ref1'}])
      done()
    })
  })

  it('should emit an updated value on change', () => {
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    wrapper.setData({localValue: {id: 'ref1'}})
    expect(wrapper.emitted().input[0]).to.deep.equal(['ref1'])
    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })
})
