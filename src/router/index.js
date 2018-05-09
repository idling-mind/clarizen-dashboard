import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import StrategyMatrix from '@/components/StrategyMatrix'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Users',
      component: Users
    },
    {
      path: '/strategy',
      name: 'StrategyMatrix',
      component: StrategyMatrix
    }
  ]
})
