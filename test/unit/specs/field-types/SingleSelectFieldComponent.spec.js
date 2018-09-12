import SingleSelectFieldComponent from '@/components/field-types/SingleSelectFieldComponent'
import { mount } from 'vue-test-utils'
import td from 'testdouble'

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

  const fieldState = {
    $touched: false,
    $submitted: false,
    $invalid: false,
    _addControl: mockParentFunction
  }

  let mockEmit = td.function()

  const propsData = {
    field: field,
    fieldState: fieldState,
    isRequired: true,
    isValid: true,
    eventBus: {
      $emit: mockEmit
    }
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

  it('should emit an "addOption" event when the "addOptionClicked" function is called', () => {
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })
    wrapper.vm.addOptionClicked('myEvent')
    td.verify(mockEmit('addOption', td.matchers.isA(Object), 'myEvent', td.matchers.isA(Object)))
  })

  it('should add the new option to the options list when "afterOptionCreation" is invoked ', () => {
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })
    const myOption = {
      id: 'id',
      label: 'label',
      value: 'value'
    }
    wrapper.vm.afterOptionCreation(myOption)
    expect(wrapper.vm.localValue).to.deep.equal(myOption)
  })

  it('should set the new option as the selected option when "afterOptionCreation" is invoked ', () => {
    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })
    const myOption = {
      id: 'id',
      label: 'label',
      value: 'value'
    }
    wrapper.vm.afterOptionCreation(myOption)
    expect(wrapper.vm.localValue).to.deep.equal(myOption)
  })

  it('should render the add btn when the allowAddingOptions property is set to true ', () => {
    propsData.allowAddingOptions = true

    const wrapper = mount(SingleSelectFieldComponent, {
      propsData: propsData,
      stubs: ['fieldMessages']
    })
    expect(wrapper.findAll('.input-group-append').exists()).to.equal(true)
  })
})
