<template>
  <validate :state="state" :custom="{'validate': isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>
    </div>

    <div class="form-group">
      <div class="custom-file">
        <label class="custom-file-label" :for="field.id">
          {{ label }}
        </label>

        <input
          :id="field.id"
          :name="field.id"
          :required="isRequired"
          class="custom-file-input"
          type="file" @change="handleFileChange"/>
      </div>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" :state="state" show="$touched || $submitted" class="form-control-feedback">
        <div class="invalid-message" slot="required">This field is required</div>
        <div class="invalid-message" slot="validate">Validation failed</div>
      </field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import { FormField } from '../../flow.types'

  export default {
    name: 'FileFieldComponent',
    props: {
      value: {
        type: [File, String],
        required: false
      },
      field: {
        type: FormField,
        required: true
      },
      state: {
        type: Object,
        required: false
      },
      isValid: {
        type: Boolean,
        default: true
      },
      isRequired: {
        type: Boolean,
        default: false
      }
    },
    mixins: [VueForm],
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value
      }
    },
    methods: {
      handleFileChange (e) {
        // Whenever the file changes, emit the 'input' event with the file data.
        this.$emit('input', e.target.files[0])

        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }
    },
    computed: {
      label: function () {
        return typeof this.value === 'string' ? this.value
          : this.value instanceof Blob ? this.value.name : ''
      }
    }
  }
</script>
