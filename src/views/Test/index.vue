<template>
  <div class="test_box">
    <button v-my-click="obj.info">自定义指令</button>
    <button @click="add">新增</button>
    <p>信息：{{ obj }}</p>
    <p>年龄：{{ obj.age }}</p>
    <p v-if="obj.age == 18">动态显示</p>
    <p>{{ txt | haha }}</p>
    <p>{{ x }}</p>
    <yf-input class="custom_ip" placeholder='请输入' />
  </div>
</template>

<script>
/**
 * @description:test界面
 */
import Vue from "vue";
import yfInput from "./yf.vue";
const core = {
  age: 18,
  sum: "insist"
};
setTimeout(() => {
  core.age = 28;
}, 3000);
const coreCase = Vue.observable(core);
export default {
  components: { yfInput },
  template: "<p>12</p>",
  provide:{
    foo:'我日，这么牛'
  },
  data() {
    return {
      txt: "abcdef",
      obj: {
        name: "yunfei",
        info: "gg"
      },
      x: coreCase,
      $jj: "小鸡小鸡"
    };
  },
  beforeCreate() {
    console.log();
  },
  created() {
    this.init();
  },
  methods: {
    add() {
      this.$set(this.obj, "age", 18);
    },
    remove() {
      console.log("");
    }
  },
  mounted() {
    console.log(this.$data.$jj);
  }
};
</script>

<style>
.test_box {
}
</style>