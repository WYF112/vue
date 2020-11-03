<template>
  <div>
    第三层
  </div>
</template>

<script>
export default {
  inject: ["foo"],
  mounted() {
    console.log(this.foo);
  }
};
</script>

<style>
</style>