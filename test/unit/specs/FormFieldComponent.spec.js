import FormFieldComponent from '@/components/FormFieldComponent'
import { shallow } from 'vue-test-utils'

describe('FormFieldComponent unit tests', () => {
  const field = {
    id: 'string',
    type: 'text'
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
    state: state,
    validate: () => {}
  }

  const wrapper = shallow(FormFieldComponent, {
    propsData: propsData
  })

  it('should emit a dataChange event on dataChange', () => {
    wrapper.vm.onDataChange()
    expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
  })
})
