import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Morsetable from '@/components/MorseTable'
import UserList from '@/components/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/morsetable',
      name: 'Morsetable',
      component: Morsetable
    },
    {
      path: '/userlist',
      name: 'Userlist',
      component: UserList
    }
  ]
})
