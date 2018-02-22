<template>
  <fieldset :id="field.id + '-fs'" :class="{ 'required-field': isRequired }" v-show="isVisible">

    <!-- Render checkbox field -->
    <template v-if="field.type === 'checkbox'">
      <checkbox-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="formState[field.id]"
        :isValid="isValid"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </checkbox-field-component>
    </template>

    <!-- Render code editor field-->
    <template v-else-if="field.type === 'html' || field.type === 'script'">
      <code-editor-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="formState[field.id]"
        :isValid="isValid"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </code-editor-field-component>
    </template>

    <!-- Render file field -->
    <template v-else-if="field.type === 'file'">
      <file-field-component
        v-model="formData[field.id]"
        :field="field"
        :fieldState="formState[field.id]"
        :isValid="isValid"
        :isRequired="isRequired"
        @dataChange="onDataChange">
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
        :fieldState="formState[field.id]"
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
        :fieldState="formState[field.id]"
        :isValid="isValid"
        :isRequired="isRequired"
        @dataChange="onDataChange">
      </radio-field-component>
    </template>

    <!-- Render single select field -->
    <template v-else-if="field.type === 'single-select'">
      <single-select-field-component
        :eventBus="eventBus"
        v-model="formData[field.id]"
        :field="field"
        :fieldState="formState[field.id]"
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
        :fieldState="formState[field.id]"
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
        :fieldState="formState[field.id]"
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
        :fieldState="formState[field.id]"
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
  import CodeEditorFieldComponent from './field-types/CodeEditorFieldComponent'
  import DateFieldComponent from './field-types/DateFieldComponent'
  import FileFieldComponent from './field-types/FileFieldComponent'
  import MultiSelectFieldComponent from './field-types/MultiSelectFieldComponent'
  import RadioFieldComponent from './field-types/RadioFieldComponent'
  import SingleSelectFieldComponent from './field-types/SingleSelectFieldComponent'
  import TextAreaFieldComponent from './field-types/TextAreaFieldComponent'
  import TypedFieldComponent from './field-types/TypedFieldComponent'

  import { FormField } from '../flow.types'
  import isCompoundVisible from '../util/helpers/isCompoundVisible'

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
      }
    },
    methods: {
      onDataChange () {
        this.$emit('dataChange')
      }
    },
    computed: {
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
