import Vue from 'vue'
import App from './App.vue'
import './route/index';
import store from './store'
Vue.config.productionTip = false

new Vue({
  provide: { store },
  render: h => h(App)
}).$mount('#app')
