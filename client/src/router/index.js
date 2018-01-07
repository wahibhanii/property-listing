import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import NewProp from '@/components/NewProp'
import Browse from '@/components/Browse'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'home',
          component: Home,
        },{
          path: 'newprop',
          component: NewProp,
        },
        {
          path: 'browse',
          component: Browse,
        },
      ]
    }
  ]
})
