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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
