/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['decimal'], // run this suite with 'yarn e2e --tag decimal'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/decimal')
  },

  'Decimal field should be valid with valid decimal': function (browser) {
    browser.options.desiredCapabilities.name = 'Decimal field only valid for decimals'
    browser.expect.element('#decimal-example input[type=number]').to.be.present
    browser.getValue('#decimal-example input[type=number]', function (result) {
      this.assert.equal(result.value, '6.67408')
    })
    browser.expect.element('#decimal-example input[type=number]').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  }
}
