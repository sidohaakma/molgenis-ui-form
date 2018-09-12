/* eslint-disable no-unused-expressions */
module.exports = {
  tags: ['fields'], // run this suite with 'yarn e2e --tag <tag>'

  before: function (browser) {
    // Wait for form to be loaded
    browser.url(browser.globals.devServerURL)
    browser.pause(browser.globals.waitBeforeTestStart)
  },

  after: function (browser) {
    // Close the browser after the suite is done
    browser.end()
  },

  // Use BDD-style interface for assertions
  // http://nightwatchjs.org/api#expect-api
  'Correctly render a field-group and its child fields': function (browser) {
    browser.options.desiredCapabilities.name = 'Correctly render a field-group and its child fields'

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

  'Correctly render a multi select field with a list of options': function (browser) {
    browser.options.desiredCapabilities.name = 'Correctly render a multi select field with a list of options'

    browser.expect.element('#mref-fs').to.be.visible
    browser.expect.element('#mref-fs').to.be.a('fieldset')

    browser.expect.element('#mref-fs input').to.be.visible

    browser.click('input#mref')
    browser.expect.element('#mref-fs ul').to.be.present
    browser.expect.element('#mref-fs li').to.be.present
  },

  'Correctly render a single select field with a list of options': function (browser) {
    browser.options.desiredCapabilities.name = 'Correctly render a single select field with a list of options'

    browser.expect.element('#xref-fs').to.be.visible
    browser.expect.element('#xref-fs').to.be.a('fieldset')

    browser.expect.element('#xref-fs input').to.be.visible

    browser.click('input#xref')
    browser.expect.element('#xref-fs ul').to.be.present
    browser.expect.element('#xref-fs li').to.be.present
  },

  'Toggle visibility of string field': function (browser) {
    browser.options.desiredCapabilities.name = 'Toggle visibility of string field'

    browser.expect.element('#nested-compound-string-fs').to.be.present
    browser.expect.element('#nested-compound-string-fs').to.be.visible
    browser.expect.element('#nested-compound-string-fs').to.be.a('fieldset')

    browser.setValue('#nested-compound-string', 'show')
    browser.expect.element('#compound-string-fs').to.be.visible
  },

  'Fill out date field using picker': function (browser) {
    browser.options.desiredCapabilities.name = 'Fill out date field using picker'

    browser.expect.element('#date').to.be.visible

    browser.click('#date')
    browser.expect.element('.flatpickr-calendar').to.be.visible

    browser.click('.today')
    browser.click('#form-demo') // click outside calender (work around for IE11 issue: https://github.com/chmln/flatpickr/issues/900)
    browser.expect.element('.flatpickr-calendar').to.be.not.visible

    const today = new Date().toJSON().slice(0, 10)
    browser.expect.element('#date').to.have.value.that.equals(today)
  },

  'Clear out a nillable datefield using the clear btn': function (browser) {
    browser.options.desiredCapabilities.name = 'Clear out a nillable datefield using the clear btn'

    const clearBtnSelector = '#nillable_date-fs > div > div > div.input-group > div > button.date-field-clear-btn.btn.btn-outline-secondary'
    browser.clearValue('#nillable_date')

    const today = new Date().toJSON().slice(0, 10)
    browser.setValue('#nillable_date', today)
    browser.expect.element(clearBtnSelector).to.be.visible

    browser.click(clearBtnSelector)
    browser.expect.element('#nillable_date').to.have.value.that.equals('')
  },

  'Fill out date time field using picker': function (browser) {
    browser.options.desiredCapabilities.name = 'Fill out date time field using picker'

    browser.expect.element('#date_time').to.be.visible

    browser.click('#date_time')
    browser.expect.element('body > div.flatpickr-calendar.hasTime.animate.open').to.be.visible

    browser.click('body > div.flatpickr-calendar.hasTime.animate.open > div.flatpickr-innerContainer > div > div.flatpickr-days > div > span.flatpickr-day.today')
    browser.expect.element('.flatpickr-hour').to.be.visible.before(1000) // sometimes visible, sometimes not...
    browser.expect.element('.flatpickr-minute').to.be.visible
    browser.expect.element('.flatpickr-am-pm').to.be.visible

    browser.click('#form-demo') // click outside calender (work around for IE11 issue: https://github.com/chmln/flatpickr/issues/900)
    browser.expect.element('.flatpickr-calendar').to.be.not.visible

    const today = new Date().toJSON().slice(0, 10)
    browser.expect.element('#date_time').to.have.value.which.contains(today)
  },

  'Add new option to muli select': function (browser) {
    browser.options.desiredCapabilities.name = 'Add new option to muli select'
    const btnSelector = '#mref-fs > div > div > div.input-group > div.input-group-append > button'
    browser.expect.element(btnSelector).to.be.visible
    browser.click(btnSelector)
    const newOption = '#mref-fs .selected-tag'
    browser.expect.element(newOption).to.be.visible
  }
}
