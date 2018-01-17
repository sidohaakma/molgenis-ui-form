<template>
  <validate :state="state" :custom="{'validate': validate(field)}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <textarea
        :id="field.id"
        v-model="localValue"
        :name="field.id"
        class="form-control form-control-lg"
        :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}"
        :aria-describedby="field.id + '-description'"
        :required="isRequired(field)"
        :disabled="field.disabled">
      </textarea>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" show="$touched || $submitted || $dirty" class="form-control-feedback">
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
    name: 'TextAreaFieldComponent',
    props: {
      value: {
        type: String,
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
      validate: {
        type: Function,
        required: true
      },
      isRequired: {
        type: Function,
        required: true
      }
    },
    mixins: [VueForm],
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value
      }
    },
    watch: {
      localValue (value) {
        // Emit value changes to the parent (form)
        this.$emit('input', value)
        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }
    }
  }
</script>
