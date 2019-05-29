import type { MapperSettings } from '../../flow.types'
import evaluator from './evaluator'

/**
 * If there is a visible expression present, return a function which evaluates the expression.
 * If there is no expression present, check if mapper is run with showVisibleAttribute option set to true,
 * if this is not the case attributes visible property is used
 *
 * @param attribute
 * @param mapperOptions
 * @returns {Function} Function which evaluates to a boolean
 */
const isVisible = (attribute, mapperOptions: MapperSettings): ((?Object) => boolean) => {
  const expression = attribute.visibleExpression

  if (expression) {
    return (data) => {
      try {
        return evaluator(expression, data)
      } catch (e) {
        evaluationLogging('Error evaluating visible expression', attribute.name, expression, e)
        return mapperOptions.showNonVisibleAttributes || attribute.visible
      }
    }
  }
  return () => mapperOptions.showNonVisibleAttributes || attribute.visible
}

/**
 * If there is a nullable expression present, return a function which evaluates said expression.
 * If there is no expression present, return a function which evaluates to the !value of attribute.nillable
 *
 * @param attribute
 * @returns {Function} Function which evaluates to a boolean
 */
const isRequired = (attribute): ((?Object) => boolean) => {
  const expression = attribute.nullableExpression

  // If an attribute is nullable, it is NOT required
  if (expression) {
    return (data) => {
      try {
        return !evaluator(expression, data)
      } catch (e) {
        evaluationLogging('Error evaluating required expression', attribute.name, expression, e)
        return !attribute.nillable
      }
    }
  }
  return () => !attribute.nillable
}

/**
 * If there is a validation expression present, return a function which evaluates said expression.
 * If there is no expression present, return a function which always evaluates to true
 *
 * @param attribute
 * @returns {Function} Function which evaluates to a boolean
 */
const isValid = (attribute): ((?Object) => boolean) => {
  const expression = attribute.validationExpression

  if (expression) {
    return (data) => {
      try {
        return evaluator(expression, data)
      } catch (e) {
        evaluationLogging('Error evaluating valid expression', attribute.name, expression, e)
        return true
      }
    }
  }
  return () => true
}

/**
 * Helper function for logging data to the console on evaluation error
 *
 * @param message
 * @param field
 * @param expression
 * @param e
 * @returns {*}
 */
const evaluationLogging = (message: string, field: string, expression: string, e: Error) => {
  if (console && console.warn) {
    const warningMessage = `${message} (field: ${field})
    ${expression}
    ${e.toString()}`

    console.warn(warningMessage)
  }
}

export { isValid, isRequired, isVisible }
