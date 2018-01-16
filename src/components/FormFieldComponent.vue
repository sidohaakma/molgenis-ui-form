<template>
  <fieldset :id="field.id + '-fs'" v-show="isVisible(field)" :class="{ 'required-field': isRequired(field) }">

    <!-- Render checkbox field -->
    <template v-if="field.type === 'checkbox'">
      <checkbox-field-component
        v-model="formData[field.id]"
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
          :formData="formData"
          :field="child"
          :state="state"
          :level="level + 1"
          :showOptionalFields="showOptionalFields"
          :key="child.id"
          :isRequired="isRequired"
          @dataChange="onDataChange">
        </form-field-component>
      </div>
    </template>

    <!-- Render multi select field -->
    <template v-else-if="field.type === 'multi-select'">
      <multi-select-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </multi-select-field-component>
    </template>

    <!-- Render radio field -->
    <template v-else-if="field.type === 'radio'">
      <radio-field-component
        v-model="formData[field.id]"
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
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :isRequired="isRequired"
        :validate="validate"
        @dataChange="onDataChange">
      </single-select-field-component>
    </template>

    <!-- Render text area field -->
    <template v-else-if="field.type === 'text-area'">
      <text-area-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </text-area-field-component>
    </template>

    <template v-else-if="field.type === 'date'">
      <date-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </date-field-component>
    </template>

    <!-- Render email, url, password, number, and text fields -->
    <template v-else>
      <typed-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </typed-field-component>
    </template>
  </fieldset>
</template>

<style>
  .required-field label::after {
    content: ' *';
  }
</style>

<script>
  import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
  import MultiSelectFieldComponent from './field-types/MultiSelectFieldComponent'
  import DateFieldComponent from './field-types/DateFieldComponent'
  import RadioFieldComponent from './field-types/RadioFieldComponent'
  import SingleSelectFieldComponent from './field-types/SingleSelectFieldComponent'
  import TextAreaFieldComponent from './field-types/TextAreaFieldComponent'
  import TypedFieldComponent from './field-types/TypedFieldComponent'
  import { FormField } from '../flow.types'

  export default {
    name: 'FormFieldComponent',
    props: {
      formData: {
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
      validate () {
        return this.field.validate(this.formData)
      },
      isVisible () {
        return (this.showOptionalFields || this.isRequired(this.field)) && this.field.visible(this.formData)
      },
      isRequired () {
        return this.field.required(this.formData)
      }
    },
    components: {
      CheckboxFieldComponent,
      MultiSelectFieldComponent,
      RadioFieldComponent,
      SingleSelectFieldComponent,
      TextAreaFieldComponent,
      TypedFieldComponent,
      DateFieldComponent
    }
  }
</script>
