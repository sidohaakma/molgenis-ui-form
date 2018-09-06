<template>
  <div id="form-demo" class="container">

    <blockquote class="blockquote text-center">
      <h1 class="display-3">MOLGENIS Form</h1>
    </blockquote>

    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <router-link to="/all" class="nav-link">All-fields</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/number" class="nav-link">Number</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/integer" class="nav-link">Integer</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/long" class="nav-link">Long</router-link>
      </li>
    </ul>

    <div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ExamplePage'
  }
</script>
