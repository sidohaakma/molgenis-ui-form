// @flow
import type { FormField } from '../flow.types'

function InvalidSchemaException (message: string) {
  this.message = message
  this.name = 'InvalidSchemaException'
}

(InvalidSchemaException.prototype: any).toString = function () { return this.name + ': "' + this.message + '"' }

const isValidSchema = (formFields: Array<FormField>): boolean => {
  const fieldIds = new Set()

  const notUnique = formFields.some(field => {
    return fieldIds.size === fieldIds.add(field.id).size
  })

  if (notUnique) {
    throw new InvalidSchemaException('Identifiers for fields inside your formFields must be unique!')
  }

  return true
}

export {
  isValidSchema
}
