<template>
  <vue-form :id="id" :state="state" @submit.prevent="hooks.onSubmit(data)" @reset.prevent="hooks.onCancel">
    <template v-for="field in schema.fields">
      <form-field-component
        :data="data"
        :field="field"
        :state="state"
        :validate="validate"
        @dataChange="hooks.onValueChanged(data)">
      </form-field-component>
    </template>
  </vue-form>
</template>

<script>
  import VueForm from 'vue-form'
  import FormFieldComponent from './FormFieldComponent'
  import { FormHook } from '../flow.types'

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
        required: true,
        validator: (schema) => {
          const fieldIds = new Set()

          const notUnique = schema.fields.some(field => {
            return fieldIds.size === fieldIds.add(field.id).size
          })

          if (notUnique) {
            console.log('Identifiers for fields inside your schema must be unique!')
            return false
          }
          return true
        }
      },
      data: {
        type: Object,
        required: false,
        default: () => ({})
      },
      hooks: {
        type: FormHook,
        required: true
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
      FormFieldComponent
    }
  }
</script>
