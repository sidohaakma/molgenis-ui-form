<template>
  <validate :state="state" :custom="{'validate': isValid}" v-if="options.length > 0">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div v-for="(option, index) in options" class="form-check" :aria-describedby="field.id + '-description'">
        <!-- Hardcode input type to prevent compile time errors with dynamic value + v-model on same input  -->
        <input
          :id="field.id + '-' + index"
          v-model="localValue"
          :value="option.value"
          type="checkbox"
          :name="field.id"
          class="form-check-input"
          :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}"
          :required="isRequired"
          :disabled="field.disabled">
        <label :for="field.id + '-' + index" class="form-check-label">{{ option.label }}</label>
      </div>

      <button class="select-all btn btn-link btn-sm" @click="selectAll" type="button"><i>Select all</i></button>
      <button class="deselect-all btn btn-link btn-sm" @click="deSelectAll" type="button"><i>Deselect all</i></button>

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
    name: 'CheckboxFieldComponent',
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
      isValid: {
        type: Boolean,
        default: true
      },
      isRequired: {
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
    methods: {
      selectAll () {
        this.localValue = this.options.map(option => option.id)
        this.state.$touched = true
      },
      deSelectAll () {
        this.localValue = []
        this.state.$touched = true
      }
    },
    created () {
      this.field.options().then(response => {
        this.options = response
      })
    }
  }
</script>
