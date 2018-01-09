<template>
  <div v-show="isShown()">

    <!-- Render checkbox field -->
    <checkbox-field-component
      v-if="field.type === 'checkbox'"
      v-model="data[field.id]"
      :field="field"
      :state="state[field.id]"
      :validate="validate"
      @dataChange="onDataChange">
    </checkbox-field-component>

    <!-- Render radio field -->
    <radio-field-component
      v-else-if="field.type === 'radio'"
      v-model="data[field.id]"
      :field="field"
      :state="state[field.id]"
      :validate="validate"
      @dataChange="onDataChange">
    </radio-field-component>

    <!-- Render text area field -->
    <text-area-field-component
      v-else-if="field.type === 'text-area'"
      v-model="data[field.id]"
      :field="field"
      :state="state[field.id]"
      :validate="validate"
      @dataChange="onDataChange">
    </text-area-field-component>

    <!-- Render email, url, password, number, and text fields -->
    <typed-field-component
      v-else
      v-model="data[field.id]"
      :field="field"
      :state="state[field.id]"
      :validate="validate"
      @dataChange="onDataChange">
    </typed-field-component>

  </div>
</template>

<script>
  // @flow
  import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
  import RadioFieldComponent from './field-types/RadioFieldComponent'
  import TextAreaFieldComponent from './field-types/TextAreaFieldComponent'
  import TypedFieldComponent from './field-types/TypedFieldComponent'

  export default {
    name: 'FormFieldComponent',
    props: ['data', 'field', 'state', 'validate'],
    methods: {
      onDataChange () {
        this.$emit('dataChange')
      },
      isShown () {
        return this.field.visible(this.data)
      }
    },
    components: {
      CheckboxFieldComponent,
      RadioFieldComponent,
      TextAreaFieldComponent,
      TypedFieldComponent
    }
  }
</script>
