<template>
  <vue-form :id="id" :state="state" @submit.prevent="hooks.onSubmit(formData)" @reset.prevent="hooks.onCancel">
    <div class="text-right hide-option-fields-btn-container">
      <button id="toggle-btn" type="button" class="btn btn-sm btn-outline-secondary"
              @click="toggleOptionalFields">
        <i class="fa fa-eye"></i>
      </button>
    </div>
    <template v-for="field in schema.fields">
      <form-field-component
        :formData="formData"
        :field="field"
        :state="state"
        :showOptionalFields="showOptionalFields"
        @dataChange="hooks.onValueChanged(formData)">
      </form-field-component>
    </template>
  </vue-form>
</template>

<script>
  import VueForm from 'vue-form'
  import FormFieldComponent from './FormFieldComponent'
  import { isValidSchema } from '../util/SchemaService'
  import { FormHook } from '../flow.types'

  export default {
    name: 'FormComponent',
    mixins: [VueForm],
    props: {
      id: {
        type: String,
        required: true
      },
      schema: {
        type: Object,
        required: true,
        validator: isValidSchema
      },
      formData: {
        type: Object,
        required: false,
        default: () => ({})
      },
      hooks: {
        type: FormHook,
        required: true
      }
    },
    data () {
      return {
        showOptionalFields: true,
        state: {},
        formData: this.formData
      }
    },
    methods: {
      toggleOptionalFields () {
        this.showOptionalFields = !this.showOptionalFields
      }
    },
    components: {
      FormFieldComponent
    }
  }
</script>
