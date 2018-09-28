/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['default'], // run this suite with 'yarn e2e --tag default'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/create-entity')
  },

  'The entity mapper should set the default values in create mode': function (browser) {
    browser.pause(3000)
    browser.options.desiredCapabilities.name = 'Default values'
    browser.getLocationInView('#compound-int-fs input')
    browser.expect.element('#compound-int-fs input').to.be.present
    browser.getValue('#compound-int-fs input', function (result) {
      this.assert.equal(result.value, '1')
    })
    browser.end()
  }
}
