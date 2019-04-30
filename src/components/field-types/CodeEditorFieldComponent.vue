<template>
  <!-- Tiny debounce to make sure that validation will always flip the fieldState.$pending flag -->
  <validate :state="fieldState" :custom="{'validate': isValid, maxlength: notTooLong}" :debounce="1">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>
      <div :class="{'border border-danger': isInvalid}">
        <vue-code :id="field.id"
                  :name="field.id"
                  v-model="localValue"
                  :options="options"
                  :required="isRequired">
        </vue-code>
      </div>
      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :field-state="fieldState" :maxlength="maxlength">
      </form-field-messages>
    </div>
  </validate>
</template>

<script>
import VueForm from 'vue-form'
import VueCode from 'vue-code'
import FormFieldMessages from '../FormFieldMessages'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/mode/r/r'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/dialog/dialog.js'

import detectLang from '../../util/helpers/langDetect'

import { FormField } from '../../flow.types'

export default {
  name: 'CodeEditorFieldComponent',
  mixins: [VueForm],
  props: {
    value: {
      type: String,
      default: '',
      required: false
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
    maxlength: {
      type: Number,
      default: 65535
    }
  },
  data () {
    return {
      // Store a local value to prevent changing the parent state
      localValue: this.value
    }
  },
  methods: {
    notTooLong () {
      return this.localValue.length < this.maxlength
    }
  },
  computed: {
    options: function () {
      return {
        mode: this.language,
        indentUnit: 2,
        smartIndent: true,
        tabSize: 2,
        indentWithTabs: true,
        lineNumbers: true,
        showCursorWhenSelecting: true,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        readOnly: this.field.disabled
      }
    },
    language: function () {
      const lang = detectLang(this.localValue).toString().toLowerCase()
      return this.field.type === 'html' || lang === 'html' ? 'htmlmixed' : lang === 'python' || lang === 'javascript' ? lang : 'r'
    },
    isInvalid () {
      return this.fieldState && ((this.fieldState.$touched || this.fieldState.$submitted || this.fieldState.$dirty) &&
          (!this.isValid || (this.isRequired && this.localValue === '')))
    }
  },
  watch: {
    localValue (value) {
      // Emit value changes to the parent (form)
      this.$emit('input', value)
      this.fieldState.$touched = true
      this.fieldState.$dirty = true
    }
  },
  components: {
    VueCode,
    FormFieldMessages
  }
}
</script>
