<template>
  <validate :state="state" :custom="{'validators': validators}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <input :id="field.id"
             v-model="localValue"
             :type="field.type"
             :name="field.id"
             class="form-control form-control-lg"
             :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}"
             :aria-describedby="field.id + '-description'"
             :required="field.required"
             :disabled="field.disabled">

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" class="form-control-feedback">
        <div slot="required">This field is required</div>
        <div slot="validators">{{ validationMessage }}</div>
      </field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'

  export default {
    name: 'TextFieldComponent',
    props: ['value', 'field', 'state'],
    mixins: [VueForm],
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        validationMessage: ''
      }
    },
    methods: {
      validators () {
        let valid = true
        this.field.validators.forEach(validator => {
          const result = validator(this.localValue)
          this.validationMessage = result.message
          valid = result.valid
        })
        return valid
      }
    },
    watch: {
      localValue (value) {
        // Emit value changes to the parent (form)
        this.$emit('input', value)
      }
    }
  }
</script>
