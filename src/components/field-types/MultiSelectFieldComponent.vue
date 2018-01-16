<template>
  <validate :state="state" :custom="{'validate': valid}" v-if="options.length > 0">
    <div class="form-group">
      <label class="field-label" :for="field.id">{{ field.label }}</label>
      <select
        :id="field.id"
        v-model="localValue"
        :name="field.id"
        :required="required"
        multiple
        class="form-control">
      <option v-for="option in options" :value="option.value">
          {{ option.value }}
        </option>
      </select>

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

  import { FormField } from '../../flow.types'

  export default {
    name: 'MultiSelectFieldComponent',
    mixins: [VueForm],
    props: {
      value: {
        type: Array,
        required: false,
        default: () => []
      },
      field: {
        type: FormField,
        required: true
      },
      state: {
        type: Object,
        required: false
      },
      valid: {
        type: Boolean,
        default: true
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        options: []
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
    },
    created () {
      this.field.options().then(response => {
        this.options = response
      })
    }
  }
</script>
