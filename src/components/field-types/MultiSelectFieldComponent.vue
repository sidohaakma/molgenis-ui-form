  <template>
  <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
  <validate :state="fieldState" :custom="{'validate': isValid}" :debounce="1">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div class="input-group">

        <v-select v-model="localValue"
                  class="form-control mg-multi-select"
                  :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted || fieldState.$dirty) && fieldState.$invalid}"
                  :options="options"
                  :onSearch="fetchOptions"
                  :filterable="false"
                  :inputId="field.id"
                  :name="field.id"
                  :required="isRequired"
                  :disabled="field.disabled"
                  :multiple="true">

          <div slot="no-options">
            <small>{{ noOptionsMessage }}</small>
          </div>
        </v-select>

        <div v-if="!field.disabled && allowAddingOptions" >
          <button @click="addOptionClicked($event)" class="btn btn-outline-secondary mg-select-add-btn" type="button">
            <i class="fa fa-plus" aria-hidden="true"></i>
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
  import vSelect from 'vue-select'
  import FormFieldMessages from '../FormFieldMessages'

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
      },
      allowAddingOptions: {
        type: Boolean,
        required: false,
        default: false
      },
      noOptionsMessage: {
        type: String,
        required: false
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
        this.options = this.options.concat(newOption)
        this.localValue = this.localValue.concat(newOption)
      }
    },
    watch: {
      localValue (newValues) {
        this.fieldState.$dirty = true
        this.fieldState.$pristine = false
        this.fieldState.$touched = true
        this.fieldState.$untouched = false
        // Emit value changes to the parent (form)
        this.$emit('input', newValues.map(value => value.id))
        this.$emit('focus')
        this.$emit('blur')
      }
    },
    created () {
      // Fetch an initial list of options
      this.field.options(this.value).then(response => {
        this.options = response
        // Replace localValue with the entire object so vue-select can use the label property
        // Filter the list of the options based on the actual selected IDs
        // a like query can return more then just your IDs
        if (this.value.length > 0) {
          this.localValue = this.options.filter(option => this.value.includes(option.id))
        }
      })
    },
    components: {
      vSelect,
      FormFieldMessages
    }
  }
</script>
