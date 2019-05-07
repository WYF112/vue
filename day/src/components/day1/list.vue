<template>
  <div>
    <router-link to='/day1/1'>购物车</router-link>
    <router-link to='/day1/2'>自定义组件</router-link>
    <div>第一天的学习内容</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'day1'
}
</script>

<style>
</style>
