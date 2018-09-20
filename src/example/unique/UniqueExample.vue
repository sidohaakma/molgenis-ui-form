<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">Unique value demo</h5>
          <div class="card-body">
            <form-component
              ref="foo"
              id="unique-example"
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
    name: 'unique-example',
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
            id: 'unique-example',
            label: 'Unique Field',
            description: 'Enter \'test\' to trigger the constraint',
            type: 'string',
            visible: () => true,
            required: () => false,
            validate: () => true,
            unique: (proposedValue) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  // 'demo valuetest' is work around for clearValue function not working in selemiun test
                  // https://github.com/nightwatchjs/nightwatch/issues/504
                  resolve(proposedValue !== 'test' || proposedValue !== 'demo valuetest')
                }, 500)
              })
            }
          }
        ],
        formState: {},
        formData: {
          'unique-example': 'demo value'
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
