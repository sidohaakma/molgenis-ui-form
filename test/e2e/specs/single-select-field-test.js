/* eslint-disable no-unused-expressions */

module.exports = {
    tags: ['single-select'], // run this suite with 'yarn e2e --tag single-select'
    beforeEach: function (browser) {
      // Wait for form to be loaded
      browser.url(browser.globals.devServerURL)
      browser.url(browser.globals.devServerURL + '/single-select')
    },
  
    'Select single select value': function (browser) {
      browser.options.desiredCapabilities.name = 'Select single select value'
      browser.expect.element('#single-select-form-example').to.be.present
      browser.expect.element('#single-select-form-example.vf-form-untouched.vf-form-pristine').to.be.present
      browser.expect.element('.v-select.vf-untouched.vf-pristine').to.be.present
      browser.click('#single-select-form-example')
      browser.setValue('input[type=search]', ['o']);
      browser.setValue('input[type=search]', [browser.Keys.ENTER]);
      browser.expect.element('#single-select-form-example.vf-form-dirty.vf-form-valid.vf-form-touched').to.be.present
      browser.end() 
    },

    'Empty search param still yields options': function (browser) {
      browser.options.desiredCapabilities.name = 'Empty search param still yields options'
      browser.expect.element('#single-select-form-example').to.be.present
      browser.click('#single-select-form-example')
      browser.assert.elementCount('ul.dropdown-menu > li', 3)
      browser.end() 
    }
  }
  