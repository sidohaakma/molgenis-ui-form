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
            <button id="update-data-btn" type="button" @click="changeData">Change form data</button>
          </div>

          <div id="alert-message" v-if="message" class="alert alert-info" role="alert">
            <button @click="message=null" type="button" class="close"><span aria-hidden="true">&times;</span></button>
            <span id="message-span">{{message}}</span>
          </div>

          <div class="card-body">
            <form-component
              id="example-form"
              :formFields="formFields"
              :initialFormData="formData"
              :formState="formState"
              :options="options"
              @valueChange="onValueChanged"
              @addOptionRequest="handleAddOptionRequest">
            </form-component>
          </div>

          <div class="card-footer">
            <button id="save-btn" class="btn btn-primary" type="submit" @click.prevent="onSubmit">Save</button>
            <button id="cancel-btn" class="btn btn-secondary" type="reset" @click.prevent="onCancel">Cancel</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { EntityToFormMapper, FormComponent } from './molgenisUiForm'
  import EntityTypeV2Response from './formDemoMockResponse'

  export default {
    name: 'form-demo',
    components: {
      FormComponent
    },
    data () {
      return {
        message: null,
        formFields: [],
        formState: {},
        formData: {},
        options: {
          showEyeButton: true
        }
      }
    },
    methods: {
      onSubmit () {
        this.message = 'onSubmit: ' + JSON.stringify(this.formData)
      },
      onCancel () {
        this.message = 'onCancel'
      },
      onValueChanged (formData) {
        this.message = 'onValueChanged: ' + JSON.stringify(formData)
        this.formData = formData
      },
      handleAddOptionRequest (completedFunction, event, data) {
        const newMockOption = {
          id: Math.floor(Math.random() * 1000),
          label: 'New Demo item',
          value: 'Demo value'
        }
        completedFunction(newMockOption)
      },
      changeData () {
        this.formData['nested-compound-string'] = 'show'
        this.formData['comppound-int'] = '1'
      }
    },
    created () {
      const mapperOptions = {
        booleanLabels: {
          trueLabel: this.$t('form_bool_true'), // $t is set via @molgenis/molgenis-i18n-js plugin
          falseLabel: this.$t('form_bool_false'),
          nillLabel: this.$t('form_bool_missing')
        }
      }
      const form = EntityToFormMapper.generateForm(EntityTypeV2Response.metadata, EntityTypeV2Response.items, mapperOptions)
      this.formFields = form.formFields
      this.formData = form.formData
    }
  }
</script>
