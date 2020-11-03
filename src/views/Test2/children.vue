<template>
  <div>
    <p>子界面</p>
    <slot name="gg"></slot>
    <slot name="nn"></slot>
    <slot :user="user" name="age"></slot>
    <slot name="nb"></slot>
    <children2 v-on="$listeners" />
  </div>
</template>

<script>
import children2 from "./children2";
export default {
  components: { children2 },
  data() {
    return {
      user: {
        age: 18
      }
    };
  },
  props: ["a"],
  mounted() {
    console.log(this.$listeners);
    console.log(this.$scopedSlots);
  }
};
</script>

<style>
</style>