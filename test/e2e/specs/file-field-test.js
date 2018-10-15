/* eslint-disable no-unused-expressions */
const path = require('path')

module.exports = {
  tags: ['file'], // run this suite with 'yarn e2e --tag file'
  beforeEach: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.url(browser.globals.devServerURL + '/file')
  },

  'File field should show the file name': function (browser) {
    browser.options.desiredCapabilities.name = 'File field should show the file name'
    browser.expect.element('#file-example-fs > div > div > div.custom-file > input').to.be.present
    // bootstrap uses label to fake file input value
    browser.expect.element('#file-example-fs > div > div > div.custom-file > label').text.to.contain('test-file-name.txt')
    browser.end()
  },

  'File field allow selecting a file': function (browser) {
    // Skip set file test for safari as safari does not allow to post a file
    if (browser.options.desiredCapabilities.browserName !== 'safari') {
      browser.options.desiredCapabilities.name = 'File field allow selecting a file'
      browser.expect.element('#file-example-fs > div > div > div.custom-file > input').to.be.present
      // bootstrap uses label to fake file input value
      browser.uploadFile(path.resolve(path.join(__dirname, 'file-field-test.js')), '#file-example-fs > div > div > div.custom-file > input')
      browser.expect.element('#file-example-fs > div').to.have.attribute('class').which.contains('vf-field-dirty vf-field-valid vf-field-touched')
      browser.end()
    }
  }

}
