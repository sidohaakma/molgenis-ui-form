<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">

        <div class="row">
          <div class="col-sm">
            <div class="card">
              <h5 class="card-header text-center bg-info">Age function demo</h5>
              <div class="card-body">
                <form-component
                  id="age-example"
                  :options="formOptions"
                  :formFields="formFields"
                  :initialFormData="formData"
                  :formState="formState"
                  @valueChange="onValueChanged">
                </form-component>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <div class="card">
              <h5 class="card-header text-center ">Age function</h5>
              <div class="card-body">
               Age is: {{age}}
              </div>
            </div>
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
  import moment from 'moment'
  import evaluator from '@/util/helpers/evaluator'

  export default {
    name: 'age-example',
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
            id: 'age-example-field',
            label: 'Date Field',
            description: 'With age validation',
            type: 'date',
            visible: () => true,
            required: () => false,
            validate: () => true
          }
        ],
        formState: {},
        formData: {
          'age-example-field': moment().format('YYYY-MM-DD')
        }
      }
    },
    computed: {
      age () {
        const expression = '$("date").age().value()'
        const entity = {date: this.formData['age-example-field']}
        return evaluator(expression, entity)
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
