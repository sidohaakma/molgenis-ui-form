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
            <form-component id="example-form" :schema="schema" :initialFormData="initialFormData" :hooks="hooks"></form-component>
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

<style>
  /*  Styling to have v-select look like bootstrap field */
  .v-select {
    padding: 0 0 0 10px;
  }

  .v-select.disabled {
    background-color: #f8f8f8;
  }

  .v-select > .dropdown-toggle {
    border: none;
  }

  /* fix to hide input[type=search] as webkit forces browser style */
  .v-select .dropdown-toggle input[type=search] {
    -webkit-appearance: textfield;
  }
</style>

<script>
  import { EntityToStateMapper, FormComponent } from './molgenisUiForm'
  import EntityTypeV2Response from './formDemoMockResponse'

  export default {
    name: 'form-demo',
    components: {
      FormComponent
    },
    data () {
      return {
        hooks: {
          onSubmit: (formData) => {
            this.message = 'onSubmit: ' + JSON.stringify(formData)
          },
          onCancel: () => {
            this.message = 'onCancel'
          },
          onValueChanged: (formData) => {
            this.message = 'onValueChanged: ' + JSON.stringify(formData)
          }
        },
        message: null,
        schema: {
          fields: EntityToStateMapper.generateFormFields(EntityTypeV2Response.metadata)
        }
      }
    },
    computed: {
      initialFormData () {
        return EntityToStateMapper.generateFormData(this.schema.fields, EntityTypeV2Response.items)
      }
    }
  }
</script>
