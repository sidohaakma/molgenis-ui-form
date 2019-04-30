<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">Radio field demo</h5>
          <div class="card-body">
            <form-component
              id="radio-example-form"
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
  name: 'radio-example',
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
          id: 'radio-example',
          label: 'Radio Field',
          description: 'Radio type',
          type: 'radio',
          options: () => Promise.resolve([
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
            { value: 3, label: 'Option 3' }
          ]),
          visible: () => true,
          required: () => true,
          validate: () => true
        }
      ],
      formState: {},
      formData: {
        'radio-example': null
      }
    }
  },
  computed: {
    nillable: {
      // getter
      get: function () {
        return this.formFields[0].required()
      },
      // setter
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
