<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">File field demo</h5>
          <div class="card-body">
            <form-component
              id="file-example-form"
              :options="formOptions"
              :formFields="formFields"
              :initialFormData="formData"
              :formState="formState"
              @valueChange="onValueChanged">
            </form-component>
          </div>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="nillable" v-model="nillable">
          <label class="custom-control-label" for="nillable">required</label>
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
  name: 'file-example',
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
          id: 'file-example',
          label: 'File Field',
          description: 'File type example',
          type: 'file',
          visible: () => true,
          required: () => false,
          validate: () => true
        }
      ],
      formState: {},
      formData: {
        'file-example': 'test-file-name.txt'
      }
    }
  },
  computed: {
    nillable: {
      get: function () {
        return this.formFields[0].required()
      },
      set: function (newValue) {
        this.formFields[0].required = () => newValue
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
