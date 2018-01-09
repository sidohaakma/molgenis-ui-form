<template>
  <vue-form :id="id" :state="state" @submit.prevent="hooks.onSubmit(data)" @reset.prevent="hooks.onCancel">
    <template v-for="field in schema.fields">
      <form-field-component
        :data="data"
        :field="field"
        :state="state"
        @dataChange="hooks.onValueChanged(data)">
      </form-field-component>
    </template>
  </vue-form>
</template>

<script>
  import VueForm from 'vue-form'
  import FormFieldComponent from './FormFieldComponent'
  import { isValidSchema } from '../util/SchemaService'
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
        validator: isValidSchema
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
    components: {
      FormFieldComponent
    }
  }
</script>
