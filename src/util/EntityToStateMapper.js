// @flow
import type { EntityFieldType, FieldOption, FormField, HtmlFieldType, RefEntityType } from '../flow.types'

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
 * @return {Promise} Promise object representing an Array of FieldOption
 */
const fetchFieldOptions = (refEntity: RefEntityType): Promise<Array<FieldOption>> => {
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
 * Build a function that returns a Promise of an array containing objects of type FieldOption
 *
 * Simple types like STRING or TEXT do not have input properties, in this case 'null' is returned
 * The returned function returns a Promise of an array consisting of type FieldOption
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
 * @returns {Function|null} Function which returns a Promise representing an Array of FieldOptions
 */
const getFieldOptions = (attribute): ?(() => Promise<Array<FieldOption>>) => {
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
        {id: 'true', value: 'true', label: 'True'},
        {id: 'false', value: 'false', label: 'False'},
        {id: 'null', value: 'null', label: 'N/A'}
      ] : [
        {id: 'true', value: 'true', label: 'True'},
        {id: 'false', value: 'false', label: 'False'}
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
 * @returns {String} HTML type e.g. text, number, select etc...
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
    case 'COMPOUND':
      return 'field-group'
    default:
      throw new MappingException(`unknown fieldType (${fieldType})`)
  }
}

/**
 * If there is a visible expression present, return a function which evaluates the expression.
 * If there is no expression present, return a function which evaluates to the value of attribute.visible
 *
 * @param attribute
 * @returns {Function} Function which evaluates to a boolean
 */
const isVisible = (attribute): (() => boolean) => {
  const expression = attribute.visibleExpression
  return expression ? (data) => evaluator(expression, data) : () => attribute.visible
}

/**
 * If there is a nullable expression present, return a function which evaluates said expression.
 * If there is no expression present, return a function which evaluates to the !value of attribute.nillable
 *
 * @param attribute
 * @returns {Function} Function which evaluates to a boolean
 */
const isRequired = (attribute): (() => boolean) => {
  const expression = attribute.nullableExpression
  return expression ? (data) => evaluator(expression, data) : () => !attribute.nillable
}

/**
 * If there is a validation expression present, return a function which evaluates said expression.
 * If there is no expression present, return a function which always evaluates to true
 *
 * @param attribute
 * @returns {Function} Function which evaluates to a boolean
 */
const isValid = (attribute): (() => boolean) => {
  const expression = attribute.validationExpression
  return expression ? (data) => evaluator(expression, data) : () => true
}

/**
 * Generate a schema field object suitable for the forms
 *
 * @param attribute Attribute metadata from an EntityType V2 response
 * @returns {{type: String, id, label, description, required: boolean, disabled, visible, options: ({uri, id, label, multiple}|{uri, id, label})}}
 */
const generateFormSchemaField = (attribute): FormField => {
  // options is a function that always returns an array of option objects
  const options = getFieldOptions(attribute)
  let fieldProperties = {
    type: getHtmlFieldType(attribute.fieldType),
    id: attribute.name,
    label: attribute.label,
    description: attribute.description,
    required: isRequired(attribute),
    disabled: attribute.readOnly,
    readOnly: attribute.readOnly,
    visible: isVisible(attribute),
    validate: isValid(attribute)
  }

  if (fieldProperties.type === 'field-group') {
    const children = attribute.attributes.map(attribute => generateFormSchemaField(attribute))
    fieldProperties = {...fieldProperties, children}
  }

  return options ? {...fieldProperties, options} : fieldProperties
}

/**
 * Generates a data object suitable for the forms
 * Recursively calls itself when a field of type "field-group" is present
 * "field-group" fields do not have data, only their children do
 *
 * @param fields an array of field objects
 * @param data a data object containing everything a EntityType V2 response has in its item list
 * @returns a {fieldId: value} object
 */
const generateFormData = (fields: any, data: any) => {
  return fields.reduce((accumulator, field) => {
    if (field.type === 'field-group') {
      return {...accumulator, ...generateFormData(field.children, data)}
    }
    accumulator[field.id] = data[field.id]
    return accumulator
  }, {})
}

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
