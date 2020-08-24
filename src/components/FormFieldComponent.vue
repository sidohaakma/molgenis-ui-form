<template>
  <fieldset :id="field.id + '-fs'" :class="{ 'required-field': isRequired }" v-show="isVisible">

    <!-- Render checkbox field -->
    <template v-if="field.type === 'checkbox'">
      <checkbox-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired">
      </checkbox-field-component>
    </template>

    <!-- Render code editor field-->
    <template v-else-if="field.type === 'html' || field.type === 'script'">
      <code-editor-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired">
      </code-editor-field-component>
    </template>

    <!-- Render file field -->
    <template v-else-if="field.type === 'file'">
      <file-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired">
      </file-field-component>
    </template>

    <!-- Render field groups + child fields, nesting subsequent groups with padding -->
    <template v-else-if="field.type === 'field-group'">
      <legend>{{ field.label }}</legend>
      <small>{{field.description}}</small>

      <hr>

      <div :class="'pl-' + ((level + 1) * 2)">
        <form-field-component
          v-for="child in field.children"
          :eventBus="eventBus"
          :formData="formData"
          :field="child"
          :formState="formState"
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
        :eventBus="eventBus"
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired"
        :allowAddingOptions="formComponentOptions.allowAddingOptions"
        :noOptionsMessage="noOptionsMessage">
      </multi-select-field-component>
    </template>

    <!-- Render radio field -->
    <template v-else-if="field.type === 'radio'">
      <radio-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired"
        :isUnique="isUnique">
      </radio-field-component>
    </template>

    <!-- Render single select field -->
    <template v-else-if="field.type === 'single-select'">
      <single-select-field-component
        :eventBus="eventBus"
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isRequired="isRequired"
        :isValid="isValid"
        :allowAddingOptions="formComponentOptions.allowAddingOptions"
        :noOptionsMessage="noOptionsMessage">
      </single-select-field-component>
    </template>

    <!-- Render text area field -->
    <template v-else-if="field.type === 'text-area'">
      <text-area-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired"
        :inputDebounceTime="formComponentOptions.inputDebounceTime">
      </text-area-field-component>
    </template>

    <!-- Render date field -->
    <template v-else-if="field.type === 'date' || field.type === 'date-time'">
      <date-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired"
        :isTimeIncluded="field.type === 'date-time'">
      </date-field-component>
    </template>

    <!-- Render email, hyperlink, password, integer, long, decimal, and text fields -->
    <template v-else>
      <typed-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="fieldState"
        :isValid="isValid"
        :isRequired="isRequired"
        :isUnique="isUnique"
        :inputDebounceTime="formComponentOptions.inputDebounceTime">
      </typed-field-component>
    </template>
  </fieldset>
</template>

<style>
  /* Adds asterisk to required fields. The \a0 is a non-breaking space */
  fieldset.required-field > div > div.form-group > label::after {
    content: '\a0*';
  }

  /*  Styling to have v-select look like bootstrap field */
  .mg-ui-form-field .v-select .dropdown-toggle {
    background-color: white; /* $input-bg */
    padding-bottom: 0;
    min-height: calc(2.25rem + 2px);
  }

  .mg-ui-form-field .v-select.disabled .dropdown-toggle {
    background-color: #f8f8f8;
  }

  .mg-ui-form-field .mg-select-add-btn {
    margin-left: 0.5rem;
  }

  .mg-ui-form-field .v-select .vs__selected-options {
    padding-left: 0.75rem;
  }

  .mg-ui-form-field .dropdown.v-select.form-control.searchable {
    padding: 0;
    border: 0;
  }

  .mg-ui-form-field .v-select .selected-tag {
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
  }

  .mg-ui-form-field .v-select.single .vs__selected-options .selected-tag {
    padding-left: 0;
    margin-left: 0;
  }

  .mg-ui-form-field .v-select .vs__selected-options :first-child {
    margin-left: 0;
  }

  .mg-multi-select {
    height: auto;
  }

  /* fix to hide input[type=search] as webkit forces browser style */
  .v-select .dropdown-toggle input[type=search] {
    -webkit-appearance: textfield;
  }
</style>

<script>
import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
import CodeEditorFieldComponent from './field-types/CodeEditorFieldComponent'
import DateFieldComponent from './field-types/DateFieldComponent'
import FileFieldComponent from './field-types/FileFieldComponent'
import MultiSelectFieldComponent from './field-types/MultiSelectFieldComponent'
import RadioFieldComponent from './field-types/RadioFieldComponent'
import SingleSelectFieldComponent from './field-types/SingleSelectFieldComponent'
import TextAreaFieldComponent from './field-types/TextAreaFieldComponent'
import TypedFieldComponent from './field-types/TypedFieldComponent'

import { FormField, FormComponentOptions } from '../flow.types'
import isCompoundVisible from '../util/helpers/isCompoundVisible'

const defaultNoOptionsMessage = 'No options found for given search term.'

export default {
  name: 'FormFieldComponent',
  props: {
    eventBus: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      required: true
    },
    field: {
      type: FormField,
      required: true
    },
    formState: {
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
    },
    formComponentOptions: {
      type: FormComponentOptions,
      required: false,
      default: () => {
        return {
          inputDebounceTime: 500
        }
      }
    }
  },
  methods: {
    isUnique (value) {
      if (this.field.hasOwnProperty('unique')) {
        return this.field.unique(value, this.formData)
      }

      return true
    },
    onDataChange () {
      this.$emit('dataChange')
    }
  },
  computed: {
    fieldState () {
      return this.formState[this.field.id]
    },
    pending () {
      return this.fieldState && this.fieldState.$pending
    },
    isValid () {
      return this.field.validate(this.formData)
    },
    isRequired () {
      return this.field.required(this.formData)
    },
    isVisible () {
      if (this.field.type === 'field-group') {
        return isCompoundVisible(this.field, this.formData)
      }
      return (this.showOptionalFields || this.isRequired) && this.field.visible(this.formData)
    },
    noOptionsMessage () {
      const msgKey = 'form_no_options'
      const namespace = 'ui-form'

      if (this.$t) {
        const i18nMessage = this.$t(namespace + ':' + msgKey)
        if (i18nMessage !== msgKey) {
          return i18nMessage
        }
      }

      return defaultNoOptionsMessage
    }
  },
  watch: {
    pending (isPending) {
      if (!isPending) {
        // validation finished
        this.onDataChange()
      }
    }
  },
  components: {
    CheckboxFieldComponent,
    CodeEditorFieldComponent,
    DateFieldComponent,
    FileFieldComponent,
    MultiSelectFieldComponent,
    RadioFieldComponent,
    SingleSelectFieldComponent,
    TextAreaFieldComponent,
    TypedFieldComponent
  }
}
</script>
