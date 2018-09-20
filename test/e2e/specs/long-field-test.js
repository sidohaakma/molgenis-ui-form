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
    browser.expect.element('#long-example input[type=number]').to.be.present
    browser.getValue('#long-example input[type=number]', function (result) {
      this.assert.equal(result.value, '9147483647')
    })
    browser.expect.element('#long-example input[type=number]').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  },

  'Long field should be invalid with decimal value': function (browser) {
    browser.options.desiredCapabilities.name = 'Long field not valid for decimal value'
    browser.expect.element('#long-example input[type=number]').to.be.present

    browser.click('#long-example input[type=number]') // https://github.com/nightwatchjs/nightwatch/issues/504
    browser.clearValue('#long-example input[type=number]')
    browser.setValue('#long-example input[type=number]', '0.25')

    browser.keys(browser.Keys.TAB)
    browser.click('h5.card-header.text-center') // click outside of input to trigger validation
    browser.pause(1000)
    browser.expect.element('#long-example input[type=number]').to.have.attribute('class').which.contains('vf-invalid-long')
    browser.expect.element('.invalid-message').to.be.present
    browser.expect.element('.invalid-message').text.to.be.equal('Not a valid long value')
    browser.end()
  }
}
