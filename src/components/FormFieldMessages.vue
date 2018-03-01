<template>
  <field-messages :name="fieldId" :state="fieldState" show="$touched || $submitted" class="form-control-feedback">
    <div class="invalid-message" slot="required">This field is required</div>
    <div class="invalid-message" slot="validate">Validation failed</div>
    <div v-if="type === 'number'" class="invalid-message" slot="number">Not a valid number</div>
    <div v-if="type === 'url'" class="invalid-message" slot="url">Not a valid URL</div>
    <div v-if="type === 'email'" class="invalid-message" slot="email">Not a valid email</div>
  </field-messages>
</template>

<script>
  import VueForm from 'vue-form'
  import { HtmlFieldType } from '../flow.types'

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
    }
  }
</script>
