<template>
  <fieldset :id="field.id + '-fs'" :class="{ 'required-field': isRequired, 'not-required': !required }" v-show="isVisible">

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
  fieldset.required-field label.field-label::after {
    content: ' *';
  }

  /*
   * use a second class to remove an asterisk if a
   * another field controls the required state
   */
  .not-required label::after {
    content: ''
  }
</style>

<script>
  import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
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
      /*
       * Compute visibility to:
       * 1) prevent the visible function to be called many times
       * 2) only re-run the function when the data involved changes
       */
      isValid: function () {
        return this.field.validate(this.formData)
      },
      /*
       * Compute required value to:
       * 1) prevent the required function to be called many times
       * 2) work if the required state is dependant on another field
       * 3) properly show / hide asterisk for required fields
       * 4) only re-run the function when the data involved changes
       */
      isRequired: function () {
        return this.field.required(this.formData)
      },
      /*
       * Compute visibility to:
       * 1) prevent the visible function to be called many times
       * 2) only re-run the function when the data involved changes
       */
      isVisible: function () {
        return (this.showOptionalFields || this.required) && this.field.visible(this.formData)
      }
    },
    components: {
      CheckboxFieldComponent,
      MultiSelectFieldComponent,
      RadioFieldComponent,
      SingleSelectFieldComponent,
      TextAreaFieldComponent,
      TypedFieldComponent
    }
  }
</script>
