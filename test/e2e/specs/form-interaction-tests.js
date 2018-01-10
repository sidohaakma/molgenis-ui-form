// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
module.exports = {
  tags: ['interaction'],
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
  },

  'Click on submit and check if event is fired': function (browser) {
    browser.setValue('#string', 'test string')
    browser.click('#save-btn')
    browser.expect.element('#message-span').to.be.present
    browser.expect.element('#message-span').text.to.contain('onSubmit: {"string":"test string"}')
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
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"test string"}')

    browser.setValue('#integer', 1000)
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"test string","integer":"1000"}')

    browser.click('#boolean-0')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"test string","integer":"1000","boolean":"true"}')

    browser.click('#categorical-0')
    browser.expect.element('#message-span').to.be.visible
    browser.expect.element('#message-span').text.to.contain('onValueChanged: {"string":"test string","integer":"1000","boolean":"true","categorical":"ref1"}')
    browser.end()
  }
}
