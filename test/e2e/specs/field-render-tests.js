/* eslint-disable no-unused-expressions */
module.exports = {
  tags: ['fields'], // run this suite with 'yarn e2e --tag <tag>'

  before: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
  },

  after: function (browser) {
    // Close the browser after the suite is done
    browser.end()
  },

  // Use BDD-style interface for assertions
  // http://nightwatchjs.org/api#expect-api
  'Correctly render a field-group and its child fields': function (browser) {
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

    browser.expect.element('#compound-string-fs').to.be.not.visible
    browser.expect.element('#compound-string-fs').to.be.a('fieldset')
    browser.expect.element('#compound-string-fs input').to.have.attribute('id').which.contains('compound-string')
    browser.expect.element('#compound-string-fs input').to.have.attribute('type').which.contains('text')
  },

  'Correctly render a single select field with a list of options': function (browser) {
    browser.expect.element('#xref-field-fs').to.be.visible
    browser.expect.element('#xref-field-fs').to.be.a('fieldset')

    browser.expect.element('#xref-field-fs select').to.be.visible
    browser.expect.element('#xref-field-fs select > option').to.be.present
  },

  'Toggle visibility of string field': function (browser) {
    browser.expect.element('#nested-compound-string-fs').to.be.present
    browser.expect.element('#nested-compound-string-fs').to.be.visible
    browser.expect.element('#nested-compound-string-fs').to.be.a('fieldset')
    browser.setValue('#nested-compound-string', 'show')
    browser.expect.element('#compound-string-fs').to.be.visible
  },

  'Fill out date field using picker': function (browser) {
    browser.expect.element('#date').to.be.visible
    browser.click('#date')
    browser.expect.element('.flatpickr-calendar').to.be.visible
    browser.click('.today')
    browser.expect.element('.flatpickr-calendar').to.be.not.visible
    const today = new Date().toJSON().slice(0, 10)
    browser.assert.value('#date', today)
  },

  'Clear out a nillable datefield using the clear btn': function (browser) {
    const clearBtnSelector = '#nillable_date-fs > div > div > div.input-group > div > button.date-field-clear-btn.btn.btn-outline-secondary'
    browser.clearValue('#nillable_date')
    const today = new Date().toJSON().slice(0, 10)
    browser.setValue('#nillable_date', today)
    browser.assert.visible(clearBtnSelector)
    browser.click(clearBtnSelector)
    browser.assert.value('#nillable_date', '')
  }
}
