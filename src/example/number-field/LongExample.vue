<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">Long field demo</h5>
          <div class="card-body">
            <form-component
              id="long-example-form"
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
        <model-settings :field-settings="formFields[0]" :field-data="formData"></model-settings>
      </div>

    </div>

  </div>
</template>

<script>
import { FormComponent } from '../../molgenisUiForm'
import ModelSettings from '../components/ModelSettings'

export default {
  name: 'long-example',
  components: {
    ModelSettings,
    FormComponent
  },
  data () {
    return {
      formOptions: {
        showEyeButton: false
      },
      formFields: [
        {
          id: 'long-example',
          label: 'Long Field',
          description: 'Long type',
          type: 'long',
          visible: () => true,
          required: () => false,
          validate: () => true,
          range: {}
        }
      ],
      formState: {},
      formData: {
        'long-example': 9147483647
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
