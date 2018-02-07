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
            <form-component
              id="example-form"
              :schema="schema"
              :formState="formState"
              :formData="formData"
              :onValueChanged="onValueChanged"
              :options="options"
              @addOptionRequest="handleAddOptionRequest">
            </form-component>
          </div>
          <div class="card-footer">
            <button id="save-btn" class="btn btn-primary" type="submit" @click.prevent="onSubmit(formData)">Save</button>
            <button id="cancel-btn" class="btn btn-secondary" type="reset" @click.prevent="onCancel()">Cancel</button>
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
        message: null,
        schema: {fields: []},
        formState: {},
        formData: {},
        options: {
          showEyeButton: true
        }
      }
    },
    methods: {
      onSubmit (formData) {
        this.message = 'onSubmit: ' + JSON.stringify(formData)
      },
      onCancel () {
        this.message = 'onCancel'
      },
      onValueChanged (formData) {
        this.message = 'onValueChanged: ' + JSON.stringify(formData)
      },
      handleAddOptionRequest (completedFunction, event, data) {
        const newMockOption = {
          id: Math.floor(Math.random() * 1000),
          label: 'New Demo item',
          value: 'Demo value'
        }
        completedFunction(newMockOption)
      }
    },
    created () {
      this.schema.fields = EntityToStateMapper.generateFormFields(EntityTypeV2Response.metadata)
      this.formData = EntityToStateMapper.generateFormData(this.schema.fields, EntityTypeV2Response.items)
    }
  }
</script>
