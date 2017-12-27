<template>
  <div id="form-demo" class="container">
    <div class="row">
      <div class="col-md-12">

        <blockquote class="blockquote text-center">
          <h1 class="display-3">MOLGENIS Form</h1>
          <footer class="blockquote-footer">Powered by<cite title="Source Title">Vue.js</cite></footer>
        </blockquote>

        <hr>

        <div class="card">
          <div class="card-header">
            <h5>Example form</h5>
          </div>

          <div class="card-body">
            <form-component id="example-form" :schema="schema" :data="data"></form-component>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { FormComponent, EntityToStateMapper } from './molgenisUiForm'

const demoResponse = {
  'href': '/api/v2/it_emx_datatypes_TypeTest',
  'hrefCollection': '/api/v2/it_emx_datatypes_TypeTest',
  'name': 'it_emx_datatypes_TypeTest',
  'label': 'TypeTest',
  'description': 'MOLGENIS Data types test entity',
  'attributes': [
    {
      'href': '/api/v2/it_emx_datatypes_TypeTest/meta/string',
      'fieldType': 'STRING',
      'name': 'string',
      'label': 'String Field',
      'attributes': [],
      'auto': false,
      'nillable': false,
      'readOnly': false,
      'labelAttribute': true,
      'unique': true,
      'visible': true,
      'lookupAttribute': true,
      'isAggregatable': false,
      'description': 'STRING description',
      'nullableExpression': '$("text").value() !== "test"',
      'validationExpression': '$("string").value() === "valid"'
    }
  ],
  'labelAttribute': 'id',
  'idAttribute': 'id',
  'lookupAttributes': [
    'id'
  ],
  'isAbstract': false,
  'writable': true,
  'languageCode': 'en'
}

const data = {
  string: 'string value',
  text: 'text value',
  hyperlink: 'www.nu.nl',
  categorical_mref: ['1', '2'],
  date: '2018/01/01',
  xref: {id: '1', value: '1', label: 'Option 1'}
}
const demoField = EntityToStateMapper.generateFormFields(demoResponse)

export default {
  name: 'form-demo',
  components: {
    FormComponent
  },
  data () {
    return {
      schema: {
        fields: demoField
      },
      data: EntityToStateMapper.generateFormData(demoField, data)
    }
  }
}
</script>
