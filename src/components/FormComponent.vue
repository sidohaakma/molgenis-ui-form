<template>
  <vue-form :id="id" :state="formState" @submit.prevent="hooks.onSubmit(formData)" @reset.prevent="hooks.onCancel">
    <div class="text-right hide-option-fields-btn-container">
      <button type="button" class="btn btn-sm btn-outline-secondary toggle-btn" :title="eyeMessage"
              @click="toggleOptionalFields">
        <i class="fa show-fields-icon" :class="{'fa-eye-slash': showOptionalFields, 'fa-eye': !showOptionalFields}"></i>
      </button>
    </div>

    <template v-for="field in schema.fields">
      <form-field-component
        :eventBus="eventBus"
        :formData="formData"
        :field="field"
        :formState="formState"
        :showOptionalFields="showOptionalFields"
        @dataChange="hooks.onValueChanged(formData)">
      </form-field-component>
    </template>
  </vue-form>
</template>

<script>
  import Vue from 'vue'
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
      formState: {
        type: Object,
        required: true
      },
      initialFormData: {
        type: Object,
        required: false
      },
      hooks: {
        type: FormHook,
        required: true
      }
    },
    data () {
      return {
        eventBus: new Vue(),
        showOptionalFields: true,
        // clone initialFormData to formData as formDate needs to be Observable
        formData: Object.assign({}, this.initialFormData)
      }
    },
    methods: {
      toggleOptionalFields () {
        this.showOptionalFields = !this.showOptionalFields
      },
      handleAddOptionEvent (completedFunction, event, data) {
        this.$emit('addOptionRequest', completedFunction, event, data)
      }
    },
    components: {
      FormFieldComponent
    },
    computed: {
      eyeMessage () {
        return this.showOptionalFields ? 'Hide optional fields' : 'Show all fields'
      }
    },
    created: function () {
      this.eventBus.$on('addOption', this.handleAddOptionEvent)
    }
  }
</script>
