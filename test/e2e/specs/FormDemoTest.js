// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {

  'are the field-types rendered on screen': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#form-demo', 5000)
      .assert.elementPresent('form')
      .assert.elementCount('input', 31)
      .end()
  },
  'click on submit and check if event is fired': function (browser) {
    testSubmit(browser, 'input[id=string]', 'test string', '{ "string": "test string" }')
    testSubmit(browser, 'textarea[id=text]', 'test text', '{ "text": "test text" }')
    testSubmit(browser, 'input[id=integer]', '1', '{ "integer": "1" }')
    testSubmit(browser, 'input[id=decimal]', '1.1', '{ "decimal": "1.1" }')
    testSubmit(browser, 'input[id=long]', '1000', '{ "long": "1000" }')
    testSubmit(browser, 'input[id=boolean-0]', 'true', '{ "boolean": "true" }')
    testSubmit(browser, 'input[id=categorical-0]', 'na', '{ "categorical": "ref1" }')
    testSubmit(browser, 'input[id=categorical_mref-0]', 'na', '{ "categorical_mref": [ "ref1" ] }')
  },
  'click on cancel and check if event is fired': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('button[type=reset]', 1000)
      .click('button[type=reset]')
      .waitForElementVisible('#message-span', 1000)
      .assert.containsText('#message-span', 'Cancel is clicked')
  },
  'change value in field and check if event is fired': function (browser) {
    testValueChanged(browser, 'input[id=string]', 'test string', 'This value is changed: [{"string":"test string"}]')
    testValueChanged(browser, 'textarea[id=text]', 'test text', 'This value is changed: [{"text":"test text"}]')
    testValueChanged(browser, 'input[id=integer]', '1', 'This value is changed: [{"integer":"1"}')
    testValueChanged(browser, 'input[id=decimal]', '1.1', '[{"decimal":"1.1"}]')
    testValueChanged(browser, 'input[id=boolean-0]', 'true', '[{"boolean":"true"}]')
    testValueChanged(browser, 'input[id=long]', '1000', 'This value is changed: [{"long":"1000"}]')
    testValueChanged(browser, 'input[id=categorical-0]', 'na', 'This value is changed: [{"categorical":"ref1"}')
    testValueChanged(browser, 'input[id=categorical_mref-0]', 'na', 'This value is changed: [{"categorical_mref":["ref1"]}]')
  },
  'field is not shown when toggle visible to false in schema': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementPresent('input[id=id]', 5000)
      .waitForElementNotVisible('input[id=id]', 1000)
      .end()
  }
}

function testSubmit (browser, selector, testInput, expectedMessage) {
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
