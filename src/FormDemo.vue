<template>
  <div id="form-demo" class="container">
    <div class="row">
      <div class="col-md-12">

        <blockquote class="blockquote text-center">
          <h1 class="display-3">MOLGENIS Form</h1>
          <footer class="blockquote-footer">Powered by<cite title="Source Title">Vue.js</cite></footer>
        </blockquote>

        <hr>

        <div class="card">
          <div class="card-header">
            <h5>Example form</h5>
          </div>

          <div class="card-body">
            <form-component id="example-form" :schema="schema" :data="data"></form-component>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { EntityToStateMapper, FormComponent } from './molgenisUiForm'
  import EntityTypeV2Response from './util/data'

  export default {
    name: 'form-demo',
    components: {
      FormComponent
    },
    data () {
      return {
        schema: {
          fields: EntityToStateMapper.generateFormFields(EntityTypeV2Response.metadata)
        }
      }
    },
    computed: {
      data () {
        return EntityToStateMapper.generateFormData(this.schema.fields, EntityTypeV2Response.items)
      }
    }
  }
</script>
