<template>

  <div class="card">
    <h5 class="card-header text-center">Settings</h5>
    <div class="card-body">

      <h5 class="card-title">model</h5>
      <pre>{{ fieldSettings | pretty }}</pre>
      <hr/>

      <h5 class="card-title">data</h5>
        <pre class="field-data-json">{{ fieldData }}</pre>
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
      }
    },
    filters: {
      pretty (value) {
        return JSON.stringify(value, null, 2)
      }
    }
  }
</script>
