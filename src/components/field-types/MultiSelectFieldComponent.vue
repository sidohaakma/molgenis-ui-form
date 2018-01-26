<template>
  <validate :state="fieldState" :custom="{'validate': isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div class="input-group">

        <v-select v-model="localValue"
                  class="form-control"
                  :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted) && fieldState.$invalid}"
                  :options="options"
                  :onSearch="fetchOptions"
                  :filterable="false"
                  :inputId="field.id"
                  :name="field.id"
                  :required="isRequired"
                  :disabled="field.disabled"
                  :multiple="true">

          <div slot="no-options">
            <small v-if="localValue">Option '{{ localValue }}' not found.</small>
          </div>
        </v-select>

        <div v-if="!field.disabled" class="input-group-append">
          <button @click="addOptionClicked($event)" class="btn btn-outline-secondary" type="button">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>

      </div>
      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" :state="fieldState" show="$touched || $submitted" class="form-control-feedback">
        <div slot="required">This field is required</div>
        <div slot="validate">Validation failed</div>
      </field-messages>

    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import vSelect from 'vue-select'

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
      },
      eventBus: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        options: []
      }
    },
    methods: {
      fetchOptions (search, loading) {
        loading(true)
        this.field.options(search).then(response => {
          this.options = response
          loading(false)
        })
      },
      addOptionClicked (event) {
        this.eventBus.$emit('addOption', this.afterOptionCreation, event, this.field)
      },
      afterOptionCreation (newOption) {
        this.options.push(newOption)
        this.localValue.push(newOption)
      }
    },
    watch: {
      localValue (values) {
        // Emit value changes to the parent (form)
        this.$emit('input', values.map(value => value.id))
        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }
    },
    created () {
      // If there is a value set, fetch an initial list of options
      if (this.value.length > 0) {
        // Call the field.options with the initial array of values
        this.field.options(this.value).then(response => {
          this.options = response

          // Replace localValue with the entire object so vue-select can use the label property
          // Filter the list of the options based on the actual selected IDs
          // a like query can return more then just your IDs
          this.localValue = this.options.filter(option => this.value.includes(option.id))
        })
      }
    },
    components: {
      vSelect
    }
  }
</script>
