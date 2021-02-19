<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <yf-link to="#/1">v1</yf-link>
    <yf-link to="#/2">v2</yf-link>
    <yf-link to="#/3">v3</yf-link>
    <yf-router></yf-router>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
