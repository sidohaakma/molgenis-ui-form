<template>
  <validate :state="fieldState" :custom="{'validate': isValid}">
    <!-- add hidden input to serve a holder for file input ( input with type file may not contain a value -->
    <input
      :id="field.id"
      :name="field.id"
      v-model="localValue"
      v-show="false"
    />
    <div class="form-group">
      <label
        :for="field.id"
        :class="{ 'is-invalid' : this.fieldState && this.fieldState.$invalid && (this.fieldState.$touched || this.fieldState.$submitted || this.fieldState.$dirty)}"
      >
        {{ field.label }}
      </label>
      <div class="custom-file">
        <label class="custom-file-label" :for="field.id">
          {{ label }}
        </label>

        <input
          :required="isRequired"
          class="custom-file-input"
          type="file"
          @change="handleFileChange"/>
      </div>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :field-state="fieldState">
      </form-field-messages>

    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import {FormField} from '../../flow.types'
  import FormFieldMessages from '../FormFieldMessages'

  export default {
    name: 'FileFieldComponent',
    components: {
      FormFieldMessages
    },
    props: {
      value: {
        type: [File, String, Promise],
        required: false
      },
      field: {
        type: FormField,
        required: true
      },
      fieldState: {
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
    data() {
      return {
        // Store a local value to prevent changing the parent state

        localValue: this.value
      }
    },
    methods: {
      handleFileChange(e) {
        // Whenever the file changes, emit the 'input' event with the file data.
        this.localValue = e.target.files[0]
        this.$emit('input', this.localValue)

        // Emit value changes to trigger the onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
        this.fieldState.$dirty = true
        this.fieldState.$pristine = false
        this.fieldState.$touched = true
        this.fieldState.$untouched = false
      }
    },
    computed: {
      label() {
        let labelValue = ''
        if (typeof this.value === 'string') {
          labelValue = this.value
        } else if (typeof this.value === 'function') {
          this.value.then(function (value) {
            labelValue = value
            console.log(value)
          }).catch(function (error) {
            console.error(error)
          })
        } else if (this.value instanceof Blob) {
          labelValue = this.value.name
        }
        return labelValue
      }
    }
  }
</script>
