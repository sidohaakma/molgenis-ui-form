<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">Number field demo</h5>
          <div class="card-body">
            <form-component
              id="number-example"
              :options="formOptions"
              :formFields="formFields"
              :initialFormData="formData"
              :formState="formState"
              @valueChange="onValueChanged">
            </form-component>
          </div>
        </div>
      </div>

      <div class="col-sm">
        <div class="col-sm">
          <model-settings :field-settings="formFields[0]" :field-data="formData"></model-settings>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import { FormComponent } from '../../molgenisUiForm'
  import ModelSettings from '../components/ModelSettings'

  export default {
    name: 'number-example',
    components: {
      FormComponent,
      ModelSettings
    },
    data () {
      return {
        formOptions: {
          showEyeButton: false
        },
        formFields: [
          {
            id: 'number',
            label: 'Number Field',
            description: 'A default number field',
            type: 'number',
            visible: () => true,
            required: () => false,
            validate: () => true
          }
        ],
        formState: {},
        formData: {
          number: 88
        }
      }
    },
    methods: {
      onValueChanged (formData) {
        this.formData = formData
      }
    },
    filters: {
      pretty (value) {
        return JSON.stringify(value, null, 2)
      }
    }
  }
</script>
