<template>
  <vue-form :id="id" :state="state">
    <fieldset v-for="field in schema.fields">

      <!-- Render checkbox field -->
      <template v-if="field.type === 'checkbox'">
        <checkbox-field-component
          v-model="data[field.id]"
          :field="field"
          :state="state[field.id]"
          :validate="validate">
        </checkbox-field-component>
      </template>

      <!-- Render radio field -->
      <template v-else-if="field.type === 'radio'">
        <radio-field-component
          v-model="data[field.id]"
          :field="field"
          :state="state[field.id]"
          :validate="validate">
        </radio-field-component>
      </template>

      <!-- Render text fields -->
      <template v-else-if="field.type === 'text'">
        <text-field-component
          v-model="data[field.id]"
          :field="field"
          :state="state[field.id]"
          :validate="validate">
        </text-field-component>
      </template>

    </fieldset>
  </vue-form>
</template>

<script>
  import VueForm from 'vue-form'

  import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
  import RadioFieldComponent from './field-types/RadioFieldComponent'
  import TextFieldComponent from './field-types/TextFieldComponent'

  export default {
    name: 'FormComponent',
    mixins: [VueForm],
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
    },
    methods: {
      validate (field) {
        let valid = true
        const formData = this.data
        field.validators.forEach(validator => {
          // validate with all the data in the form
          valid = validator(formData)
        })
        return valid
      }
    },
    components: {
      CheckboxFieldComponent,
      RadioFieldComponent,
      TextFieldComponent
    }
  }
</script>
