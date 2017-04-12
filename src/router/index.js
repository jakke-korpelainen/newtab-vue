import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
// import Clock from '@/components/Clock'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
