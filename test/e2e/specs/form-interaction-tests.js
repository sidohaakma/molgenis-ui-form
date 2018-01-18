/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['interaction'],
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
  },

  'Click on submit and check if event is fired': function (browser) {
    browser.options.desiredCapabilities.name = 'Click on submit and check if event is fired'
    browser.click('#save-btn')
    browser.expect.element('#message-span').to.be.present
    browser.expect.element('#message-span').text.to.contain('onSubmit: {"string":"string value","text":"text value","hyperlink":"www.nu.nl","enum":"enum2","date":"","nillable_date":"","categorical_mref":["ref1","ref2"]}')

    browser.end()
  },

  'Click on cancel and check if event is fired': function (browser) {
    browser.options.desiredCapabilities.name = 'Click on cancel and check if event is fired'
    browser.click('#cancel-btn')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onCancel')

    browser.end()
  },

  'Change value in field and check if event is fired': function (browser) {
    browser.options.desiredCapabilities.name = 'Change value in field and check if event is fired'
    browser.setValue('#string', 'test string')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('"string":"string valuetest string"')

    browser.setValue('#integer', 1000)
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('"integer":"1000"')

    browser.click('#boolean-0')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('"boolean":"true"')

    browser.click('#categorical-0')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('"categorical":"ref1","categorical_mref":["ref1","ref2"]')

    browser.end()
  },

  'Change value for fields inside field-groups and check if event is fired': function (browser) {
    browser.options.desiredCapabilities.name = 'Change value for fields inside field-groups and check if event is fired'
    browser.setValue('#nested-compound-string', 'test string')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('"nested-compound-string":"test string"')

    browser.end()
  },

  'Toggle show optional fields': function (browser) {
    browser.options.desiredCapabilities.name = 'Toggle show optional fields'
    browser.click('button.toggle-btn')
    browser.expect.element('#string').to.be.not.visible
    browser.expect.element('i.show-fields-icon').to.be.visible
    browser.expect.element('i.show-fields-icon').to.have.attribute('class').which.contains('fa-eye')
    browser.click('button.toggle-btn')
    browser.expect.element('#string').to.be.visible
    browser.expect.element('i.show-fields-icon').to.have.attribute('class').which.contains('fa-eye-slash')
    browser.end()
  },

  'Check if asterisk class is present on integer element': function (browser) {
    browser.expect.element('#integer-fs').to.have.attribute('class').which.contains('required-field')
    browser.end()
  },

  'Check if asterisk class is not present on non required element': function (browser) {
    browser.options.desiredCapabilities.name = 'Check if asterix class is present on integer element'
    browser.expect.element('#string-fs').to.not.have.attribute('class').which.contains('required-field')
    browser.end()
  },

  'Check if required state works when dependant on another field': function (browser) {
    browser.setValue('#nested-compound-string', 'show')
    browser.expect.element('#compound-string-fs').to.be.visible
    browser.expect.element('#compound-string-fs').to.not.have.attribute('class').which.contains('required-field')

    browser.setValue('#compound-int', 1)
    browser.expect.element('#compound-string-fs').to.have.attribute('class').which.contains('required-field')
    browser.end()
  },

  'Check if visible state works when dependant on another field': function (browser) {
    browser.setValue('#nested-compound-string', 'show')
    browser.expect.element('#compound-string-fs').to.be.visible
    browser.end()
  },

  'Check if in-validation works when dependant on input data': function (browser) {
    browser.setValue('#nested-compound-string', 'show')
    browser.expect.element('#compound-string-fs').to.be.visible

    browser.setValue('input#compound-string', 'not valid')
    browser.click('#compound-int') // trigger validation via onBlur()
    browser.expect.element('#compound-string').to.have.attribute('class').which.contains('is-invalid')
    browser.end()
  },

  'Check if validation works when dependant on input data': function (browser) {
    browser.setValue('#nested-compound-string', 'show')
    browser.expect.element('#compound-string-fs').to.be.visible

    browser.setValue('input#compound-string', 'valid')
    browser.click('#compound-int') // trigger validation via onBlur()
    browser.expect.element('#compound-string').to.not.have.attribute('class').which.contains('is-invalid')
    browser.end()
  }
}
