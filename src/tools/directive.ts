/**
 * @description: 自定义指令 v-directive 【全局】
 */
import Vue from 'vue';

Vue.directive('my-click', {
    bind: function (dom, params,vdom) {
        console.log(dom)
        console.log(params)
        console.log(vdom)
        console.log('绑定，只调用一次。初始化')
    },
    inserted: function (dom, params) {
        console.log(dom)
        console.log(params)
        console.log('被绑定元素插入父节点时调用仅保证父节点存在')
    },
    update: function (dom, params) {
        console.log(dom)
        console.log(params)
        console.log('所在组件的VNode更新时调用，可能发生在VNdoe更新之前。')
    },
    componentUpdated: function (dom, params) {
        console.log(dom)
        console.log(params)
        console.log('指令在组件的VNode及其子VNode全部更新后调用')
    },
    unbind: function (dom, params) {
        console.log(dom)
        console.log(params)
        console.log('只调用一次，解绑销毁时调用')
    },
});