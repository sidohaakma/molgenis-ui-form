<template>
  <field-messages :name="fieldId" :state="fieldState" show="$touched || $submitted" class="form-control-feedback">
    <div class="invalid-message" slot="required">{{ requiredFieldMsg }}</div>
    <div class="invalid-message" slot="validate">{{ validationFailedMsg }}</div>
    <div class="invalid-message" slot="number">{{ notAValidNumberMsg }}</div>
    <div class="invalid-message" slot="url">{{ notAValidUrlMsg }}</div>
    <div class="invalid-message" slot="email">{{ notAValidEmailMsg }}</div>
    <div v-if="range" class="invalid-message" slot="range">
      <span v-if="range.hasOwnProperty('min') && range.hasOwnProperty('max')">{{ notWithInRangeMsg }} ({{ range.min }} - {{ range.max }})</span>
      <span v-else-if="range.hasOwnProperty('min') && !range.hasOwnProperty('max')">{{ belowMinValueMsg }} {{ range.min }} </span>
      <span v-else>{{ aboveMaxValueMsg }} {{ range.max }} </span>
    </div>
  </field-messages>
</template>

<script>
  import VueForm from 'vue-form'

  const defaultMessages = {
    'ui-form:form_required_field': 'This field is required',
    'ui-form:form_validation_failed': 'Validation failed',
    'ui-form:form_not_a_valid_number': 'Not a valid number',
    'ui-form:form_not_a_valid_url': 'Not a valid URL',
    'ui-form:form_not_a_valid_email': 'Not a valid email',
    'ui-form:form_not_within_range': 'Value is outside of range',
    'ui-form:form_below_min_value': 'Value is below allowed value',
    'ui-form:form_above_max_value': 'Value is above allowed value'
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
      range: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        localizedMessages: {}
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
      this.notAValidNumberMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_number')
      this.notAValidUrlMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_url')
      this.notAValidEmailMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_email')

      this.notWithInRangeMsg = this.getLocalizedMessage('ui-form:form_not_within_range')
      this.belowMinValueMsg = this.getLocalizedMessage('ui-form:form_below_min_value')
      this.aboveMaxValueMsg = this.getLocalizedMessage('ui-form:form_above_max_value')
    }
  }
</script>
