<template>
  <div>
      我是登录界面
      <h3>{{isLogin}}</h3>
      <button @click='submite'>登录</button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      data: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapActions(['login']),
    submite () {
      // 获取查询参
      this.login({name: 'yunfei'}).then(res => {
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      })
    }
  }
}
</script>
