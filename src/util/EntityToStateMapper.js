// @flow
import type { EntityFieldType, HtmlFieldType, FormField } from '../flow.types'

import evaluator from './helpers/evaluator'

// Create an object type UserException
function MappingException (message: string) {
  this.message = message
  this.name = 'MappingException'
}

// Make the exception convert to a pretty string when used as a string
// (e.g. by the error console)
// Add flow flowfixme as a workaround for flow bug
// $FlowFixMe
MappingException.prototype.toString = function () {
  return this.name + ': "' + this.message + '"'
}

/**
 * Translate MOLGENIS attribute types to HTML field types
 *
 * @private
 * @param fieldType Attribute type e.g. STRING, XREF etc...
 * @returns String HTML type e.g. text, number, select etc...
 */
const getHtmlFieldType = (fieldType: EntityFieldType): HtmlFieldType => {
  switch (fieldType) {
    case 'BOOL':
    case 'CATEGORICAL':
    case 'ENUM':
      return 'radios'
    case 'XREF':
    case 'MREF':
    case 'ONETOMANY':
      return 'select'
    case 'INT':
    case 'DECIMAL':
    case 'LONG':
      return 'number'
    case 'TEXT':
    case 'SCRIPT':
    case 'HTML':
      return 'text-area'
    case 'DATE':
      return 'date'
    case 'DATE_TIME':
      return 'date-time'
    case 'CATEGORICAL_MREF':
      return 'checkboxes'
    case 'STRING':
      return 'text'
    case 'HYPERLINK':
      return 'url'
    case 'EMAIL':
      return 'email'
    case 'FILE':
      return 'file'
    default:
      throw new MappingException(`unknown fieldType (${fieldType})`)
  }
}

/**
 * Build object containing properties needed to render the input, input-group or select.
 * Simple types like STRING or TEXT do not have input properties, in this case 'null' is returned
 * Returned object contains a options array consisting of objects containing id, value, and label
 * For asynchronous option retrieval return an object containing URI, id, and label of the referencing table
 *
 * @param attribute
 * @returns Object|null
 */
const buildInputProperties = (attribute) => {
  switch (attribute.fieldType) {
    case 'XREF':
    case 'ONETOMANY':
      return {
        uri: attribute.refEntity.hrefCollection,
        multiple: false,
        id: attribute.refEntity.idAttribute,
        label: attribute.refEntity.labelAttribute,
        options: []
      }
    case 'MREF':
      return {
        uri: attribute.refEntity.hrefCollection,
        multiple: true,
        id: attribute.refEntity.idAttribute,
        label: attribute.refEntity.labelAttribute,
        options: []
      }
    case 'CATEGORICAL':
    case 'CATEGORICAL_MREF':
      return {
        options: [],
        uri: attribute.refEntity.hrefCollection
      }
    case 'ENUM':
      return {
        options: attribute.enumOptions.map(option => {
          return {
            id: option,
            value: option,
            label: option
          }
        })
      }
    case 'BOOL':
      return {
        options: attribute.nillable ? [
          {id: 'true', value: true, label: 'True'},
          {id: 'false', value: false, label: 'False'},
          {id: 'null', value: 'null', label: 'N/A'}
        ] : [
          {id: 'true', value: true, label: 'True'},
          {id: 'false', value: false, label: 'False'}
        ]
      }
    default:
      return null
  }
}

/**
 * If there is a visible expression present, return a function which evaluates the expression.
 * Else return the visible value from the attribute
 *
 * @param attribute
 * @returns {Function|boolean}
 */
const isVisible = (attribute) => {
  const expression = attribute.visibleExpression
  return expression ? (data) => evaluator(expression, data) : attribute.visible
}

/**
 * If there is a nullable expression present, return a function which evaluates said expression.
 * Else return the !nillable value from the attribute
 * @param attribute
 * @returns {Function|boolean}
 */
const isNillable = (attribute) => {
  const expression = attribute.nullableExpression
  return expression ? (data) => evaluator(expression, data) : !attribute.nillable
}

/**
 * Generate a schema field object suitable for the forms
 *
 * @param attribute Attribute metadata from an EntityType V2 response
 * @returns {{type: String, id, label, description, required: boolean, disabled, visible, options: ({uri, id, label, multiple}|{uri, id, label})}}
 */
const generateFormSchemaField = (attribute) => {
  const validators = [
    (data) => {
      const valid = data['string'] === 'valid'
      return valid ? {valid: valid, message: null} : { valid: false, message: 'Invalid value!' }
    }
  ]

  const inputProperties = buildInputProperties(attribute)
  const fieldProperties = {
    type: getHtmlFieldType(attribute.fieldType),
    id: attribute.name,
    label: attribute.label,
    description: attribute.description,
    required: isNillable(attribute),
    disabled: attribute.readOnly,
    readOnly: attribute.readOnly,
    visible: isVisible(attribute),
    validators: validators
  }

  return inputProperties ? { ...fieldProperties, inputProperties: inputProperties } : fieldProperties
}

/**
 * Generates a data object suitable for the forms
 *
 * @param fields an array of field objects
 * @param data a data object containing everything a EntityType V2 response has in its item list
 * @returns a {fieldId: value} object
 */
const generateFormData = (fields: any, data: any) => fields.reduce((accumulator, field) => {
  accumulator[field.id] = data[field.id]
  return accumulator
}, {})

/**
 * Generates an array for form fields
 *
 * @param schema an object containing the metadata from an EntityType V2 response
 * @returns a an array of Field objects
 */
const generateFormFields = (schema: any): Array<FormField> => schema.attributes.reduce((accumulator, attribute) => {
  accumulator.push(generateFormSchemaField(attribute))
  return accumulator
}, [])

export default {
  generateFormFields,
  generateFormData
}
