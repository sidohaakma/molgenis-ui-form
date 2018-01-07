// import FormFieldComponent from '@/components/FormFieldComponent'
// import { mount } from 'vue-test-utils'
//
// describe('FormFieldComponent unit tests', () => {
//   const field = {
//     id: 'string',
//     label: 'String',
//     description: 'This is a String field',
//     type: 'text',
//     visible: true,
//     required: true,
//     disabled: false,
//     validators: []
//   }
//
//   const mockParentFunction = () => {
//     return null
//   }
//
//   const state = {
//     'string': {
//       $touched: false,
//       $submitted: false,
//       $invalid: false,
//       _addControl: mockParentFunction,
//       $name: 'string'
//     }
//   }
//
//   const mockValidateFunction = () => {}
//
//   const propsData = {
//     data: {'string': 'data'},
//     field: field,
//     state: state,
//     validate: mockValidateFunction
//   }
//
//   const wrapper = mount(FormFieldComponent, {
//     propsData: propsData,
//     stubs: {'fieldMessages': '<div>This field is required</div>'}
//   })
//
//   it('should emit a a dataChange event on dataChange', () => {
//     const textArea = wrapper.find('input')
//     textArea.trigger('dataChange')
//
//     expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
//   })
// })
