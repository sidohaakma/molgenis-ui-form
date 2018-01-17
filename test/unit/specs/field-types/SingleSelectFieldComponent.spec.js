import SingleSelectFieldComponent from '@/components/field-types/SingleSelectFieldComponent'
import { mount } from 'vue-test-utils'

describe('SingleSelectFieldComponent unit tests', () => {
  const field = {
    id: 'xref',
    label: 'Xref Field',
    description: 'This is an xref field',
    type: 'single-select',
    disabled: false,
    options: (search) => {
      if (search === 'ref1') {
        return new Promise((resolve) => {
          resolve([
            {
              id: 'ref1',
              label: 'label1',
              value: 'ref1'
            }
          ])
        })
      } else if (search === 'non existing option') {
        return new Promise((resolve) => {
          resolve([])
        })
      }
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
    isRequired: true,
    isValid: true
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
      expect(wrapper.vm.localValue).to.deep.equal({id: 'ref1', label: 'label1', value: 'ref1'})
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

  it('should set an empty option list when search returns nothing', done => {
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    wrapper.vm.fetchOptions('non existing option', (loading) => true)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.options).to.deep.equal([])
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

    wrapper.setData({localValue: null})
    expect(wrapper.emitted().input[1]).to.deep.equal([null])
    expect(wrapper.emitted().dataChange[1]).to.deep.equal([])
  })
})
