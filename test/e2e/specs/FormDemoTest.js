// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {

  'input-fields test': function(browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#form-demo', 5000)
      .assert.elementPresent('form')
      .assert.elementCount('input', 7)
      .end()
  },
  'on-submit-hook test': function (browser) {
    testSave(browser, 'input[id=text-field]', 'test sido', '{ "text-field": "test sido" }')
    testSave(browser, 'input[id=radio-field-0]', '1', '{ "radio-field": "1" }')
    testSave(browser, 'input[id=checkbox-field-0]', '1', '{ "checkbox-field": [ "1" ] }')
  },
  'on-cancel-hook test': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('button[type=reset]', 1000)
      .click('button[type=reset]')
      .waitForElementVisible('#message-span', 1000)
      .assert.containsText('#message-span', "Cancel is clicked")
  },
  'on-value-changed-hook test': function (browser) {
    testValueChanged(browser, 'input[id=text-field]', 'test sido', 'This value is changed: [{"text-field":"test sido"}]')
    testValueChanged(browser, 'input[id=radio-field-0]', '1', 'This value is changed: [{"radio-field":"1"}')
    testValueChanged(browser, 'input[id=checkbox-field-0]', '1', '{"checkbox-field":["1"]}')
  }
}

function testSave (browser, selector, testInput, expectedMessage) {
  browser
    .url(browser.globals.devServerURL)
    .waitForElementVisible(selector, 1000)
    .click(selector)
    .setValue(selector, testInput)
    .click('button[type=submit]')
    .waitForElementVisible('#message-span', 1000)
    .assert.containsText('#message-span', expectedMessage)
}

function testValueChanged (browser, selector, testInput, expectedMessage) {
  browser
    .url(browser.globals.devServerURL)
    .waitForElementVisible(selector, 1000)
    .click(selector)
    .setValue(selector, testInput)
    .waitForElementVisible('#message-span', 1000)
    .assert.containsText('#message-span', expectedMessage)
}
