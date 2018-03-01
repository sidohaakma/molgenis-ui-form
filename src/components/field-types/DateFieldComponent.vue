<template>
  <validate :state="fieldState" :custom="{'validate': isValidDateTime(localValue) && isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div class="input-group">
        <flat-pickr
          :id="field.id"
          v-model="localValue"
          :config="config"
          :name="field.id"
          class="form-control"
          :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted) && fieldState.$invalid}"
          :aria-describedby="field.id + '-description'"
          :required="isRequired"
          :disabled="field.disabled"
        >
        </flat-pickr>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" title="Toggle" data-toggle>
            <i class="fa fa-calendar">
              <span aria-hidden="true" class="sr-only">Toggle</span>
            </i>
          </button>
          <button v-if="!isRequired" class="date-field-clear-btn btn btn-outline-secondary" type="button" title="Clear"
                  data-clear>
            <i class="fa fa-times">
              <span aria-hidden="true" class="sr-only">Clear</span>
            </i>
          </button>
        </div>
      </div>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :type="field.type" :field-state="fieldState">
      </form-field-messages>

    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import FormFieldMessages from '../FormFieldMessages'
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'
  import moment from 'moment'

  export default {
    name: 'DateFieldComponent',
    mixins: [VueForm],
    props: {
      value: {
        type: [String, Date],
        required: false
      },
      field: {
        type: Object,
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
      isTimeIncluded: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        config: {
          wrap: true,
          allowInput: true,
          enableTime: this.isTimeIncluded
        }
      }
    },
    methods: {
      /**
       * Convert a date string to a Moment Date.
       * Include hours and minutes if time is enabled
       *
       * @param dateString
       * @returns {Moment} A date object created by moment
       */
      getDateFromValue (dateString) {
        const format = this.isTimeIncluded ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'
        return moment(dateString, format, true)
      },

      /**
       * Validates a date string to see if it is a proper date
       *
       * @param dateString
       * @returns {boolean}
       */
      isValidDateTime (dateString) {
        const date = this.getDateFromValue(dateString)
        return date != null && date.isValid()
      }
    },
    watch: {
      localValue (value) {
        // Only emit a data change if the date is valid
        if (this.isValidDateTime(value)) {
          // Emit value changes to the parent (form)
          // Always emit a date value, not a string
          this.$emit('input', this.getDateFromValue(value).toDate())

          // Emit value changes to trigger the onValueChange
          // Do not use input event for this to prevent unwanted behavior
          this.$emit('dataChange')
        }
      }
    },
    components: {
      flatPickr,
      FormFieldMessages
    }
  }
</script>
