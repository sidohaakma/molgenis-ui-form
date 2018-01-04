<template>
  <validate :state="state" :custom="{'validate': validate(field)}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div v-for="(option, index) in field.options()" class="form-check" :aria-describedby="field.id + '-description'">
        <label :for="option.id" class="form-check-label">
          <!-- Hardcode input type to prevent compile time errors with dynamic value + v-model on same input  -->
          <input
            :id="field.id + '-' + index"
            v-model="localValue"
            :value="option.value"
            type="radio"
            :name="field.id"
            class="form-check-input"
            :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}"
            :required="field.required"
            :disabled="field.disabled">
          {{ option.label }}
        </label>
      </div>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" show="$touched || $submitted" class="form-control-feedback">
        <div slot="required">This field is required</div>
        <div slot="validate">Validation failed</div>
      </field-messages>

    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'

  export default {
    name: 'RadioFieldComponent',
    props: ['value', 'field', 'state', 'validate'],
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
