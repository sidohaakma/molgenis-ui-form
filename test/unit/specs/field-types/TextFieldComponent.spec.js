import TextFieldComponent from '@/components/field-types/TextFieldComponent'
import { shallow } from 'vue-test-utils'
import VueForm from 'vue-form'

describe('TextFieldComponent unit tests', () => {
  const field = {id: 'my-field', type: 'text', validators: []}
  const propsData = {value: 'hallo', field: field, state: {}}
  const wrapper = shallow(TextFieldComponent, { propsData: propsData, mixins: [VueForm] })

  it('should load the component with "TextFieldComponent" as a name', () => {
    expect(TextFieldComponent.name).to.equal('TextFieldComponent')
  })
  it('renders correctly with minimal props', () => {
    expect(wrapper.contains('input')).to.equal(true)
    expect(wrapper.contains('label')).to.equal(true)
    expect(wrapper.contains('small')).to.equal(true)
  })
  it('should load default data with the help of props', () => {
    expect(wrapper.vm.localValue).to.equal('hallo')
  })
  it('should emit an updated value on change', () => {
    wrapper.setData({localValue: 'test'})
    expect(wrapper.emitted().input[0]).to.deep.equal(['test'])

    wrapper.setData({localValue: 'test another'})
    expect(wrapper.emitted().input[1]).to.deep.equal(['test another'])
  })
  it('should receive the "is-invalid" class if not valid', () => {
    wrapper.setData({
      state: {
        $touched: true,
        $invalid: true
      }
    })
    expect(wrapper.find('input').classes()).to.deep.equal(['form-control', 'form-control-lg', 'is-invalid'])
  })
})
