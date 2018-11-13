<template>
    <div class="row">
      <div class="col-md-12">

        <div class="card">
          <div class="card-header">
            <h5>Create entity</h5>
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
            <button id="cancel-btn" class="btn btn-secondary" type="reset" @click.prevent="onCancel">Cancel</button>
            <button id="save-btn" class="btn btn-primary" type="submit" @click.prevent="onSubmit">Save</button>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import { EntityToFormMapper, FormComponent } from '@/molgenisUiForm'
  import EntityTypeV2Response from '@/formDemoMockResponse'

  export default {
    name: 'create-entity-example',
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
          showEyeButton: true,
          allowAddingOptions: true,
          inputDebounceTime: 300
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
          trueLabel: this.$t('form_boolean_true'), // $t is set via @molgenis/molgenis-i18n-js plugin
          falseLabel: this.$t('form_boolean_false'),
          nillLabel: this.$t('form_boolean_missing')
        },
        mapperMode: 'CREATE'
      }
      const form = EntityToFormMapper.generateForm(EntityTypeV2Response.metadata, EntityTypeV2Response.items, mapperOptions)
      this.formFields = form.formFields
      this.formData = form.formData
    }
  }
</script>
