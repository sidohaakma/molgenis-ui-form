/* eslint-disable no-unused-expressions */
module.exports = {
  tags: ['form-fields', 'form', 'fields'], // run this suite with 'yarn e2e --tag <tag>'
  after: function (browser) {
    // Close the browser after the suite is done
    browser.end()
  },

  // Use BDD-style interface for assertions
  // http://nightwatchjs.org/api#expect-api
  'Correctly render a field-group and its child fields': function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.expect.element('#form-demo').to.be.present

    // Assert field groups and child elements are rendered correctly
    browser.expect.element('#compound-field-fs').to.be.visible
    browser.expect.element('#compound-field-fs').to.be.a('fieldset')
    browser.expect.element('#compound-field-fs legend').text.to.contain('Compound field')
    browser.expect.element('#compound-field-fs small').text.to.contain('Compound description')
    browser.expect.element('#compound-field-fs hr').to.be.visible
    browser.expect.element('#compound-field-fs div').to.have.attribute('class').which.contains('pl-2')

    browser.expect.element('#compound-int-fs').to.be.visible
    browser.expect.element('#compound-int-fs').to.be.a('fieldset')
    browser.expect.element('#compound-int-fs input').to.have.attribute('id').which.contains('compound-int')
    browser.expect.element('#compound-int-fs input').to.have.attribute('type').which.contains('number')

    browser.expect.element('#nested-compound-field-fs').to.be.visible
    browser.expect.element('#nested-compound-field-fs').to.be.a('fieldset')
    browser.expect.element('#nested-compound-field-fs legend').text.to.contain('Nested Compound field')
    browser.expect.element('#nested-compound-field-fs small').text.to.contain('Nested Compound description')
    browser.expect.element('#nested-compound-field-fs hr').to.be.visible
    browser.expect.element('#nested-compound-field-fs div').to.have.attribute('class').which.contains('pl-4')

    browser.expect.element('#nested-compound-enum-fs').to.be.visible
    browser.expect.element('#nested-compound-enum-fs').to.be.a('fieldset')
    browser.expect.element('#nested-compound-enum-fs input[id=nested-compound-enum-0]').to.be.visible
    browser.expect.element('#nested-compound-enum-fs input[id=nested-compound-enum-0]').to.have.attribute('type').which.contains('radio')

    browser.expect.element('#nested-compound-string-fs').to.be.visible
    browser.expect.element('#nested-compound-string-fs').to.be.a('fieldset')
    browser.expect.element('#nested-compound-string-fs input').to.have.attribute('id').which.contains('nested-compound-string')
    browser.expect.element('#nested-compound-string-fs input').to.have.attribute('type').which.contains('text')

    browser.expect.element('#compound-string-fs').to.be.visible
    browser.expect.element('#compound-string-fs').to.be.a('fieldset')
    browser.expect.element('#compound-string-fs input').to.have.attribute('id').which.contains('compound-string')
    browser.expect.element('#compound-string-fs input').to.have.attribute('type').which.contains('text')
  },

  'Correctly render a multi select field with a list of options': function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.expect.element('#mref-field-fs').to.be.visible
    browser.expect.element('#mref-field-fs').to.be.a('fieldset')

    browser.expect.element('#mref-field-fs select').to.be.visible
    browser.expect.element('#mref-field-fs select > option').to.be.present

    browser.expect.element('#mref-field').to.have.attribute('multiple').which.contains(true)
  }
}
