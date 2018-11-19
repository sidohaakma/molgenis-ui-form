/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['long'], // run this suite with 'yarn e2e --tag long'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/long')
  },

  'Long field should be valid with valid long': function (browser) {
    browser.options.desiredCapabilities.name = 'Long field only valid for longs'
    browser.expect.element('#long-example').to.be.present
    browser.getValue('#long-example', function (result) {
      this.assert.equal(result.value, '9147483647')
    })
    browser.expect.element('#long-example').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  }
}
