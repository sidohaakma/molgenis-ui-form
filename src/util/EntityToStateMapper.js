// @flow
import type { EntityFieldType, FormField, HtmlFieldType } from '../flow.types'

import evaluator from './helpers/evaluator'
// $FlowFixMe
import api from '@molgenis/molgenis-api-client'

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
 * Uses the idAttribute, labelAttribute, and hrefCollection parameters of the refEntity
 * to query a data table. Returns a list of {id, value, label} items as a Promise
 *
 * @param refEntity The refEntity of the attribute.
 * @return Promise
 */
const fetchFieldOptions = (refEntity) => {
  const idAttribute = refEntity.idAttribute
  const labelAttribute = refEntity.labelAttribute ? refEntity.labelAttribute : refEntity.idAttribute
  const uri = refEntity.hrefCollection

  return api.get(uri).then(response => {
    return response.items.map(item => {
      return {
        id: item[idAttribute],
        value: item[idAttribute],
        label: item[labelAttribute]
      }
    })
  })
}

/**
 * Build a function that returns an array containing options needed to render the input, input-group or select.
 *
 * Simple types like STRING or TEXT do not have input properties, in this case 'null' is returned
 * The returned function returns an array consisting of objects containing id, value, and label
 *
 * @example Example schema for generating field options
 * const schema = {
 *  fields: [
 *    {
 *      id: 'example',
 *      label: 'Example field',
 *      options: () => {
 *        return [
 *          {
 *            id: '1',
 *            value: '1',
 *            label: 'Example option 1'
 *          },
 *          {
 *            id: '2',
 *            value: '2',
 *            label: 'Example option 2'
 *          }
 *        ]
 *      }
 *    }
 *  ]
 * }
 *
 * @param attribute
 * @returns Function|null
 */
const getFieldOptions = (attribute) => {
  switch (attribute.fieldType) {
    case 'CATEGORICAL':
      return () => {
        return fetchFieldOptions(attribute.refEntity).then(response => {
          return response
        })
      }
    case 'CATEGORICAL_MREF':
      return () => {
        return fetchFieldOptions(attribute.refEntity).then(response => {
          return response
        })
      }
    case 'ENUM':
      const enumOptions = attribute.enumOptions.map(option => {
        return {
          id: option,
          value: option,
          label: option
        }
      })

      if (attribute.nillable) {
        enumOptions.push({id: 'null', value: 'null', label: 'N/A'})
      }

      return () => Promise.resolve(enumOptions)
    case 'BOOL':
      const boolOptions = attribute.nillable ? [
        {id: 'true', value: true, label: 'True'},
        {id: 'false', value: false, label: 'False'},
        {id: 'null', value: 'null', label: 'N/A'}
      ] : [
        {id: 'true', value: true, label: 'True'},
        {id: 'false', value: false, label: 'False'}
      ]
      return () => Promise.resolve(boolOptions)
    default:
      return null
  }
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
      return 'radio'
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
      return 'checkbox'
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
      return valid ? {valid: valid, message: null} : {valid: false, message: 'Invalid value!'}
    }
  ]

  // options is a function that always returns an array of option objects
  const options = getFieldOptions(attribute)
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

  return options ? {...fieldProperties, options} : fieldProperties
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
