<template>
  <validate
    :class="{'mlg-was-validated': wasValidated}"
    :state="fieldState"
    :custom="{validate: isValid, integer: isValidInt, long: isValidLong, unique: isUnique}"
    :debounce="inputDebounceTime">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <input
        :id="field.id"
        v-model="localValue"
        :type="inputType"
        :min="min"
        :max="max"
        :maxlength="maxlength"
        :name="field.id"
        class="form-control"
        :class="{ 'is-invalid' : wasValidated && fieldState.$invalid}"
        :aria-describedby="field.id + '-description'"
        :required="isRequired"
        :disabled="field.disabled"
        :step="stepSize">

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :type="field.type" :min="min" :max="max" :maxlength="maxlength" :field-state="fieldState">
      </form-field-messages>
    </div>
  </validate>
</template>

<style scoped>
  .mlg-was-validated .form-control:invalid {
    border-color: #dc3545;
  }
  .mlg-was-validated .form-control:invalid:focus {
    box-shadow: 0 0 0 .2rem rgba(220,53,69,.25);
  }
</style>

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
    localValue (value) {
      let typedValue = this.isNumberField && !Number.isNaN(Number(value)) ? this.toNumber(value)
        : value

      this.$emit('input', typedValue)
    }
  },
  methods: {
    toNumber (input) {
      return input !== '' ? Number(input) : null
    }
  },
  computed: {
    wasValidated () {
      return this.fieldState && (this.fieldState.$touched || this.fieldState.$submitted || this.fieldState.$dirty)
    },
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
      return (this.field.type === 'integer' || this.field.type === 'long') ? 1 : 1e-10
    },
    maxlength () {
      switch (this.field.type) {
        case 'text':
        case 'url':
        case 'email':
          return 255
        default:
          return null
      }
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
