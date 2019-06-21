import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
    isLogin (state) {
      return state.isLogin ? '请登录' : '欢迎'
    }
  },
  mutations: {
    login (state, o) {
      console.log(o.name)
      state.isLogin = true
    }
  },
  actions: {
    login ({commit}, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('login', payload)
          resolve(true)
        }, 2000)
      })
    }
  }
})
