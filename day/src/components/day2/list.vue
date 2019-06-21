<template>
  <div>
      {{count}}
      <div>
          <button @click="add">测试++</button>
      </div>
  </div>
</template>
<script>
import store from './yfstore'
export default {
  data () {
    return {
      data: '手写vuex'
    }
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    add () {
      store.commit('add')
    }
  }
}
</script>
