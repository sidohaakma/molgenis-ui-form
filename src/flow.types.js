// @flow

export type EntityFieldType = 'BOOL' | 'CATEGORICAL' | 'ENUM' | 'XREF' |'MREF' |'ONETOMANY' |'INT' | 'DECIMAL' | 'LONG' |
  'TEXT' | 'SCRIPT'| 'HTML' | 'DATE'| 'DATE_TIME'| 'CATEGORICAL_MREF'| 'STRING'| 'HYPERLINK'| 'EMAIL' | 'FILE'

export type HtmlFieldType = 'radio' | 'select' | 'number' | 'text-area' | 'date' | 'date-time' | 'checkboxes' |
  'text' | 'url' | 'email' | 'file'

export type FormField = {
  type: string,
  id: string,
  label: string,
  required: mixed,
  disabled: mixed,
  visible: mixed,
  inputProperties?: mixed,
  validators: Array<mixed>
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
  onSubmit:? (formData: Object) => {},
  onCancel?: () => {},
  onValueChanged?: (formData: Object) => {}
}
