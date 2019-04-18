<template>
  <div>
    <div class="row mb-1">
      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">Multi select demo</h5>
          <div class="card-body">
            <form-component
              id="multi-select-form-example"
              :options="formOptions"
              :formFields="formFields"
              :initialFormData="formData"
              :formState="formState"
              @valueChange="onValueChanged"
            ></form-component>
          </div>
        </div>
      </div>

      <div class="col-sm">
        <model-settings 
        :field-settings="formFields[0]" 
        :field-data="formData"
        :form-state="formState"
        ></model-settings>
      </div>
    </div>
  </div>
</template>

<script>
import { FormComponent } from '../../molgenisUiForm'
import ModelSettings from '../components/ModelSettings'

export default {
  name: 'multi-select-example',
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
          id: 'multi-select-example',
          label: 'Multi select field',
          description: 'test the multi select',
          type: 'multi-select',
          options: () =>
            Promise.resolve([
              {
                id: '1',
                label: 'Option 1',
                value: 'val-1'
              },
              {
                id: '2',
                label: 'Option 2',
                value: 'val-2'
              },
              {
                id: '3',
                label: 'Option 3',
                value: 'val-3'
              },
              {
                id: '4',
                label: 'Option 4',
                value: 'val-4'
              },
              {
                id: '5',
                label: 'Option 5',
                value: 'val-5'
              }
            ]),
          visible: () => true,
          required: () => false,
          validate: () => true
        }
      ],
      formState: {},
      formData: {}
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
