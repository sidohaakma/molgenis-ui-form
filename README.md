# molgenis-ui-form

[![Build Status](https://travis-ci.org/molgenis/molgenis-ui-form.svg?branch=master)](https://travis-ci.org/molgenis/molgenis-ui-form)
[![Known Vulnerabilities](https://snyk.io/test/github/molgenis/molgenis-ui-form/badge.svg?targetFile=package.json)](https://snyk.io/test/github/molgenis/molgenis-ui-form?targetFile=package.json)

> Library for generating HTML web forms

## Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/molgenis/molgenis-ui-form/blob/master/CHANGELOG.md).


## Usage

### Install

```bash
# Add library using yarn.
yarn add @molgenis/molgenis-ui-form
```

### Use

```vue
<template>
    <form-component
      id="example-form"
      :formFields="formFields"
      :initialFormData="formData"
      :formState="formState"
      :options="options"
      @valueChanged="onValueChanged"
      @addOptionRequest="handleAddOptionRequest">
    </form-component>
</template>

<script>
  // Import form component
  import { FormComponent } from '@molgenis/molgenis-ui-form'

  // Import EntityToFormMapper
  import { EntityToFormMapper } from '@molgenis/molgenis-ui-form'

  export default {
    name: 'ExampleComponent',
    data () {
      return {
        formFields: [],
        initialFormData: {},
        formState: {},
        options: {
          showEyeButton: true
        }
      }
    },
    methods: {
      handleAddOptionRequest (addNewItemFunction) {
        // Handle the request to add a new item here
        const item = {
          id: 'new_item',
          label: 'New Item',
          value: 'new_item'
        }

        addNewItemFunction(item)
      },

      onValueChanged (formData) {
        // Do something with the updated formData
        console.log(formData)
      }
    },
    created () {
      // Generate a form from a MOLGENIS v2 API response
      // Or create fields based on the specs (Form specifications)
      const form = EntityToFormMapper(metadata, items[0])
      this.formFields = form.formFields
      this.initialFormData = form.formData
    }
  }
</script>
```

__Note__: Whatever you pass to the FormComponent as formData object,
the FormComponent makes a local copy with `Object.assign({}, formData)`.

If you want to react to data input, use the [@valueChanged](#valuechanged-event) event.

### valueChanged event
When data in the form is changed, the form fires a `valueChanged` event.
This event exposes two arguments, `formData` and `isFormValid`.

`formData` is a key value object, where the field ID is the key, and the data filled in by the user is the value.
`isFormValid` is a boolean telling you if there are __any__ invalid fields in the form.

An example handler is shown below

```js
methods: {
  onValueChanged (formData) {
    console.log(formData) // all the data currently in the form
  }
}
```

##### addOptionRequest event
To allow the use to add new options to a select list the `handleAddOptionRequest` should be a function with the following properties:
 * `completedFunction` a callback function that should be called passing the `option` to be added.
 * `event` the original event triggering the request.
 * `data` object with form field state data.

 The `option` object passed to the `completedFunction` should at least have the following fields
 * `id` unique identifier
 * `label` the label shown to the user
 * `value` the form value

### Options
The FormComponent object can be configured via an options property.
If no options object is supplied the defaults are used.

| Option name          | Default | Description                             |
|----------------------|---------|-----------------------------------------|
| showEyeButton        | True    | Toggle the visibility of the Eye button. |
| allowAddingOptions   | False   | When set to true users are show a interface item to add options to a (multi)select.  
| inputDebounceTime    | 500     | Time (in milliseconds) between input updates needs to pass before update event is fired.


## Form specifications
Example on how to create fields and data objects for using the forms.

```js
const fields = [
  {
    type: 'text',
    id: 'example-text-field',
    label: 'Example text field',
    description: 'This field shows how to create a form field from scratch',
    required: (formData) => true,
    disabled: false,
    readOnly: false,
    visible: (formData) => true,
    validate: (formData) => true
  }
]

const data = {
  'example-text-field': 'example value'
}
```

### Type support
We support most HTML input types like number, text, and email. Below is a list of supported types.

| type | renders |
|------|-------------|
| radios | A list of radio buttons |
| single-select | A Vue Multiselect dropdown which supports asynchronous and synchronous option lists
| number | A HTML5 number input |
| text-area | A textarea HTML element |
| date | A Vue Flatpickr Date component |
| date-time | A Vue Flatpickr Date component with 'enableTime = true' |
| checkboxes | A list of checkboxes |
| text | A HTML5 text input |
| url | A HTML5 text url |
| email | A HTML5 text email |
| password | A HTML5 password input |
| file | A HTML5 file input |
| field-group | A type that is used to nest other inputs |

### option field example

Fields that render lists of options like radio buttons, checkboxes, and select dropdowns have an additional `option` parameter.
This option parameter should always contain a function returning a promise.

This makes it usable for both synchronous and asynchronous rendering of option lists.

```js
const fields = [
  {
    type: 'field-group',
    id: 'example-field-group',
    label: 'Example field group',
    description: 'This field shows how to create a group of fields',
    required: (formData) => true,
    disabled: false,
    readOnly: false,
    visible: (formData) => true,
    validate: (formData) => true,
    options: () => {
      const options = [
        {
          id: '1',
          label: 'Option 1',
          value: '1'
        },
        {
          id: '2',
          label: 'Option 2',
          value: '2'
        }
      ]

      return Promise.resolve(options)
    }
  }
]
```

### field group example
A field group can be used to group a set of fields.
You can specify a list of fields under a field-group via the `children` parameter.

```js
const fields = [
  {
    type: 'field-group',
    id: 'example-field-group',
    label: 'Example field group',
    description: 'This field shows how to create a group of fields',
    required: (formData) => true,
    disabled: false,
    readOnly: false,
    visible: (formData) => true,
    validate: (formData) => true,
    children: [
      {
        type: 'text',
        id: 'example-field-group',
        label: 'Example text field',
        description: 'This field shows how to create a form field from scratch',
        required: (formData) => true,
        disabled: false,
        readOnly: false,
        visible: (formData) => true,
        validate: (formData) => true
      }
    ]
  }
]

// Note that the field group itself does not have data
const data = {
  'example-text-field': 'example value'
}
```

### Range
A number fields valid input range can be restricted by supplying a range object
The range object can have a `min` property, a `max` property or both.
for example 

```js
{
  id: 'example-number-with-range',
  type: 'number',
  range: {
    min: 0,
    max: 13
  }
}
```


### Required, visible, and validate
As you might have noticed in the above examples, required, visible, and validate are functions returning a boolean.
The reason for this is that you might want to validate a field based on the input of another field.

Or show / hide a field once another field has a certain value.

```js
const fields = [
  {
    type: 'text',
    id: 'example-text-field',
    label: 'Example text field',
    description: 'This field controls the visibility of example-number-field',
    required: (formData) => true,
    disabled: false,
    readOnly: false,
    visible: (formData) => true,
    validate: (formData) => true
  },
  {
    type: 'number',
    id: 'example-number-field',
    label: 'Example number field',
    description: 'This field is shown if "example-text-field" contains the text "show"',
    required: (formData) => true,
    disabled: false,
    readOnly: false,
    visible: (formData) => {
      return formData['example-text-field'] === 'show'
    },
    validate: (formData) => true
  }
]
```

### Validation message localization
Validation messages may be localized via the use of the `@molgenis/molgenis-i18n-js` plugin.

Usage:
```
Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['some-namespace', ui-form],
  callback () {
    /* eslint-disable no-new */
    new Vue({
      el: '#form-demo',
      template: '<FormDemo/>',
      components: { FormDemo }
    })
  }
})
```

If no 'ui-form' namespace is set on the supplied Vue instance the default (English) messages are used.

#####message keys and defaults
| Key                             | Default message                 | Additional Info                         |
| ------------------------------- |---------------------------------| ----------------------------------------|
| ui-form:form_required_field     | 'This field is required'        |                                         |
| ui-form:form_validation_failed  | 'Validation failed'             |                                         |
| ui-form:form_not_a_valid_number | 'Not a valid number'            |                                         |
| ui-form:form_not_a_valid_url    | 'Not a valid URL'               |                                         |
| ui-form:form_not_a_valid_email  | 'Not a valid email'             |                                         |
| ui-form:form_not_within_range   | 'Value is outside of range'     |  min, max is added as: ' ($min - $max)' | 
| ui-form:form_below_min_value    | 'Value is below allowed value'  | min value is added as: ' $min'          |
| ui-form:form_above_max_value    | 'Value is above allowed value   | max value is added as: ' $max'          |

### Entity mapper options

The `EntityToFormMapper.generateForm` function takes a *optional* `options` param.
The options param is a object that can contain the following properties:
- `booleanLabels` optional Object used to set labels for boolean type fields, can be use in combination with i18n plugin to translate boolean labels.
- `showNillableBooleanOption` optional boolean that hides 'N/A' option for nillable boolean is set to `false`, defaults to true


## Contributing
There are 2 ways to test and develop in components for MOLGENIS.

- locally without MOLGENIS
- locally with MOLGENIS

### Test locally without a running MOLGENIS instance

For local testing you can execute the following commands:

```bash
# To install the application
yarn install

# To run develop mode
yarn dev
```

It will render a local version of the core variable catalogue.

#### Run unit tests
You can run unit tests by executing this command:

```bash
# Run once
yarn unit

# Run in watch-mode
yarn debug
```

#### Run end-to-end tests
You can run end-to-end test locally by running the following command:

```bash
yarn e2e
```

### Test with a running MOLGENIS instance
For local testing with a running MOLGENIS instance you have to alter the config of the app:

Comment in the following block

```config/index.js```

```javascript
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // Beginning of block
    proxyTable: {
      '/login': {
        target: 'http://localhost:8080'
      },
      '/api': {
        target: 'http://localhost:8080'
      }
    },
    // End of block
```

And comment out this block in the same file.


```javascript
/**
 * GET and POST interceptors
 * Removes the need for a running backend during development
 */
No mock data available
```

That is it. Run a MOLGENIS instance on localhost:8080 and start the core variable catalogue with:

```javascript
yarn dev
```

## Build your MOLGENIS component

You can now create a working application that can be imported in MOLGENIS directly, by executing:

```bash
yarn build
```

If you submit a pull-request you can release the component by navigating to the [jenkins](https://jenkins.molgenis.org/job/molgenis/job/molgenis-ui-form) and click on release.
