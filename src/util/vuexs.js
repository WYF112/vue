/**
 * @description: vuex
 * @param vue: vue
 * @param options: {state:{},mutation:{},actions:{}}
 */
class yfvuex {
    constructor(vue, option) {
        this.state = option.state;
        this.actions = option.actions;
        this.mutations = option.mutations;
        this.vm = new vue({
            data: {
                state: this.state
            }
        })
    }
    commit(type, payload) {
        let mutations = this.mutations[type];
        mutations(this.vm.state, payload)
    }
    dispatch(type, payload) {
        let actions = this.actions[type];
        actions({ state: this.vm.state, commit: this.commit, dispatch: this.dispatch }, payload)
    }
}

export default yfvuex;