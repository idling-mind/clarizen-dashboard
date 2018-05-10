import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import StrategyMatrix from '@/components/StrategyMatrix'
import ProjectStructure from '@/components/ProjectStructure'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/strategy',
      name: 'StrategyMatrix',
      component: StrategyMatrix
    },
    {
      path: '/structure',
      name: 'ProjectStructure',
      component: ProjectStructure
    }
  ]
})
