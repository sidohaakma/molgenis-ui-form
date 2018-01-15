<template>
  <validate :state="state" :custom="{'validate': validate(field)}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

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
      <v-select
        v-model="localValue"
        :options="options"
        :onSearch="fetchOptions"
        :onChange="onChange"
        :filterable="false"
        :inputId="field.id"
        :name="field.id"
        :required="isRequired(field)"
        :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}">

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
        type: Object,
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
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        options: []
      }
    },
    methods: {
      onChange (selectedOption) {
        // Emit the id value of the selected option to the parent (form)
        this.$emit('input', selectedOption.id)
        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      },
      fetchOptions (search, loading) {
        loading(true)
        this.field.options(search).then(response => {
          this.options = response
          loading(false)
        })
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
