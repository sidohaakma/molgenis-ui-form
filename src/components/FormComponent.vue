<template>
  <vue-form :id="id" :state="formState">
    <div v-if="options.showEyeButton" class="text-right hide-option-fields-btn-container">
      <button type="button" class="btn btn-sm btn-outline-secondary toggle-btn" :title="eyeMessage"
              @click="toggleOptionalFields">
        <i class="fa show-fields-icon" :class="{'fa-eye-slash': showOptionalFields, 'fa-eye': !showOptionalFields}"></i>
      </button>
    </div>

    <template v-for="field in formFields">
      <form-field-component
        :eventBus="eventBus"
        :formData="formData"
        :field="field"
        :formState="formState"
        :showOptionalFields="showOptionalFields"
        @dataChange="onValueChanged(formData)">
      </form-field-component>
    </template>
  </vue-form>
</template>

<script>
  import Vue from 'vue'
  import VueForm from 'vue-form'
  import FormFieldComponent from './FormFieldComponent'
  import { isValidSchema } from '../util/SchemaService'

  export default {
    name: 'FormComponent',
    mixins: [VueForm],
    props: {
      id: {
        type: String,
        required: true
      },
      formFields: {
        type: Array,
        required: true,
        validator: isValidSchema
      },
      formState: {
        type: Object,
        required: true
      },
      formData: {
        type: Object,
        required: true
      },
      onValueChanged: {
        type: Function,
        required: false,
        default (formData) {
          this.$emit('valueChanged', formData)
        }
      },
      options: {
        type: Object,
        required: false,
        default: () => {
          return {
            showEyeButton: true
          }
        }
      }
    },
    data () {
      return {
        eventBus: new Vue(),
        showOptionalFields: true
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
