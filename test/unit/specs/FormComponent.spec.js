import Vue from 'vue'
import VueForm from 'vue-form'
import FormComponent from '@/components/FormComponent'

describe('FormComponent unit tests', () => {
  it('should load the component with "FormComponent" as a name', () => {
    expect(FormComponent.name).to.equal('FormComponent')
  })

  it('should have the correct props listed', () => {
    const props = FormComponent.props
    expect(typeof props.id).to.equal('object')
    expect(typeof props.schema).to.equal('object')
    expect(typeof props.formData).to.equal('object')
  })

  it('should have the correct default data', () => {
    expect(typeof FormComponent.data).to.equal('function')
    const data = FormComponent.data()
    expect(data.state).to.deep.equal({})
  })

  it('renders correctly with minimal props', () => {
    const Constructor = Vue.extend(FormComponent)
    const propsData = {id: 'test-form', schema: {fields: []}}
    const vm = new Constructor({propsData: propsData, mixins: [VueForm]}).$mount()
    expect(vm.$el.id).to.equal('test-form')
  })
})
