/**
 * @ 过滤器： filter  【全局】
 */

import Vue from 'vue';

Vue.filter('haha', function (v: any) {
    console.log(v)
    console.log('过滤器 开启')
    console.log(v.charAt(2))
    return  v.toString().toUpperCase()
})