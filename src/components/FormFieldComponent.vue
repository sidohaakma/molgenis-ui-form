<template>
  <fieldset :id="field.id + '-fs'">

    <!-- Render checkbox field -->
    <template v-if="field.type === 'checkbox'">
      <checkbox-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
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
          :validate="validate"
          :level="level + 1"
          :key="child.id">
        </form-field-component>
      </div>
    </template>

    <!-- Render multi select field -->
    <template v-else-if="field.type === 'multi-select'">
      <multi-select-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        @dataChange="onDataChange">
      </multi-select-field-component>
    </template>

    <!-- Render radio field -->
    <template v-else-if="field.type === 'radio'">
      <radio-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
        @dataChange="onDataChange">
      </radio-field-component>
    </template>

    <!-- Render text area field -->
    <template v-else-if="field.type === 'text-area'">
      <text-area-field-component
        v-model="data[field.id]"
        :field="field"
        :state="state[field.id]"
        :validate="validate"
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
        @dataChange="onDataChange">
      </typed-field-component>
    </template>
  </fieldset>
</template>

<script>
  import CheckboxFieldComponent from './field-types/CheckboxFieldComponent'
  import MultiSelectFieldComponent from './field-types/MultiSelectFieldComponent'
  import RadioFieldComponent from './field-types/RadioFieldComponent'
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
      validate: {
        type: Function,
        required: true
      },
      level: {
        type: Number,
        required: false,
        default: 0
      }
    },
    methods: {
      onDataChange () {
        this.$emit('dataChange')
      }
    },
    components: {
      CheckboxFieldComponent,
      MultiSelectFieldComponent,
      RadioFieldComponent,
      TextAreaFieldComponent,
      TypedFieldComponent
    }
  }
</script>
