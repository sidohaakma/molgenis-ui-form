/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['integer'], // run this suite with 'yarn e2e --tag integer'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/integer')
  },

  'Integer field should be valid with valid integer': function (browser) {
    browser.options.desiredCapabilities.name = 'Integer field only valid for integers'
    browser.expect.element('#integer-example input[type=number]').to.be.present
    browser.getValue('#integer-example input[type=number]', function (result) {
      this.assert.equal(result.value, '3')
    })
    browser.expect.element('#integer-example input[type=number]').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  },

  'Integer field should be invalid with decimal value': function (browser) {
    browser.options.desiredCapabilities.name = 'Integer field not valid for decimal value'
    browser.expect.element('#integer-example').to.be.present
    browser.click('#integer-example input[type=number]') // https://github.com/nightwatchjs/nightwatch/issues/504
    browser.clearValue('#integer-example input[type=number]')
    browser.setValue('#integer-example input[type=number]', '0,25')
    browser.keys(browser.Keys.TAB)
    browser.expect.element('#integer-example input[type=number]').to.have.attribute('class').which.contains('vf-invalid-integer')
    browser.expect.element('.invalid-message').to.be.present
    browser.expect.element('.invalid-message').text.to.be.equal('Not a valid integer value')
    browser.end()
  }
}
