<template>
  <div>
    <h5>Integer subtype</h5>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center">Demo</h5>
          <div class="card-body">
            <form-component
              id="integer-example"
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
        <div class="card">
          <h5 class="card-header text-center">Settings</h5>
          <div class="card-body">

            <h5 class="card-title">model</h5>
            <pre>{{ formFields[0] | pretty }}</pre>
            <hr/>

            <h5 class="card-title">data</h5>
            <pre>{{ formData }}</pre>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import { FormComponent } from '../../molgenisUiForm'

  export default {
    name: 'integer-example',
    components: {
      FormComponent
    },
    data () {
      return {
        formOptions: {
          showEyeButton: false
        },
        formFields: [
          {
            id: 'integer-example',
            label: 'Integer Field',
            description: 'Integer is a number sub type',
            type: 'number',
            subType: 'integer',
            visible: () => true,
            required: () => false,
            validate: () => true
          }
        ],
        formState: {},
        formData: {
          'integer-example': 3
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
