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

      <form-field-messages :field-id="field.id" :field-state="fieldState">
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
  import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
  import { Spanish } from 'flatpickr/dist/l10n/es.js'
  import { Italian } from 'flatpickr/dist/l10n/it.js'
  import { French } from 'flatpickr/dist/l10n/fr.js'
  import { Dutch } from 'flatpickr/dist/l10n/nl.js'
  import { German } from 'flatpickr/dist/l10n/de.js'

  const flatpickerLangMap = {
    pt: Portuguese,
    es: Spanish,
    it: Italian,
    fr: French,
    nl: Dutch,
    de: German
  }

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
          enableTime: this.isTimeIncluded,
          dateFormat: this.isTimeIncluded ? 'Z' : 'Y-m-d',
          altFormat: this.isTimeIncluded ? 'Y-m-d h:i K' : 'Y-m-d'
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
        const format = this.isTimeIncluded ? moment.ISO_8601 : 'YYYY-MM-DD'
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
          this.$emit('input', value)
          this.$emit('dataChange')
        }
      }
    },
    created () {
      if (flatpickerLangMap[this.$lng]) {
        this.config.locale = flatpickerLangMap[this.$lng]
      }
    },
    components: {
      flatPickr,
      FormFieldMessages
    }
  }
</script>
