// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import ExamplePage from './example/ExamplePage'
import FormDemo from './example/FormDemo'
import IntegerExample from './example/number-field/IntegerExample'
import LongExample from './example/number-field/LongExample'
import DecimalExample from './example/number-field/DecimalExample'
import UniqueExample from './example/unique/UniqueExample'
import DateTimeExample from './example/date/DateTimeExample'
import FileExample from './example/file/FileExample'
import i18n from '@molgenis/molgenis-i18n-js'

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/all',
      component: FormDemo
    },
    {
      path: '/integer/',
      component: IntegerExample
    },
    {
      path: '/long/',
      component: LongExample
    },
    {
      path: '/decimal/',
      component: DecimalExample
    },
    {
      path: '/unique/',
      component: UniqueExample
    },
    {
      path: '/date-time/',
      component: DateTimeExample
	},
	{
      path: '/file/',
      component: FileExample
    },
    {
      path: '/',
      redirect: '/all'
    }]
})

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['ui-form'],
  callback () {
    /* eslint-disable no-new */
    new Vue({
      el: '#form-demo',
      router,
      template: '<ExamplePage/>',
      components: { ExamplePage }
    })
  }
})
