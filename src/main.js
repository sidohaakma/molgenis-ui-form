// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FormDemo from './FormDemo'
import i18n from '@molgenis/molgenis-i18n-js/dist/molgenis-i18n.esm'

Vue.config.productionTip = false

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: 'form',
  callback () {
    /* eslint-disable no-new */
    new Vue({
      el: '#form-demo',
      template: '<FormDemo/>',
      components: { FormDemo }
    })
  }
})
