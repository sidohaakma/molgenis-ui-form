<template>
  <validate :state="state" :custom="{'validate': isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div class="input-group">

        <v-select v-model="localValue"
                  class="form-control"
                  :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}"
                  :options="options"
                  :onSearch="fetchOptions"
                  :filterable="false"
                  :inputId="field.id"
                  :name="field.id"
                  :required="isRequired">

          <div slot="no-options">
            <small v-if="localValue">Option '{{ localValue }}' not found.</small>
          </div>
        </v-select>

        <div class="input-group-append">
          <button @click="addOptionClicked($event)" class="btn btn-outline-secondary" type="button">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
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
  import vSelect from 'vue-select'

  import { FormField } from '../../flow.types'

  export default {
    name: 'SingleSelectFieldComponent',
    mixins: [VueForm],
    props: {
      value: {
        // ID of select field can be of type: Integer, Long, String etc.
        type: [String, Number],
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
        this.localValue = newOption
      }
    },
    watch: {
      localValue (value) {
        if (value) {
          // Emit value changes to the parent (form)
          this.$emit('input', value.id)
        } else {
          this.$emit('input', null)
        }
        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }
    },
    created () {
      // If there is a value set, fetch an initial list of options
      if (this.value) {
        this.field.options(this.value).then(response => {
          this.options = response

          // Replace localValue with the entire object so vue-select can use the label property
          this.localValue = this.options.find(option => option.id === this.value)
        })
      }
    },
    components: {
      vSelect
    }
  }
</script>
