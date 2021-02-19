import Vue from 'vue';
import yfRouter from '../util/routers';
import v1 from '../view/v1'
import v2 from '../view/v2'
import v3 from '../view/v3'

const options = [
    { path: '/', component: v1 },
    { path: '/1', component: v1 },
    { path: '/2', component: v2 },
    { path: '/3', component: v3 },
]
let route = new yfRouter(Vue, options);
export default route;