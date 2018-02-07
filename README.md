# molgenis-ui-form

[![Build Status](https://travis-ci.org/molgenis/molgenis-ui-form.svg?branch=master)](https://travis-ci.org/molgenis/molgenis-ui-form)
[![Known Vulnerabilities](https://snyk.io/test/github/molgenis/molgenis-ui-form/badge.svg?targetFile=package.json)](https://snyk.io/test/github/molgenis/molgenis-ui-form?targetFile=package.json)

> Library for generating HTML web forms

## Usage

### Install

```bash
# Add library using yarn.
yarn add @molgenis/molgenis-ui-form
```

### Use

```javascript
// Import vue component
import { FormComponent } from '@molgenis/molgenis-ui-form'

// Import EntityToFormMapper
import { EntityToFormMapper } from '@molgenis/molgenis-ui-form'

// Generate a form from a molgenis entity response
const form = EntityToFormMapper(response.meta, response.items[0]

data () {
  return {
    schema: {
      fields: form.formFields
    },
    data: form.formData
  }
}

// Use in template

<template>
    <form-component
      id="my-form"
      :schema="schema"
      :formState="formState"
      :formData="formData"
      :onValueChanged="onValueChanged"
      @addOptionRequest="handleAddOptionRequest"
      >
    </form-component>
</template>
```

## Configuration

### Properties

##### handleAddOptionRequest (optional)
To allow the use to add new options to a select list the ```handleAddOptionRequest``` should be a function with the following properties:
 * ```completedFunction``` a callback function that should be called passing the ```option``` to be added.
 * ```event``` the original event triggering the request.
 * ```data``` object with form field state data.

 The ```option``` object passed to the ```completedFunction``` should at least have the following fields
 * ```id``` unique identifier
 * ```label``` the label shown to the user
 * ```value``` the form value


## Development
The general guidelines and setup of the development environment are described here.

### Build setup

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

### How to publish
```bash

# Login to NPM with your credentials
npm login

# Run the NPM publish command to the correct scope
npm publish --scope=@molgenis/molgenis-ui-form --access=public

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Tests
To develop tests please acknowledge the following guidelines.

#### End-to-End test

Please make sure you add the name of the specific test in the test. This is needed to see the test-name in [Saucelabs](https://www.saucelabs.com).
**Example**

```javascript
browser.options.desiredCapabilities.name = 'Example testname'
```
