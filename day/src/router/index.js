import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Day1 from '@/components/day1/list'
import Day11 from '@/components/day1/index'
import Day12 from '@/components/day1/HelloWorld'
import Day2 from '@/components/day2/list'
import Login from '@/components/login'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/day1',
          component: Day1,
          children: [
            {
              path: '1',
              name: 'day1-1',
              component: Day11
            },
            {
              path: '2',
              name: 'day1-2',
              component: Day12
            }
          ]
        },
        {
          path: '/day2',
          component: Day2
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {requireLogin: true},
      component: Login
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* -----判断当前地址是否为需要校验route----- */
  if (!to.meta.requireLogin && !store.state.isLogin) {
    next('/login?redirect=' + to.path)
  } else {
    next()
  }
})
export default router
