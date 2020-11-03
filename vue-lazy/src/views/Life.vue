<template>
  <div>{{tit}}</div>
</template>

<script>
export default {
  data() {
    return {
      tit: "驾驶舱 消息管理"
    };
  },
  beforeCreate() {
    console.log(1);
  },
  created() {
    console.log(2);
  },
  beforeMount() {
    console.log(3);
  },
  mounted() {
    console.log(4);
  },
  beforUpdate() {
    console.log("更新视图前");
  },
  updated() {
    console.log("更新视图后");
  },
  beforeDestroy() {
    console.log("组件销毁前");
  },
  destroyed() {
    console.log("组件销毁后");
  },
  activated() {
    console.log("进入缓存组件");
  },
  deactivated() {
    console.log("离开缓存组件");
  }
};
</script>

<style>
</style>