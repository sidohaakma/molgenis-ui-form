/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['unique'], // run this suite with 'yarn e2e --tag unique'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/unique')
  },

  'Unique field should be valid for unique value': function (browser) {
    browser.options.desiredCapabilities.name = 'Unique field valid for unique values'
    browser.expect.element('#unique-example input[type=string]').to.be.present
    browser.click('#unique-example input[type=string]')
    browser.getValue('#unique-example input[type=string]', function (result) {
      this.assert.equal(result.value, 'demo value')
    })
    browser.keys(browser.Keys.TAB)
    browser.click('h5.card-header.text-center') // click outside of input
    browser.expect.element('#unique-example input[type=string]').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  },

  'Unique field should be invalid for non unique value': function (browser) {
    browser.options.desiredCapabilities.name = 'Unique field not valid non unique value (\'test\')'
    browser.expect.element('#unique-example input[type=string]').to.be.present

    browser.click('#unique-example input[type=string]') // https://github.com/nightwatchjs/nightwatch/issues/504
    browser.clearValue('#unique-example input[type=string]')
    browser.setValue('#unique-example input[type=string]', 'test')

    browser.keys(browser.Keys.TAB)
    browser.click('h5.card-header.text-center') // click outside of input
    browser.pause(1000)
    browser.expect.element('#unique-example input[type=string]').to.have.attribute('class').which.contains('vf-invalid-unique')
    browser.expect.element('.invalid-feedback').to.be.present
    browser.expect.element('.invalid-feedback').text.to.be.equal('Not a unique value')
    browser.end()
  }
}
