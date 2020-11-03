/**
*@description: 复选框
*@author；yunfei
*@time:2020/10/28
*/
<template>
  <input
    type="checkbox"
    :checked="checked"
    @change="
      e => {
        $emit('input', e.target.checked);
      }
    "
    :value="value"
  />
  <!-- <input type="checkbox" :checked='checked' @change="(e)=>{$emit('input',e.target.checked)}" /> -->
</template>

<script>
export default {
  // inheritAttrs:false,  //禁止继承属性

  model: {
    prop: "checked"
    // event: "change"
  },
  props: {
    value: String,
    checked: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
};
</script>

<style>
</style>