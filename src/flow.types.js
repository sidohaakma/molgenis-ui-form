// @flow

export type EntityFieldType = 'BOOL' | 'CATEGORICAL' | 'ENUM' | 'XREF' | 'MREF' | 'ONETOMANY' |
  'INT' | 'DECIMAL' | 'LONG' | 'TEXT' | 'SCRIPT' | 'HTML' | 'DATE' | 'DATE_TIME' | 'CATEGORICAL_MREF' |
  'STRING' | 'HYPERLINK' | 'EMAIL' | 'FILE' | 'ONE_TO_MANY' | 'COMPOUND'

export type HtmlFieldType = 'radio' | 'select' | 'number' | 'text-area' | 'date' | 'date-time' | 'checkbox' |
  'text' | 'url' | 'email' | 'file' | 'field-group' | 'multi-select' | 'single-select' | 'script' | 'html'

export type FieldOption = {
  id: string,
  value: string | boolean | number | null,
  label: string
}

export type FormField = {
  type: HtmlFieldType,
  id: string,
  label: string,
  required: ((?Object) => boolean),
  disabled: boolean,
  visible: ((?Object) => boolean),
  options?: (() => Promise<Array<FieldOption>>),
  children?: Array<FormField>,
  validate: ((?Object) => boolean)
}

export type RefEntityType = {
  href: string,
  hrefCollection: string,
  idAttribute: string,
  labelAttribute?: string,
  languageCode?: string,
  writable?: boolean
}
