/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['radio'], // run this suite with 'yarn e2e --tag radio'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/radio')
  },

  'Deselect radio option': function (browser) {
    browser.options.desiredCapabilities.name = 'Deselect radio option'
    browser.click('#nillable + label')
    browser.expect.element('#radio-example-null').to.be.present
    browser.expect.element('#radio-example-null').to.be.selected
    browser.expect.element('#radio-example-null + label').text.to.equal('N/A')
    browser.click('label.form-check-label')
    browser.expect.element('#radio-example-null').not.to.be.selected
    browser.end()
  },

  'Select radio option': function (browser) {
    browser.options.desiredCapabilities.name = 'Select radio option'
    browser.expect.element('#radio-example-form').to.be.present
    browser.expect.element('#radio-example-form.vf-form-untouched.vf-form-pristine').to.be.present
    browser.expect.element('#radio-example-0.vf-untouched.vf-pristine').to.be.present
    browser.click('label.form-check-label')
    browser.expect.element('#radio-example-form.vf-form-touched.vf-form-dirty').to.be.present
    browser.expect.element('#radio-example-0.vf-touched.vf-dirty').to.be.present
    browser.getValue('input[name="radio-example"]', function (result) {
      this.assert.equal(result.value, 1)
    })
    browser.end()
  }
}
