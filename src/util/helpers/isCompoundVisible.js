// @flow

import type { FormField } from '../../flow.types'

/**
 * Checks whether a compound should be shown based on the visibility of its children
 *
 * @param field the compound field
 * @param data the entire data of the form
 */
export default function isCompoundVisible (field: FormField, data: ?Object): boolean {
  return field.type === 'field-group' && field.children !== undefined && field.children.some(child => {
    if (child.type === 'field-group') {
      return isCompoundVisible(child, data)
    }
    return child.visible(data)
  })
}
