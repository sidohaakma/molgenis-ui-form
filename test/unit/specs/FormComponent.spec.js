import Vue from 'vue'
import VueForm from 'vue-form'
import FormComponent from '@/components/FormComponent'
import { shallow } from 'vue-test-utils'

describe('FormComponent unit tests', () => {
  it('should load the component with "FormComponent" as a name', () => {
    expect(FormComponent.name).to.equal('FormComponent')
  })

  it('should have the correct props listed', () => {
    const props = FormComponent.props
    expect(typeof props.id).to.equal('object')
    expect(typeof props.schema).to.equal('object')
    expect(typeof props.initialFormData).to.equal('object')
  })

  it('should have the correct state of the FormComponent', () => {
    expect(typeof FormComponent.data).to.equal('function')
    const data = FormComponent.data()
    expect(data.state).to.deep.equal({})
    expect(data.showOptionalFields).to.equal(true)
  })

  it('renders correctly with minimal props', () => {
    const Constructor = Vue.extend(FormComponent)
    const propsData = {id: 'test-form', schema: {fields: []}}
    const vm = new Constructor({propsData: propsData, mixins: [VueForm]}).$mount()
    expect(vm.$el.id).to.equal('test-form')
  })
})

describe('FormComponents shallow tests', () => {
  const field = {
    id: 'string',
    type: 'text',
    validate: (data) => data['string'] === 'data',
    visible: () => true,
    required: () => true
  }

  const state = {
    'string': {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: () => {}
    }
  }

  const propsData = {
    id: 'test',
    data: {'string': 'data'},
    schema: {
      fields: [ field ]
    },
    state: state,
    hooks: {
      onSubmit: () => true,
      onCancel: () => true
    }
  }

  const wrapper = shallow(FormComponent, {
    propsData: propsData
  })

  describe('toggle show optional fields', () => {
    it('should toggle to false', () => {
      wrapper.setData({state: {}, showOptionalFields: true})
      wrapper.vm.toggleOptionalFields()
      expect(wrapper.vm.showOptionalFields).to.equal(false)
    })
  })
})
