<template>
  <validate :state="fieldState" :custom="{validate: isValid, integer: isValidInt, long: isValidLong, unique: isUnique}" :debounce="inputDebounceTime">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <input
        :id="field.id"
        v-model="localValue"
        :type="inputType"
        :min="min"
        :max="max"
        :name="field.id"
        class="form-control"
        :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
        :aria-describedby="field.id + '-description'"
        :required="isRequired"
        :disabled="field.disabled"
        :step="stepSize"
        v-on:keyup="onKeyUp">

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :type="field.type" :min="min" :max="max" :field-state="fieldState">
      </form-field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import {FormField} from '../../flow.types'
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
      localValue (value) {
        let typedValue = this.isNumberField && !Number.isNaN(Number(value)) ? this.toNumber(value)
          : value

        this.$emit('input', typedValue)
      }
    },
    methods: {
      toNumber (input) {
        return input !== '' ? Number(input) : null
      },
      onKeyUp (event) {
        // In case of numeric check validity, if invalid place back the old value
        if (this.isNumberField && event.target.validity && event.target.validity.badInput) {
          this.localValue = this.value
        }
      }
    },
    computed: {
      min () {
        if (this.field.range && this.field.range.hasOwnProperty('min')) {
          return this.field.range.min
        }
        if (this.field.type === 'integer') {
          return MIN_JAVA_INT
        }
        if (this.field.type === 'long') {
          return Number.MIN_SAFE_INTEGER
        }
        return null
      },
      max () {
        if (this.field.range && this.field.range.hasOwnProperty('max')) {
          return this.field.range.max
        }
        if (this.field.type === 'integer') {
          return MAX_JAVA_INT
        }
        if (this.field.type === 'long') {
          return Number.MAX_SAFE_INTEGER
        }
        return null
      },
      stepSize () {
        // Conditionally add step size, return false to omit step attribute
        return (this.field.type === 'integer' || this.field.type === 'long') ? 1 : false
      },
      inputType () {
        return this.isNumberField ? 'number' : this.field.type
      },
      isValidInt () {
        if (this.field.type !== 'integer' || this.localValue === '') {
          return true
        }

        const numberValue = Number(this.localValue)
        if (Number.isNaN(this.localValue)) {
          return false
        }
        return Number.isSafeInteger(numberValue) && numberValue <= MAX_JAVA_INT && numberValue >= MIN_JAVA_INT
      },
      isValidLong () {
        if (this.field.type !== 'long' || this.localValue === '') {
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
