<template>
  <validate :state="state" :custom="{'validate': valid}">
    <div class="form-group">
      <label class="field-label" :for="field.id">{{ field.label }}</label>

      <!--
      /**
        For creating options that do not exist:
          - taggable = true
          - pushTags = true
          - createOption = Function
      */

      /**
        Filterable set to false because objects are only filtered on the label parameter
          we want filtering on multiple parameters
      */
      -->
      <v-select v-model="localValue"
                :options="options"
                :onSearch="fetchOptions"
                :filterable="false"
                :inputId="field.id"
                :name="field.id"
                :required="required">

        <div slot="no-options">
          <small v-if="localValue">Option '{{ localValue }}' not found.</small>
        </div>
      </v-select>

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
    methods: {
      fetchOptions (search, loading) {
        loading(true)
        this.field.options(search).then(response => {
          this.options = response
          loading(false)
        })
      }
    },
    watch: {
      localValue (value) {
        if (value) {
          // Emit value changes to the parent (form)
          this.$emit('input', value.id)
          // Emit value changes to trigger the hooks.onValueChange
          // Do not use input event for this to prevent unwanted behavior
        } else {
          this.$emit('input', null)
        }
        this.$emit('dataChange')
      }
    },
    created () {
      // If there is a value set, fetch an initial list of options
      if (this.value) {
        this.field.options(this.value).then(response => {
          this.options = response
        })
      }
    },
    components: {
      vSelect
    }
  }
</script>
