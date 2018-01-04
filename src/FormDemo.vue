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
          <div id="alert-message" v-if="message" class="alert alert-info" role="alert">
            <button @click="message=null" type="button" class="close"><span aria-hidden="true">&times;</span></button>
            <span id="message-span">{{message}}</span>
          </div>
          <div class="card-body">
            <form-component id="example-form" :schema="schema" :formData="data" :hooks="hooks"></form-component>
          </div>
          <div class="card-footer">
            <button id="save-btn" class="btn btn-primary" type="submit" form="example-form">Save</button>
            <button id="cancel-btn" class="btn btn-secondary" type="reset" form="example-form">Cancel</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { FormComponent } from './molgenisUiForm'

  const schema = {
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
          (data) => {
            const value = data['text-field']
            return value ? value.indexOf('test') !== -1 : true
          }
        ]
      },
      {
        type: 'radio',
        id: 'radio-field',
        label: 'Radio field',
        description: 'This is a nice radio button selection',
        visible: true,
        required: true,
        disabled: false,
        validators: [],
        options: () => {
          return [
            {
              id: '1',
              label: 'Option 1',
              value: '1'
            },
            {
              id: '2',
              label: 'Option 2',
              value: '2'
            },
            {
              id: '3',
              label: 'Option 3',
              value: '3'
            }
          ]
        }
      },
      {
        type: 'checkbox',
        id: 'checkbox-field',
        label: 'Checkbox field',
        description: 'This is a nice Checkbox selection',
        visible: true,
        required: true,
        disabled: false,
        validators: [],
        options: () => {
          return [
            {
              id: '1',
              label: 'Option 1',
              value: '1'
            },
            {
              id: '2',
              label: 'Option 2',
              value: '2'
            },
            {
              id: '3',
              label: 'Option 3',
              value: '3'
            }
          ]
        }
      }
    ]
  }

  const data = {
    'text-field': 'text value',
    'radio-field': '1',
    'checkbox-field': ['1', '3']
  }

  export default {
    name: 'form-demo',
    components: {
      FormComponent
    },
    data () {
      return {
        schema: schema,
        data: data,
        hooks: {
          onSubmit: (formData) => {
            this.message = formData
          },
          onCancel: () => {
            this.message = 'Cancel is clicked'
          },
          onValueChanged: (formData) => {
            this.message = 'This value is changed: [' + JSON.stringify(formData) + ']'
          }
        },
        message: null
      }
    }
  }
</script>
