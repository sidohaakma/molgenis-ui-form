/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['interaction'],
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
  },

  'Click on submit and check if event is fired': function (browser) {
    browser.click('#save-btn')
    browser.expect.element('#message-span').to.be.present
    browser.expect.element('#message-span').text.to.contain('onSubmit: {"string":"string value","text":"text value","hyperlink":"www.nu.nl","enum":"enum2","categorical_mref":["ref1","ref2"]}')

    browser.end()
  },

  'Click on cancel and check if event is fired': function (browser) {
    browser.click('#cancel-btn')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onCancel')

    browser.end()
  },

  'Change value in field and check if event is fired': function (browser) {
    browser.setValue('#string', 'test string')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"string valuetest string","text":"text value","hyperlink":"www.nu.nl","enum":"enum2","categorical_mref":["ref1","ref2"]}')

    browser.setValue('#integer', 1000)
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"string valuetest string","text":"text value","integer":"1000","hyperlink":"www.nu.nl","enum":"enum2","categorical_mref":["ref1","ref2"]}')

    browser.click('#boolean-0')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"string valuetest string","text":"text value","boolean":"true","integer":"1000","hyperlink":"www.nu.nl","enum":"enum2","categorical_mref":["ref1","ref2"]}')

    browser.click('#categorical-0')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"string valuetest string","text":"text value","boolean":"true","integer":"1000","hyperlink":"www.nu.nl","enum":"enum2","categorical":"ref1","categorical_mref":["ref1","ref2"]}')

    browser.end()
  },

  'Change value for fields inside field-groups and check if event is fired': function (browser) {
    browser.setValue('#nested-compound-string', 'test string')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"string value","text":"text value","hyperlink":"www.nu.nl","enum":"enum2","categorical_mref":["ref1","ref2"],"nested-compound-string":"test string"}')

    browser.end()
  },

  'Toggle show optional fields': function (browser) {
    browser.click('#toggle-btn')
    browser.expect.element('#string').to.be.not.visible
    browser.expect.element('#show-fields-icon').to.be.visible
    browser.expect.element('#show-fields-icon').to.have.attribute('class').which.contains('fa-eye')
    browser.click('#toggle-btn')
    browser.expect.element('#string').to.be.visible
    browser.expect.element('#show-fields-icon').to.have.attribute('class').which.contains('fa-eye-slash')
    browser.end()
  },

  'Check if asterisk class is present on integer element': function (browser) {
    browser.expect.element('#integer-fs').to.have.attribute('class').which.contains('required-field')
    browser.end()
  }
}
