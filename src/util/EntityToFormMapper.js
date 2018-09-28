// @flow
import type {
  EntityFieldType,
  FieldOption,
  FormField,
  HtmlFieldType,
  RefEntityType,
  MapperOptions,
  MapperSettings
} from '../flow.types'

import evaluator from './helpers/evaluator'
// $FlowFixMe
import api from '@molgenis/molgenis-api-client'
// $FlowFixMe
import { encodeRsqlValue, transformToRSQL } from '@molgenis/rsql'

const DEFAULTS = {
  mapperMode: 'UPDATE',
  booleanLabels: {
    trueLabel: 'True',
    falseLabel: 'False',
    nillLabel: 'N/A'
  },
  showNillableBooleanOption: true,
  showNonVisibleAttributes: false
}

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
 * @param search An optional search query used to filter the items of the response
 * @return {Promise} Promise object representing an Array of FieldOption
 */
const fetchFieldOptions = (refEntity: RefEntityType, search: ?string | ?Array<string>): Promise<Array<FieldOption>> => {
  const idAttribute = refEntity.idAttribute
  const labelAttribute = refEntity.labelAttribute ? refEntity.labelAttribute : refEntity.idAttribute

  // map refEntity.hrefCollection v1 URLs to v2 to enable the use of RSQL queries
  let uri = refEntity.hrefCollection.replace('/v1/', '/v2/')

  if (search) {
    if (Array.isArray(search)) {
      // Join array into a string
      const value = search.join(',')
      // Use =in= query
      uri = uri + '?q=' + idAttribute + '=in=(' + value + '),' + labelAttribute + '=in=(' + value + ')'
    } else if (typeof search === 'string') {
      const value = search
      uri = uri + '?q=' + idAttribute + '=like=' + value + ',' + labelAttribute + '=like=' + value
    }
  }

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
 *      options: () => Promise.resolve([
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
 *    }
 *  ]
 * }
 *
 * @param attribute
 * @param options MapperOptions optional object containing options to configure mapper
 * @returns {Function|null} Function which returns a Promise representing an Array of FieldOptions
 */
