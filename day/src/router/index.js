import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Day1 from '@/components/day1/list'
import Day11 from '@/components/day1/index'
import Day12 from '@/components/day1/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
    }
  ]
})
