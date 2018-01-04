// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {

  'input-fields test': function(browser) {
    browser
      .url(browser.globals.devServerURL)
      .waitForElementVisible('#form-demo', 5000)
      .assert.elementPresent('form')
      .assert.elementCount('input', 32)
      .end()
  },
  'on-submit-hook test': function (browser) {
    testSave(browser, 'input[id=string]', 'test sido', '{ "string": "test sido" }')
    testSave(browser, 'input[id=categorical-0]', 'na', '{ "categorical": "ref1" }')
    testSave(browser, 'input[id=categorical_mref-0]', 'na', '{ "categorical_mref": [ "ref1" ] }')
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
    testValueChanged(browser, 'input[id=string]', 'test sido', 'This value is changed: [{"string":"test sido"}]')
    testValueChanged(browser, 'input[id=categorical-0]', 'na', 'This value is changed: [{"categorical":"ref1"}')
    testValueChanged(browser, 'input[id=categorical_mref-0]', 'na', '{"categorical_mref":["ref1"]}')
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
