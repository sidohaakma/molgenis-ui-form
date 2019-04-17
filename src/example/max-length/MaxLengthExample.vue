<template>
  <div>
    <div class="row mb-1">

      <div class="col-sm">
        <div class="card">
          <h5 class="card-header text-center bg-info">Max length demo</h5>
          <div class="card-body">
            <form-component
              id="max-length-string-example"
              :options="formOptions"
              :formFields="formFields"
              :initialFormData="formData"
              :formState="formState"
              @valueChange="onValueChanged">
            </form-component>
          </div>
          <div class="card-footer">
            <button id="save-btn" class="btn btn-primary" type="submit" @click.prevent="onSubmit">Validate</button>
          </div>
        </div>
      </div>

      <div class="col-sm">
        <model-settings :field-settings="formFields[0]" :field-data="formData"></model-settings>
      </div>

    </div>

  </div>
</template>

<script>
  import { FormComponent } from '../../molgenisUiForm'
  import ModelSettings from '../components/ModelSettings'

  export default {
    name: 'max-length-example',
    components: {
      ModelSettings,
      FormComponent
    },
    data () {
      return {
        formOptions: {
          showEyeButton: false
        },
        formFields: [
          {
            id: 'max-length-string-example',
            label: 'String field with too many characters',
            description: 'This field will be marked as invalid because it consists of too many characters (>255)',
            type: 'text',
            visible: () => true,
            required: () => false,
            validate: () => true,
            range: {}
          },
          {
            id: 'max-length-text-example',
            label: 'Text field with too many characters',
            description: 'This text field contains a random DNA sequence of 65536 characters, which is invalid.',
            type: 'text-area',
            visible: () => true,
            required: () => false,
            validate: () => true,
            range: {}
          },
          {
            id: 'max-length-url-example',
            label: 'URL field with too many characters',
            description: 'This URL is too long',
            type: 'url',
            visible: () => true,
            required: () => false,
            validate: () => true,
            range: {}
          },
          {
            id: 'max-length-script-example',
            label: 'Script field with too many characters',
            description: 'This script field contains a random DNA sequence of 65536 characters, which is invalid.',
            type: 'script',
            visible: () => true,
            required: () => false,
            validate: () => true,
            range: {}
          },
          {
            id: 'max-length-email-example',
            label: 'Email field with too many characters',
            description: 'This Email address is too long',
            type: 'email',
            visible: () => true,
            required: () => false,
            validate: () => true,
            range: {}
          }
        ],
        formState: {},
        formData: {
          'max-length-string-example': 'This string consists of more than 255 characters and therefore after clicking on the field, it will be marked as invalid. Strings cannot exceed the length of 255 characters, so please remove a few characters in order to make this invalid field valid again. Thank you!',
          'max-length-text-example': this.generateString(65536),
          'max-length-url-example': 'https://www.somerandomurl.org/welcome-to-this-page/unfortunately-way-too-long/some-other-location/maybe-you-want-to-look-here/or-maybe-not/so-go-here/van-het-kastje-naar-de-muur/van-de-muur-naar-het-kastje/en-weer-terug/en-nog-een-keer-heen/en-toch-maar-weer-terug',
          'max-length-script-example': `dna_sequence="${this.generateString(65536)}"`,
          'max-length-email-example': 'i.am.not.sure.why.you.would.create.an.email.address.consisting.of.more.than.two.hundred.fifty.five.characters.but.you.cannot.enter.it.in.this.field.anyway.since.the.maximum.length.of.an.email.field.is.two.hundred.fifty.five.characters@idontknowsomeprovider.co.uk'
        }
      }
    },
    methods: {
      onSubmit () {
        this.formState._submit()
      },
      onValueChanged (formData) {
        this.formData = formData
      },
      generateString (length) {
        let text = ''
        const possible = 'GATC'
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
      }
    }
  }
</script>
