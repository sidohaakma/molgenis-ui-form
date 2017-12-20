import Vue from 'vue'
import FormComponent from '@/components/FormComponent'

describe('FormComponent.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(FormComponent)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('input').value)
    .to.equal('Hello')
  })
})
