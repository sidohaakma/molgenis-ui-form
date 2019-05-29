<template>
  <div id="form-demo" class="container">

    <blockquote class="blockquote text-center">
      <h1 class="display-3">MOLGENIS Form</h1>
    </blockquote>

    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <router-link to="/update-entity" class="nav-link">Update entity</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/create-entity" class="nav-link">Create entity</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/integer" class="nav-link">Integer</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/long" class="nav-link">Long</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/decimal" class="nav-link">Decimal</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/unique" class="nav-link">Unique</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/date-time" class="nav-link">Date time</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/file" class="nav-link">File</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/age" class="nav-link">Age</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/radio" class="nav-link">Radio</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/max-length" class="nav-link">Max length</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/single-select" class="nav-link">Single Select</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/multi-select" class="nav-link">Multi Select</router-link>
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
