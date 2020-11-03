<template>
  <div>
    <button  @click="change">更改</button>
    <input type="text" v-model="names.a" />
    <slot name="b"></slot>
    <slot name="a"></slot>
    <slot name="c" :a="a"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: "哈哈哈"
    };
  },
  props: ["names"],
  methods: {
    change() {
      this.a = "ri";
      this.b = "ri";
    }
  }
};
</script>

<style>
</style>