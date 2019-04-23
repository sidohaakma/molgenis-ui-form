/* eslint-disable no-unused-expressions */

module.exports = {
  tags: ['max-length'], // run this suite with 'yarn e2e --tag max-length'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/max-length')
  },
  'Fields with too many characters should be invalid': function (browser) {
    browser.options.desiredCapabilities.name = 'Fields with too many characters should be invalid'
    browser.expect.element('#validate-btn').to.be.present
    browser.click('#validate-btn')
    browser.expect.element('#max-length-example').to.have.attribute('class').which.contains('vf-form-invalid')
    browser.expect.element('#max-length-string-example').to.have.attribute('class').which.contains('vf-invalid')
    browser.expect.element('#max-length-text-example').to.have.attribute('class').which.contains('vf-invalid')
    browser.expect.element('#max-length-url-example').to.have.attribute('class').which.contains('vf-invalid')
    browser.expect.element('#max-length-email-example').to.have.attribute('class').which.contains('vf-invalid')
    browser.end()
  },
  'String with not too many values should be valid': function (browser) {
    const stringValue = 'This is not too long!'
    browser.options.desiredCapabilities.name = 'String with not too many values should be valid'
    browser.expect.element('#validate-btn').to.be.present
    browser.click('#max-length-example input[type=text]')
    // Workaround since clearValue is not working
    browser.execute(function () {
      document.getElementById('max-length-string-example').value = ''
    })
    browser.setValue('#max-length-example input[type=text]', stringValue)
    browser.expect.element('#max-length-string-example').to.have.value.that.equals(stringValue)
    browser.click('#validate-btn')
    browser.expect.element('#max-length-string-example').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  },
  'Text with not too many values should be valid': function (browser) {
    const textValue = 'This is not too long, although it is over 255 characters, so it is bigger than a string, which is totally valid for a text field. That means this field is expected to be valid. So let\'s test that! Please be valid, sweet, sweet text field. I know you can do it!'
    browser.options.desiredCapabilities.name = 'Text with not too many values should be valid'
    browser.expect.element('#validate-btn').to.be.present
    browser.click('#max-length-text-example')
    // Workaround since clearValue is not working
    browser.execute(function () {
      document.getElementById('max-length-text-example').value = ''
    })
    browser.setValue('#max-length-text-example', textValue)
    browser.expect.element('#max-length-text-example').to.have.value.that.equals(textValue)
    browser.click('#validate-btn')
    browser.expect.element('#max-length-text-example').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  },
  'URL with not too many values should be valid': function (browser) {
    const urlValue = 'https://not-too-long.com'
    browser.options.desiredCapabilities.name = 'URL with not too many values should be valid'
    browser.expect.element('#validate-btn').to.be.present
    browser.click('#max-length-url-example')
    // Workaround since clearValue is not working
    browser.execute(function () {
      document.getElementById('max-length-url-example').value = ''
    })
    browser.setValue('#max-length-url-example', urlValue)
    browser.expect.element('#max-length-url-example').to.have.value.that.equals(urlValue)
    browser.click('#validate-btn')
    browser.expect.element('#max-length-url-example').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  },
  'Email with not too many values should be valid': function (browser) {
    const urlValue = 'someone@someprovider.org'
    browser.options.desiredCapabilities.name = 'Email with not too many values should be valid'
    browser.expect.element('#validate-btn').to.be.present
    browser.click('#max-length-email-example')
    // Workaround since clearValue is not working
    browser.execute(function () {
      document.getElementById('max-length-email-example').value = ''
    })
    browser.setValue('#max-length-email-example', urlValue)
    browser.expect.element('#max-length-email-example').to.have.value.that.equals(urlValue)
    browser.click('#validate-btn')
    browser.expect.element('#max-length-email-example').to.have.attribute('class').which.contains('vf-valid')
    browser.end()
  }

}
