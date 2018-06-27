<template>
  <validate :state="fieldState" :custom="{'validate': isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <textarea
        :id="field.id"
        v-model="localValue"
        :name="field.id"
        class="form-control"
        :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted) && fieldState.$invalid}"
        :aria-describedby="field.id + '-description'"
        :required="isRequired"
        :disabled="field.disabled">
      </textarea>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :field-state="fieldState">
      </form-field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import { FormField } from '../../flow.types'
  import FormFieldMessages from '../FormFieldMessages'
  import debounce from 'debounce'

  let debounceTime = 500

  export default {
    name: 'TextAreaFieldComponent',
    components: {
      FormFieldMessages
    },
    props: {
      value: {
        type: String,
        required: false
      },
      field: {
        type: FormField,
        required: true
      },
      fieldState: {
        type: Object,
        required: false
      },
      isValid: {
        type: Boolean,
        default: true
      },
      isRequired: {
        type: Boolean,
        default: false
      },
      inputDebounceTime: {
        type: Number,
        default: debounceTime
      }
    },
    mixins: [VueForm],
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value
      }
    },
    watch: {
      localValue: debounce(function (value) {
        // Emit value changes to the parent (form)
        this.$emit('input', value)
        // Emit value changes to trigger the onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }, debounceTime)
    },
    created () {
      debounceTime = this.inputDebounceTime
    }
  }
</script>
