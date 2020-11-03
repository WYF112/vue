/**
 * @description: 注册组件 （全局）
 */
import Vue from 'vue';

Vue.component('my-component', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})