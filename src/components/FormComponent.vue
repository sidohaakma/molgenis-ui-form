<template>
  <vue-form :id="id" :state="state">
    <fieldset v-for="field in schema.fields">
      <text-field-component v-model="data[field.id]" :field="field" :state="state"></text-field-component>
    </fieldset>
  </vue-form>
</template>

<script>
  import VueForm from 'vue-form'
  import TextFieldComponent from './field-types/TextFieldComponent'

  export default {
    name: 'FormComponent',
    mixins: [VueForm],
    components: {
      TextFieldComponent
    },
    props: {
      id: {
        type: String,
        required: true
      },
      schema: {
        type: Object,
        required: true
      },
      data: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    data () {
      return {
        state: {}
      }
    }
  }
</script>
