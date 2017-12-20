<template>
  <div>
    <form>
      <div class="form-group">
        <label for="textInput">Fill in something</label>
        <input v-model="msg" class="form-control" type="text" id="textInput"/>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormComponent',
  data () {
    return {
      msg: 'Hello'
    }
  }
}
</script>
