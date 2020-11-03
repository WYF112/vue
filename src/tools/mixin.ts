/**
 * @description：混入 全局（）
 */

 import Vue from 'vue';

 Vue.mixin({
     created(){
         console.log('混入开始')
     },
     methods:{
        init(){
            console.info('混入:','事件混入')
        }
     }
 })