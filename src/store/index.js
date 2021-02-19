import Vue from 'vue'
import yfvuex from '../util/vuexs';
// import Vuex from 'vuex'

// Vue.use(Vuex)

export default new yfvuex(Vue, {
  state: {
    count: 1
  },
  mutations: {
    getCount(state, val) {
        state.count = val
    }
  },
  actions: {

  }
})
