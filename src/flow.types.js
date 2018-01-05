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
  type: string,
  id: string,
  label: string,
  required: (() => boolean),
  disabled: boolean,
  visible: (() => boolean),
  options?: (() => Promise<Array<FieldOption>>),
  validate: (() => boolean)
}

export type RefEntityType = {
  href: string,
  hrefCollection: string,
  idAttribute: string,
  labelAttribute?: string,
  languageCode?: string,
  writable?: boolean
}
