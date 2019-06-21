import Vue from 'vue'
class YFstore {
  constructor (options) {
    this.state = options.state
    this.mutations = options.mutations
    this.actions = options.actions
    // 借助vue本身的‘数据劫持’来实现数据响应机制
    this.vm = new Vue({
      data: {
        state: this.state
      }
    })
  }
  commit (type, payload) {
    const mutations = this.mutations[type]
    mutations(this.state, payload)
  }
  dispatch (type, payload) {
    const actions = this.actions[type]
    const ctx = {
      commit: this.commit,
      state: this.state,
      dispatch: this.dispatch
    }
    return actions(ctx, payload)
  }
}
export default new YFstore({
  state: {count: 1},
  mutations: {
    add (state) {
      state.count++
    }
  }
})
