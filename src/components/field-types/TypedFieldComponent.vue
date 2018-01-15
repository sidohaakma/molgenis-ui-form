<template>
  <validate :state="state" :custom="{'validate': validate(field)}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <input
        :id="field.id"
        v-model="localValue"
        :type="field.type"
        :name="field.id"
        class="form-control form-control-lg"
        :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}"
        :aria-describedby="field.id + '-description'"
        :required="isRequired(field)"
        :disabled="field.disabled">

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" :state="state" show="$touched || $submitted" class="form-control-feedback">
        <div class="invalid-message" slot="required">This field is required</div>
        <div class="invalid-message" slot="number">Not a valid number</div>
        <div class="invalid-message" slot="url">Not a valid URL</div>
        <div class="invalid-message" slot="email">Not a valid email</div>
        <div class="invalid-message" slot="validate">Validation failed</div>
      </field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'

  export default {
    name: 'TypedFieldComponent',
    props: {
      value: {
        // The value representing a Number or String
        type: Object,
        required: false
      },
      field: {
        type: Object,
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
