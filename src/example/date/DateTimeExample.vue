<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">Datetime field demo</h5>
          <div class="card-body">
            <form-component
              id="datetime-example-form"
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

        <div class="card">
          <h5 class="card-header text-center">Edit props</h5>
          <div class="card-body">
            <input class="form-control" type="text" v-model="formData['datetime-example-field']"/>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { FormComponent } from '../../molgenisUiForm'
import ModelSettings from '../components/ModelSettings'

export default {
  name: 'datetime-example',
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
          id: 'datetime-example-field',
          label: 'Datetime Field',
          description: 'Datetime type',
          type: 'date-time',
          visible: () => true,
          required: () => false,
          validate: () => true
        }
      ],
      formState: {},
      formData: {
        'datetime-example-field': '1985-08-12T11:12:13+0500'
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
