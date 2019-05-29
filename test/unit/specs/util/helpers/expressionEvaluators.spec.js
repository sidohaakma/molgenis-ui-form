import { isValid, isRequired, isVisible } from '@/util/helpers/expressionEvaluators'

describe('expressionEvaluators', () => {
  const attribute = {
    name: 'name',
    visible: true,
    nillable: true,
    validationExpression: '$(\'name\').value() !== "not valid"',
    visibleExpression: '$(\'name\').value() === ""',
    nullableExpression: '$(\'name\').value() !== "not valid"'
  }
  const mapperOptions = {
    showNonVisibleAttributes: false
  }

  describe('isValid', () => {
    it('validates correctly via expression', () => {
      expect(isValid(attribute)({ 'name': '' })).to.equal(true)
      expect(isValid(attribute)({ 'name': 'not valid' })).to.equal(false)
    })
    it('Falls back to the true on script error', () => {
      attribute.validationExpression = '% // Note: forced error'
      expect(isValid(attribute)({ 'name': '' })).to.equal(true)
    })
  })

  describe('isVisible', () => {
    it('validates correctly via expression', () => {
      expect(isVisible(attribute, mapperOptions)({ 'name': '' })).to.equal(true)
      expect(isVisible(attribute, mapperOptions)({ 'name': 'something' })).to.equal(false)
    })
    it('Falls back to the default "visible" value on script error', () => {
      attribute.visibleExpression = '% // Note: forced SyntaxError'
      expect(isVisible(attribute, mapperOptions)({ 'name': 'name' })).to.equal(true)
      attribute.visible = false
      expect(isVisible(attribute, mapperOptions)({ 'name': 'name' })).to.equal(false)
    })
  })

  describe('isRequired', () => {
    it('validates correctly via expression', () => {
      expect(isRequired(attribute, mapperOptions)({ 'name': '' })).to.equal(false)
      expect(isRequired(attribute, mapperOptions)({ 'name': 'not valid' })).to.equal(true)
    })
    it('Falls back to the default "nillable" value on script error', () => {
      attribute.nullableExpression = '% // Note: forced SyntaxError'
      expect(isRequired(attribute)({ 'name': 'name' })).to.equal(false)
      attribute.nillable = false
      expect(isRequired(attribute)({ 'name': 'name' })).to.equal(true)
    })
  })
})
