<template>
  <fieldset :id="field.id + '-fs'" :class="{ 'required-field': isRequired }" v-show="isVisible">

    <!-- Render checkbox field -->
    <template v-if="field.type === 'checkbox'">
      <checkbox-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :isValid="isValid"
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
        :isValid="isValid"
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
        :isValid="isValid"
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
        :isValid="isValid"
        @dataChange="onDataChange">
      </single-select-field-component>
    </template>

    <!-- Render text area field -->
    <template v-else-if="field.type === 'text-area'">
      <text-area-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :isValid="isValid"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </text-area-field-component>
    </template>

    <!-- Render date field -->
    <template v-else-if="field.type === 'date' || field.type === 'date-time'">
      <date-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :isValid="isValid"
        :isRequired="isRequired"
        @dataChange="onDataChange"
        :isTimeIncluded="field.type === 'date-time'">
      </date-field-component>
    </template>

    <!-- Render email, url, password, number, and text fields -->
    <template v-else>
      <typed-field-component
        v-model="formData[field.id]"
        :field="field"
        :state="state[field.id]"
        :isValid="isValid"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </typed-field-component>
    </template>
  </fieldset>
</template>

<style>
  fieldset.required-field > div > div.form-group > label::after {
    content: ' *';
  }
</style>

<script>
  import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
  import DateFieldComponent from './field-types/DateFieldComponent'
  import MultiSelectFieldComponent from './field-types/MultiSelectFieldComponent'
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
      }
    },
    computed: {
      isValid: function () {
        return this.field.validate(this.formData)
      },
      isRequired: function () {
        return this.field.required(this.formData)
      },
      isVisible: function () {
        return (this.showOptionalFields || this.isRequired) && this.field.visible(this.formData)
      }
    },
    components: {
      CheckboxFieldComponent,
      DateFieldComponent,
      MultiSelectFieldComponent,
      RadioFieldComponent,
      SingleSelectFieldComponent,
      TextAreaFieldComponent,
      TypedFieldComponent
    }
  }
</script>
