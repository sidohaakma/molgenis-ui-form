<template>
  <fieldset :id="field.id + '-fs'" v-show="isVisible(field)">

    <!-- Render checkbox field -->
    <template v-if="field.type === 'checkbox'">
      <checkbox-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </checkbox-field-component>
    </template>

    <!-- Render field groups + child fields, nesting subsequent groups with padding -->
    <template v-else-if="field.type === 'field-group'">
      <legend>{{ field.label }}</legend>
      <small>{{field.description}} </small>

      <hr>

      <div :class="'pl-' + ((level + 1) * 2)">
        <form-field-component
          v-for="child in field.children"
          :data="data"
          :field="child"
          :state="state"
          :level="level + 1"
          :showOptionalFields="showOptionalFields"
          :key="child.id"
          @dataChange="onDataChange">
        </form-field-component>
      </div>
    </template>

    <!-- Render radio field -->
    <template v-else-if="field.type === 'radio'">
      <radio-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </radio-field-component>
    </template>

    <!-- Render single select field -->
    <template v-else-if="field.type === 'single-select'">
      <single-select-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        @dataChange="onDataChange">
      </single-select-field-component>
    </template>

    <!-- Render text area field -->
    <template v-else-if="field.type === 'text-area'">
      <text-area-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </text-area-field-component>
    </template>

    <!-- Render email, url, password, number, and text fields -->
    <template v-else>
      <typed-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </typed-field-component>
    </template>
  </fieldset>
</template>

<script>
  import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
  import RadioFieldComponent from './field-types/RadioFieldComponent'
  import SingleSelectFieldComponent from './field-types/SingleSelectFieldComponent'
  import TextAreaFieldComponent from './field-types/TextAreaFieldComponent'
  import TypedFieldComponent from './field-types/TypedFieldComponent'

  import { FormField } from '../flow.types'

  export default {
    name: 'FormFieldComponent',
    props: {
      data: {
        type: Object,
        required: true
      },
      field: {
        type: FormField,
        required: true
      },
      state: {
        type: Object,
        required: true
      },
      level: {
        type: Number,
        required: false,
        default: 0
      },
      showOptionalFields: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      onDataChange () {
        this.$emit('dataChange')
      },
      // Can return more than only a boolean because of internationalized messages
      validate (field) {
        return field.validate(this.data)
      },
      isVisible (field) {
        return (this.showOptionalFields || this.isRequired(field)) && field.visible(this.data)
      },
      isRequired (field) {
        return field.required(this.data)
      }
    },
    components: {
      CheckboxFieldComponent,
      RadioFieldComponent,
      SingleSelectFieldComponent,
      TextAreaFieldComponent,
      TypedFieldComponent
    }
  }
</script>
