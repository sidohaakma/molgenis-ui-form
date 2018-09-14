<template>
  <validate :state="fieldState" :custom="customValidation">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <input
        :id="field.id"
        v-model="localValue"
        :type="inputType"
        :name="field.id"
        class="form-control"
        :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted) && fieldState.$invalid}"
        :aria-describedby="field.id + '-description'"
        :required="isRequired"
        :disabled="field.disabled"
        :step="stepSize">

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :type="field.type" :range="field.range" :field-state="fieldState">
      </form-field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import { FormField } from '../../flow.types'
  import FormFieldMessages from '../FormFieldMessages'
  import debounce from 'debounce'

  const MIN_JAVA_INT = -2147483648
  const MAX_JAVA_INT = 2147483647

  let debounceTime = 500

  export default {
    name: 'TypedFieldComponent',
    components: {
      FormFieldMessages
    },
    props: {
      value: {
        // The value representing a Number or String
        type: [String, Number],
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
        /*
        Do not convert NaN field to number to allow for validation to generate warning
         */
        if (this.isNumberField(this.field) && !Number.isNaN(value)) {
          this.$emit('input', Number(value))
        } else {
          this.$emit('input', value)
        }

        // Emit value changes to trigger the onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }, debounceTime)
    },
    computed: {
      customValidation () {
        let validate = {'validate': this.isValid}
        if (this.isNumberField(this.field)) {
          if (this.field.type === 'integer') {
            validate = { ...validate, integer: this.isCompatibleWithJavaInt() }
          } else if (this.field.type === 'long') {
            validate = { ...validate, long: this.isCompatibleWithJavaLong() }
          }
        }

        if (this.isNumberField(this.field) && this.field.range) {
          validate = { ...validate, range: this.isWithinRange }
        }

        return validate
      },
      stepSize () {
        // Conditionally add step size, return false to omit step attribute
        return (this.field.type === 'integer' || this.field.type === 'long') ? 1 : false
      },
      inputType () {
        return this.isNumberField(this.field) ? 'number' : this.field.type
      }
    },
    methods: {
      isWithinRange () {
        if (this.field.range.hasOwnProperty('min') && this.localValue < this.field.range.min) {
          return false
        }
        if (this.field.range.hasOwnProperty('max') && this.localValue > this.field.range.max) {
          return false
        }

        return true
      },
      isCompatibleWithJavaInt () {
        return Number.isSafeInteger(this.value) && this.value <= MAX_JAVA_INT && this.value >= MIN_JAVA_INT
      },
      isCompatibleWithJavaLong () {
        return Number.isInteger(this.value)
      },
      isNumberField (field) {
        return field.type === 'integer' || field.type === 'long' || field.type === 'decimal'
      }
    },
    created () {
      debounceTime = this.inputDebounceTime
    }
  }
</script>
