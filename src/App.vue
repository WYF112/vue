<template>
  <div id="app">
    <button @click="add">add</button>
    {{ store.state.count }}
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  inject: ["store"],
  methods: {
    add() {
      this.store.commit("getCount", ++this.store.state.count);
    },
  },
  mounted() {
    // console.log(this.store);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
