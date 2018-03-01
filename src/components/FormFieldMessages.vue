<template>
  <field-messages :name="fieldId" :state="fieldState" show="$touched || $submitted" class="form-control-feedback">
    <div class="invalid-message" slot="required">{{ requiredFieldMsg }}</div>
    <div class="invalid-message" slot="validate">{{ validationFailedMsg }}</div>
    <div v-if="type === 'number'" class="invalid-message" slot="number">{{ notAValidNumberMsg }}</div>
    <div v-if="type === 'url'" class="invalid-message" slot="url">{{ notAValidUrlMsg }}</div>
    <div v-if="type === 'email'" class="invalid-message" slot="email">{{ notAValidEmailMsg }}</div>
  </field-messages>
</template>

<script>
  import VueForm from 'vue-form'
  import { HtmlFieldType } from '../flow.types'

  const defaultMessages = {
    form_required_field: 'This field is required',
    form_validation_failed: 'Validation failed',
    form_not_a_valid_number: 'Not a valid number',
    form_not_a_valid_url: 'Not a valid URL',
    form_not_a_valid_email: 'Not a valid email'
  }

  export default {
    name: 'FormFieldMessages',
    mixins: [VueForm],
    props: {
      fieldId: {
        type: [String, Number],
        required: true
      },
      type: {
        type: HtmlFieldType,
        required: true
      },
      fieldState: {
        type: Object
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

      this.requiredFieldMsg = this.getLocalizedMessage('form_required_field')
      this.validationFailedMsg = this.getLocalizedMessage('form_validation_failed')
      this.notAValidNumberMsg = this.getLocalizedMessage('form_not_a_valid_number')
      this.notAValidUrlMsg = this.getLocalizedMessage('form_not_a_valid_url')
      this.notAValidEmailMsg = this.getLocalizedMessage('form_not_a_valid_email')
    }
  }
</script>
