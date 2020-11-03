import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// 引入vue配置
import './tools/directive.ts';
import './tools/filter.ts';
import './tools/component.ts';
import './tools/mixin.ts'
Vue.config.productionTip = false
Vue.use(ViewUI)
new Vue({
  router,
  store,
  propsData:{
    main:'我乃核心'
  },
  render: h => h(App)
}).$mount('#app')
