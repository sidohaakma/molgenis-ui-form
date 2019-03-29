/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['number-empty'], // run this suite with 'yarn e2e --tag number-empty'

  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/integer')
  },

  'Clearing the value should place "null" in the model': function (browser) {
    browser.options.desiredCapabilities.name = 'Clearing the value should place "null" in the model'
    browser.expect.element('#integer-example').to.be.present

    browser.click('#integer-example')
    browser.pause(1000)
    // send backspace
    browser.setValue('#integer-example', '\uE003')
    browser.pause(1000)

    browser.expect.element('#integer-example').to.have.attribute('class').which.contains('vf-valid')
    browser.getText('.field-data-json', function (result) {
      this.assert.equal(JSON.parse(result.value)['integer-example'], null)
      browser.end()
    })
  }

}