const getFieldOptions = (attribute, options: MapperSettings): ?(() => Promise<Array<FieldOption>>) => {
  const fetchOptionsFunction = (search: ?string | Array<string>): Promise<Array<FieldOption>> => {
    return fetchFieldOptions(attribute.refEntity, search).then(response => {
      return response
    })
  }

  switch (attribute.fieldType) {
    case 'CATEGORICAL':
    case 'CATEGORICAL_MREF':
      if (attribute.categoricalOptions) {
        return () => Promise.resolve(attribute.categoricalOptions.map(option => {
          option.value = option.id
          return option
        }))
      } else {
        return fetchOptionsFunction
      }
    case 'ONE_TO_MANY':
    case 'XREF':
    case 'MREF':
      return fetchOptionsFunction
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

      return (): Promise<Array<FieldOption>> => Promise.resolve(enumOptions)
    case 'BOOL':
      const boolOptions = [
        {id: 'true', value: true, label: options.booleanLabels.trueLabel},
        {id: 'false', value: false, label: options.booleanLabels.falseLabel}
      ]

      if (attribute.nillable && options.showNillableBooleanOption) {
        boolOptions.push({id: 'null', value: null, label: options.booleanLabels.nillLabel})
      }

      return (): Promise<Array<FieldOption>> => Promise.resolve(boolOptions)
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
      return 'single-select'
    case 'ONE_TO_MANY':
    case 'MREF':
      return 'multi-select'
    case 'INT':
      return 'integer'
    case 'DECIMAL':
      return 'decimal'
    case 'LONG':
      return 'long'
    case 'TEXT':
      return 'text-area'
    case 'SCRIPT':
      return 'script'
    case 'HTML':
      return 'html'
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
 * If there is no expression present, check if mapper is run with showVisibleAttribute option set to true,
 * if this is not the case attributes visible property is used
 *
 * @param attribute
 * @param mapperOptions
 * @returns {Function} Function which evaluates to a boolean
 */
const isVisible = (attribute, mapperOptions: MapperSettings): ((?Object) => boolean) => {
  const expression = attribute.visibleExpression
  return expression ? (data) => evaluator(expression, data) : () => mapperOptions.showNonVisibleAttributes || attribute.visible
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
  return expression ? (data) => !evaluator(expression, data) : () => !attribute.nillable
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
  return expression ? (data) => evaluator(expression, data) : () => true
}

/**
 * Construct function that queries backend to check for uniqueness.
 * Returned function is expected to the called with resolve and reject functions to handle async callback and
 * proposedValue to verify uniqueness for. When runnig the mapper in update mode the optional data param is expected to
 * contain the id value of the entity to be updated.
 * @param attribute
 * @param entityMetadata
 * @param mapperOptions
 * @returns {*}
 */
const buildIsUniqueFunction = (attribute, entityMetadata: any, mapperOptions: MapperSettings): (() => Promise<boolean>) => {
  // no need to check uniqueness if uniqueness is not required, or uniqueness check not supported for field type
  // todo maybe add support for multi value field types
  if (!attribute.unique || attribute.fieldType === 'CATEGORICAL_MREF' || attribute.fieldType === 'MREF' || attribute.fieldType === 'ONE_TO_MANY') {
    return () => Promise.resolve(true)
  }

  return (proposedValue: any, data: any) => {
    return new Promise((resolve, reject) => {
      let query = {selector: attribute.name, comparison: '==', arguments: proposedValue}
      if (mapperOptions.mapperMode === 'UPDATE') {
        query = {
          operator: 'AND',
          operands: [
            query,
            {
              selector: entityMetadata.idAttribute,
              comparison: '!=',
              arguments: data[entityMetadata.idAttribute] // to validate uniqueness in update mode there must be a id value present
            }
          ]
        }
      }

      const testUniqueUrl = entityMetadata.hrefCollection + '?&num=1&q=' + encodeRsqlValue(transformToRSQL(query))
      return api.get(testUniqueUrl).then((response) => {
        resolve(response.items.length <= 0)
      }, (error) => {
        reject(error)
      })
    })
  }
}

/**
 * Determine if field should be disabled
 * @param attribute
 * @param entityMetaData
 * @param mapperOptions
 * @returns boolean
 */
const isDisabledField = (attribute, entityMetaData, mapperOptions: MapperSettings): boolean => {
  if (attribute.fieldType === 'ONE_TO_MANY') {
    return true
  }

  if (mapperOptions.mapperMode === 'CREATE') {
    return false
  }

  if (mapperOptions.mapperMode === 'UPDATE' && attribute.name === entityMetaData.idAttribute) {
    return true
  }

  return attribute.readOnly
}

/**
 * Generate a schema field object suitable for the forms
 *
 * @param attribute Attribute metadata from an EntityType V2 response
 * @param entityMetadata object containing entityMetadata
 * @param mapperOptions MapperOptions optional object containing options to configure mapper
 * @returns {{type: String, id, label, description, required: boolean, disabled, visible, options: ({uri, id, label, multiple}|{uri, id, label})}}
 */
const generateFormSchemaField = (attribute, entityMetadata:any, mapperOptions: MapperSettings): FormField => {
  // options is a function that always returns an array of option objects
  const options = getFieldOptions(attribute, mapperOptions)
  const isDisabled = isDisabledField(attribute, entityMetadata, mapperOptions)
  let fieldProperties = {
    id: attribute.name,
    label: attribute.label,
    description: attribute.description,
    type: getHtmlFieldType(attribute.fieldType),
    required: isRequired(attribute),
    disabled: isDisabled,
    readOnly: isDisabled,
    visible: isVisible(attribute, mapperOptions),
    validate: isValid(attribute),
    unique: buildIsUniqueFunction(attribute, entityMetadata, mapperOptions)
  }

  if (attribute.fieldType === 'COMPOUND') {
    const children = attribute.attributes.map(attribute => generateFormSchemaField(attribute, entityMetadata, mapperOptions))
    fieldProperties = {...fieldProperties, children}
  }

  if ((attribute.fieldType === 'INT' || attribute.fieldType === 'LONG') && attribute.range) {
    let range = {}
    if (attribute.range.hasOwnProperty('min')) {
      range.min = attribute.range.min
    }
    if (attribute.range.hasOwnProperty('max')) {
      range.max = attribute.range.max
    }

    fieldProperties = {...fieldProperties, range}
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
 * @param attributes an array of MOLGENIS attribute metadata, used for idAttribute
 * @param options Object containing settings for the mapper
 * @returns a {fieldId: value} object
 */
const generateFormData = (fields: any, data: any, attributes: any, options: MapperSettings) => {
  return attributes.reduce((accumulator, attribute) => {
    const field = fields.find(field => attribute.name === field.id)
    const idAttribute = attribute.refEntity && attribute.refEntity.idAttribute

    if (!field) {
      accumulator[attribute.name] = data[attribute.name]
      return accumulator
    }

    const setDefaultValues = options.mapperMode === 'CREATE'

    switch (field.type) {
      case 'field-group':
        // Recursively generate data for compounds
        return {...accumulator, ...generateFormData(field.children, data, attribute.attributes, options)}
      case 'file':
        // Map MOLGENIS FileMeta entity to our form file object
        // which only contains a name
        const fileData = data[field.id]
        if (setDefaultValues) {
          accumulator[field.id] = attribute.defaultValue && attribute.defaultValue.filename
        } else {
          accumulator[field.id] = fileData ? fileData.filename : data[field.id]
        }
        break
      case 'checkbox':
      case 'multi-select':
        // Default values are not supported for mref and xref values
        const checkboxData = data[field.id]
        accumulator[field.id] = checkboxData && checkboxData.map(data => data[idAttribute])
        break
      case 'radio':
      case 'single-select':
        const radioData = data[field.id]
        if (setDefaultValues) {
          accumulator[field.id] = attribute.defaultValue
        } else {
          accumulator[field.id] = radioData && typeof radioData === 'object' ? radioData[idAttribute] : data[field.id]
        }
        break
      default:
        accumulator[field.id] = setDefaultValues ? attribute.defaultValue : data[field.id]
    }
    return accumulator
  }, {})
}

/**
 * Returns true if entity attribute should be included in form
 *
 * @param attribute
 * @returns {boolean}
 */
const isFormFieldAttribute = (attribute: any): boolean => {
  return !(
    (attribute.auto && !attribute.visible) || // server side generated field
    (attribute.hasOwnProperty('expression') && attribute.expression.length > 0) // computed field
  )
}

/**
 * Generates an array for form fields
 *
 * @param metaData object containing the entity metaData
 * @param options MapperOptions object containing options to configure mapper
 * @returns a an array of Field objects
 */
const generateFormFields = (metaData: any, options: MapperSettings): Array<FormField> => {
  const {attributes, ...entityMetadata} = metaData
  return attributes.filter(isFormFieldAttribute)
    .map((attr) => {
      return generateFormSchemaField(attr, entityMetadata, options)
    })
}

/**
 * Construct mapper settings taking into account the user settings, if no settings are passed the defaults are used
 * @param settings
 * @returns {{mapperMode: *, booleanLabels: {trueLabel: string, falseLabel: string, nillLabel: string}, showNillableBooleanOption: boolean}}
 */
const buildMapperSettings = (settings?: MapperOptions): MapperSettings => {
  if (!settings) {
    return DEFAULTS
  }

  const mapperMode = settings.mapperMode ? settings.mapperMode : DEFAULTS.mapperMode

  let booleanLabels = DEFAULTS.booleanLabels
  if (settings.booleanLabels) {
    booleanLabels = {
      trueLabel: settings.booleanLabels.trueLabel ? settings.booleanLabels.trueLabel : 'True',
      falseLabel: settings.booleanLabels.falseLabel ? settings.booleanLabels.falseLabel : 'False',
      nillLabel: settings.booleanLabels.nillLabel ? settings.booleanLabels.nillLabel : 'N/A'
    }
  }

  let showNillableBooleanOption = DEFAULTS.showNillableBooleanOption
  if (typeof (settings.showNillableBooleanOption) === 'boolean') {
    showNillableBooleanOption = settings.showNillableBooleanOption
  }

  let showNonVisibleAttributes = DEFAULTS.showNonVisibleAttributes
  if (typeof (settings.showNonVisibleAttributes) === 'boolean') {
    showNonVisibleAttributes = settings.showNonVisibleAttributes
  }

  return {
    mapperMode,
    booleanLabels,
    showNillableBooleanOption,
    showNonVisibleAttributes
  }
}

/**
 * Generates both fields and data objects for rendering a form
 *
 * @param metadata MOLGENIS metadata, containing attributes
 * @param data
 * @param userSettings MapperOptions optional object containing options to configure mapper
 * @returns {{formFields: Array<FormField>, formData: *}}
 */
const generateForm = (metadata: any, data: ?any, userSettings?: MapperOptions) => {
  const mapperSettings = buildMapperSettings(userSettings)
  const formFields = generateFormFields(metadata, mapperSettings)
  const formData = generateFormData(formFields, data || {}, metadata.attributes, mapperSettings)

  return {
    formFields,
    formData
  }
}

export default {
  generateForm
}
