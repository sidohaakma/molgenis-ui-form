<template>
  <validate :state="state" :custom="{'validate': isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <vue-code :id="field.id"
                :name="field.id"
                v-model="localValue"
                :options="options"
                :required="isRequired">
      </vue-code>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" show="$touched || $submitted" class="form-control-feedback">
        <div class="invalid-message" slot="required">This field is required</div>
        <div class="invalid-message" slot="validate">Validation failed</div>
      </field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import VueCode from 'vue-code'

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

  import {FormField} from '../../flow.types'

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
        options: {
          mode: this.getLanguage(),
          indentUnit: 2,
          smartIndent: true,
          tabSize: 2,
          indentWithTabs: true,
          lineNumbers: true,
          showCursorWhenSelecting: true,
          extraKeys: {'Ctrl-Space': 'autocomplete'},
          readOnly: this.field.disabled
        }
      }
    },
    methods: {
      getLanguage () {
        if (this.field.type === 'html') {
          return 'htmlmixed'
        } else {
          const lang = this.detectLanguage()
          if (lang === 'Python') {
            return lang.toString().toLowerCase()
          } else {
            return 'javascript'
          }
        }
      },
      detectLanguage () {
        var detectLang = require('lang-detector')
        const lang = detectLang(this.value)
        return lang
      }
    },
    watch: {
      localValue (value) {
        // Emit value changes to the parent (form)
        this.$emit('input', value)
        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
        this.options.mode = this.getLanguage()
        this.state.$touched = true
      }
    },
    components: {
      VueCode
    }
  }
</script>
