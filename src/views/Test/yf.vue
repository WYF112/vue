/**
* @description： props属性继承;inherit属性为false时，不会影响class、style
*/
<template>
  <div>
    <input :placeholder="placeholder" type="text" />
    <yf3 />
  </div>
</template>

<script>
import yf2 from "./yf2.vue";
import yf3 from "./yf3.vue";
export default {
  extends: yf2,
  components: { yf3 },
  inject: ["foo"],
  inheritAttrs: false,
  props: ["placeholder"],
  mounted() {
    this.$parent.$data.$jj = 12345;
    console.log(this.foo);
  }
};
</script>

<style>
</style>