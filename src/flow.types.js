// @flow

export type EntityFieldType = 'BOOL' | 'CATEGORICAL' | 'ENUM' | 'XREF' |'MREF' |'ONETOMANY' |'INT' | 'DECIMAL' | 'LONG' |
  'TEXT' | 'SCRIPT'| 'HTML' | 'DATE'| 'DATE_TIME'| 'CATEGORICAL_MREF'| 'STRING'| 'HYPERLINK'| 'EMAIL' | 'FILE'

export type HtmlFieldType = 'radio' | 'select' | 'number' | 'text-area' | 'date' | 'date-time' | 'checkbox' |
  'text' | 'url' | 'email' | 'file'

export type FieldOption = {
  id: string,
  value: string | boolean | number,
  label: string
}

export type FormField = {
  type: HtmlFieldType,
  id: string,
  label: string,
  required: (() => boolean),
  disabled: boolean,
  visible: (() => boolean),
  options?: (() => Promise<Array<FieldOption>>),
  validate: (() => boolean)
}

export type Schema = {
  fields: Array<FormField>
}

export type RefEntityType = {
  href: string,
  hrefCollection: string,
  idAttribute: string,
  labelAttribute?: string,
  languageCode?: string,
  writable?: boolean
}

/**
 *
 * You can define hooks in the VUE-app that uses molgenis-form (client). You can view examples below.
 *
 * @example
 *
 * hooks: {
 *   onSubmit(formData) {
 *     // press the save-button for instance of the client
 *   },
 *   onCancel() {
 *     // press the cancel-button in the client
 *   },
 *   onValueChanged(formData) {
 *     // trigger onValueChanged hook in the client
 *   }
 * }
 */
export type FormHook = {
  onSubmit: ? (formData: Object) => {},
  onCancel?: () => {},
  onValueChanged?: (formData: Object) => {}
}
