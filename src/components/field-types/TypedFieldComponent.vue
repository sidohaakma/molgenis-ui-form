<template>
  <validate :state="fieldState" :custom="{validate: isValid, integer: isValidInt, long: isValidLong, range: isValidRange, unique: isUnique}" :debounce="inputDebounceTime">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <input
        :id="field.id"
        v-model="localValue"
        :type="inputType"
        :name="field.id"
        class="form-control"
        :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
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
      isUnique: {
        type: Function,
        default: () => true
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
      pending (pending) {
        if (pending) {
          return
        }
        if (this.isNumberField && !Number.isNaN(Number(this.localValue))) {
          this.$emit('input', Number(this.localValue))
        } else {
          this.$emit('input', this.localValue)
        }

        // Emit value changes to trigger the onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }
    },
    computed: {
      pending () {
        return this.fieldState && this.fieldState.$pending
      },
      stepSize () {
        // Conditionally add step size, return false to omit step attribute
        return (this.field.type === 'integer' || this.field.type === 'long') ? 1 : false
      },
      inputType () {
        return this.isNumberField ? 'number' : this.field.type
      },
      isValidRange () {
        if (!this.isNumberField || !this.field.range) {
          return true
        }

        const numberValue = Number(this.localValue)
        if (Number.isNaN(numberValue)) {
          return false
        }
        if (this.field.range.hasOwnProperty('min') && numberValue < this.field.range.min) {
          return false
        }
        if (this.field.range.hasOwnProperty('max') && numberValue > this.field.range.max) {
          return false
        }

        return true
      },
      isValidInt () {
        if (this.field.type !== 'integer') {
          return true
        }

        const numberValue = Number(this.localValue)
        if (Number.isNaN(this.localValue)) {
          return false
        }
        return Number.isSafeInteger(numberValue) && numberValue <= MAX_JAVA_INT && numberValue >= MIN_JAVA_INT
      },
      isValidLong () {
        if (this.field.type !== 'long') {
          return true
        }
        const numberValue = Number(this.localValue)
        if (Number.isNaN(this.localValue)) {
          return false
        }
        return Number.isInteger(numberValue)
      },
      isNumberField () {
        return this.field.type === 'integer' || this.field.type === 'long' || this.field.type === 'decimal'
      }
    }
  }
</script>
