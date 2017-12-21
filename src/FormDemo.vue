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
            <form-component id="example-form" :schema="schema"></form-component>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent'

export default {
  name: 'form-demo',
  components: {
    FormComponent
  },
  data () {
    return {
      schema: {
        fields: [
          {
            type: 'text',
            id: 'text-field',
            label: 'Text field',
            description: 'This is a cool text field',
            visible: true,
            required: true,
            disabled: false,
            validators: [
              (value) => {
                const valid = value.indexOf('test') !== -1
                const message = valid ? '' : 'not valid value. Please include the word test'
                return {
                  valid: valid,
                  message: message
                }
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
