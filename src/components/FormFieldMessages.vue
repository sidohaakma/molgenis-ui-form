<template>
  <field-messages :name="fieldId" :state="fieldState" show="$touched || $submitted || $dirty" class="form-control-feedback">
    <div class="invalid-feedback" slot="required">{{ requiredFieldMsg }}</div>
    <div class="invalid-feedback" slot="email">{{ notAValidEmailMsg }}</div>
    <div class="invalid-feedback" slot="url">{{ notAValidUrlMsg }}</div>
    <div class="invalid-feedback" slot="integer">{{ notAValidIntegerMsg }}</div>
    <div class="invalid-feedback" slot="long">{{ notAValidLongMsg }}</div>
    <div class="invalid-feedback" slot="number">{{ notAValidNumberMsg }}</div>
    <div class="invalid-feedback" slot="unique">{{ notUniqueMsg}}</div>
    <div class="invalid-feedback" slot="validate">{{ validationFailedMsg }}</div>
    <div class="invalid-feedback" slot="min">{{ minMessage }}</div>
    <div class="invalid-feedback" slot="max">{{ maxMessage }}</div>
    <div class="invalid-feedback" slot="maxlength">{{ maxlengthMsg }} {{ maxlength }}</div>
  </field-messages>
</template>

<style>
  .form-control-feedback .invalid-feedback {
    display: block;
  }
</style>

<script>
  import VueForm from 'vue-form'

  const defaultMessages = {
    'ui-form:form_required_field': 'This field is required',
    'ui-form:form_validation_failed': 'Validation failed',
    'ui-form:form_not_unique': 'Not a unique value',
    'ui-form:form_not_a_valid_number': 'Not a valid number',
    'ui-form:form_not_a_valid_integer': 'Not a valid integer value',
    'ui-form:form_not_a_valid_long': 'Not a valid long value',
    'ui-form:form_not_a_valid_url': 'Not a valid URL',
    'ui-form:form_not_a_valid_email': 'Not a valid email',
    'ui-form:form_not_within_range': 'Value is outside of range',
    'ui-form:form_below_min_value': 'Value is below allowed value',
    'ui-form:form_above_max_value': 'Value is above allowed value',
    'ui-form:form_maxlength_exceeded': 'Maximum length is'
  }

  export default {
    name: 'FormFieldMessages',
    mixins: [VueForm],
    props: {
      fieldId: {
        type: [String, Number],
        required: true
      },
      fieldState: {
        type: Object
      },
      min: {
        type: Number,
        required: false,
        default: null
      },
      max: {
        type: Number,
        required: false,
        default: null
      },
      maxlength: {
        type: Number,
        required: false,
        default: null
      }
    },
    data () {
      return {
        localizedMessages: {}
      }
    },
    computed: {
      minMaxMessage () {
        return `${this.notWithInRangeMsg} (${this.min} - ${this.max})`
      },
      minMessage () {
        return this.max !== null ? this.minMaxMessage : `${this.belowMinValueMsg} ${this.min}`
      },
      maxMessage () {
        return this.min !== null ? this.minMaxMessage : `${this.aboveMaxValueMsg} ${this.max}`
      }
    },
    methods: {
      getLocalizedMessage (msgKey) {
        return this.localizedMessages(msgKey)
      },
      getDefaultMessage (msgKey) {
        return defaultMessages[msgKey]
      }
    },
    created () {
      this.localizedMessages = this.$t || this.getDefaultMessage

      this.requiredFieldMsg = this.getLocalizedMessage('ui-form:form_required_field')
      this.validationFailedMsg = this.getLocalizedMessage('ui-form:form_validation_failed')
      this.notUniqueMsg = this.getLocalizedMessage('ui-form:form_not_unique')
      this.notAValidNumberMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_number')
      this.notAValidIntegerMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_integer')
      this.notAValidLongMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_long')
      this.notAValidUrlMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_url')
      this.notAValidEmailMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_email')

      this.notWithInRangeMsg = this.getLocalizedMessage('ui-form:form_not_within_range')
      this.belowMinValueMsg = this.getLocalizedMessage('ui-form:form_below_min_value')
      this.aboveMaxValueMsg = this.getLocalizedMessage('ui-form:form_above_max_value')
      this.maxlengthMsg = this.getLocalizedMessage('ui-form:form_maxlength_exceeded')
    }
  }
</script>
