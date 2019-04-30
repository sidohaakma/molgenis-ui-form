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
        class="mg-ui-form-field"
        :eventBus="eventBus"
        :formData="formData"
        :field="field"
        :formState="formState"
        :showOptionalFields="showOptionalFields"
        @dataChange="handleValueChange(formData)"
        :form-component-options="options"
        :key="field.id"
      >
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
    initialFormData: {
      type: Object,
      required: true
    },
    formState: {
      type: Object,
      required: false,
      default: () => ({})
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
    },
    handleValueChange (formData) {
      this.$emit('valueChange', formData)
    }
  },
  components: {
    FormFieldComponent
  },
  computed: {
    eyeMessage () {
      const defaultMessages = (key) => {
        return {
          'ui-form:form_hide_optional_hint': 'Hide optional fields',
          'ui-form:form_show_optional_hint': 'Show all fields'
        }[key]
      }
      const localizedMessages = this.$t || defaultMessages
      return this.showOptionalFields ? localizedMessages('ui-form:form_hide_optional_hint') : localizedMessages('ui-form:form_show_optional_hint')
    },

    /**
       *  Create local copy to break data reactivity with the
       *  outside world and "enforce" a one way data-flow
       */
    formData () {
      return Object.assign({}, this.initialFormData)
    }
  },
  created: function () {
    this.eventBus.$on('addOption', this.handleAddOptionEvent)
  }
}
</script>
