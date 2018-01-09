import FormFieldComponent from '@/components/FormFieldComponent'
import { shallow } from 'vue-test-utils'

describe('FormFieldComponent unit tests', () => {
  const field = {
    id: 'string',
    type: 'text',
    validate: (data) => data['string'] === 'data'
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
    data: {'string': 'data'},
    field: field,
    state: state
  }

  const wrapper = shallow(FormFieldComponent, {
    propsData: propsData
  })

  it('should succeed in validating a field', () => {
    expect(wrapper.vm.validate(field)).to.equal(true)
  })

  it('should fail in validating a field', () => {
    wrapper.setData({
      data: {
        'string': 'not valid'
      }
    })
    expect(wrapper.vm.validate(field)).to.equal(false)
  })

  it('should emit a dataChange event on dataChange', () => {
    wrapper.vm.onDataChange()
    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })
})
