import evaluator from '@/util/helpers/evaluator'

describe('evaluator', () => {
  it('should evaluate simple string comparison', () => {
    const expression = '$(\'myProp\').value() === "test"'

    const entity = { myProp: 'test' }
    expect(evaluator(expression, entity)).to.equal(true)

    const entity2 = { myProp: 'not test' }
    expect(evaluator(expression, entity2)).to.equal(false)
  })

  it('should be able to check if value is valid json', () => {
    const expression = '$(\'myProp\').isValidJson().value()'
    const entity = { myProp: '{"foo": 5}' }
    const result = evaluator(expression, entity)
    expect(result).to.equal(true)

    const entity2 = { myProp: '{"foo: 5}' }
    const result2 = evaluator(expression, entity2)
    expect(result2).to.equal(false)
  })

  it('should be able add values together', () => {
    const expression = '$(\'myProp\').plus(3).value()'
    const entity = { myProp: 2 }
    const result = evaluator(expression, entity)
    expect(result).to.equal(5)

    const expression2 = '$(\'myProp1\').plus($(\'myProp2\')).value()'
    const entity2 = { myProp1: 2, myProp2: 1 }
    const result2 = evaluator(expression2, entity2)
    expect(result2).to.equal(3)
  })

  it('should be able raise a value to the given power', () => {
    const expression = '$(\'myProp\').pow(3).value()'
    const entity = { myProp: 3 }
    const result = evaluator(expression, entity)
    expect(result).to.equal(27)
  })

  it('should be able multiply two values', () => {
    const expression = '$(\'myProp\').times(3).value()'
    const entity = { myProp: 2 }
    const result = evaluator(expression, entity)
    expect(result).to.equal(6)

    const expression2 = '$(\'myProp1\').times($(\'myProp2\')).value()'
    const entity2 = { myProp1: 2, myProp2: 4 }
    const result2 = evaluator(expression2, entity2)
    expect(result2).to.equal(8)
  })

  it('should be able divide two values', () => {
    const expression = '$(\'myProp\').div(2).value()'
    const entity = { myProp: 1 }
    const result = evaluator(expression, entity)
    expect(result).to.equal(0.5)

    const expression2 = '$(\'myProp1\').div($(\'myProp2\')).value()'
    const entity2 = { myProp1: 8, myProp2: 2 }
    const result2 = evaluator(expression2, entity2)
    expect(result2).to.equal(4)
  })

  it('should determine the age in years given a date of birth, use local date as now reference', () => {
    const expression = '$(\'myProp\').age().value()'
    const entity = { myProp: null }
    const result = evaluator(expression, entity)
    expect(result).to.equal(undefined)

    const expression2 = '$(\'myProp1\').age().value()'
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    const testDate = new Date(year - 4, month, day)
    const entity2 = { myProp1: testDate }
    const result2 = evaluator(expression2, entity2)
    expect(result2).to.equal(4)
  })
})
