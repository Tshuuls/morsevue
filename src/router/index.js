import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Morsetable from '@/components/MorseTable'
import UserList from '@/components/UserList'
import Register from '@/components/Register'
import MyAccount from '@/components/MyAccount'
import Logout from '@/components/Logout'

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
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/myaccount',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
