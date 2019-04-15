<template>

  <div class="card">
    <h5 class="card-header text-center">Settings</h5>
    <div class="card-body">

      <h5 class="card-title">model</h5>
      <pre>{{ fieldSettings | pretty }}</pre>
      
      <hr/>

      <h5 class="card-title">data</h5>
      <pre class="field-data-json">{{ fieldData }}</pre>

      <template v-if="formState">
        <hr/>
        <h5 class="card-title">form state</h5>
        <pre class="field-data-json">{{ formState }}</pre>
      </template>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'model-settings',
    props: {
      fieldSettings: {
        type: Object,
        required: true
      },
      fieldData: {
        type: Object,
        required: true
      },
      formState: {
        type: Object,
        required: false
      }
    },
    filters: {
      pretty (value) {
        return JSON.stringify(value, null, 2)
      }
    }
  }
</script>
