/* eslint-disable no-unused-expressions */
var moment = require('moment')

module.exports = {
  tags: ['date-time'], // run this suite with 'yarn e2e --tag date-time'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/date-time')
  },

  'Datetime field should be valid with valid datetime string': function (browser) {
    browser.options.desiredCapabilities.name = 'Datetime field only valid for datetime string'
    browser.expect.element('#datetime-example-field').to.be.present
    browser.getValue('#datetime-example-field ', function (result) {
      var utcResult = moment(result.value, 'Y-MM-DD\\THH:mm:ssZ', true).utc().toDate().getTime()
      var utcExpected = moment('1985-08-12T08:12:13+02:00', moment.ISO_8601, true).utc().toDate().getTime()
      this.assert.deepStrictEqual(utcResult, utcExpected)
    })
    browser.expect.element('#datetime-example-field').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  }
}
