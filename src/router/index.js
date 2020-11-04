import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import Person from '../views/Person.vue'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import Login from '../views/Login.vue'
import moment from 'moment'

Vue.prototype.moment = moment;
Vue.prototype.console = console;

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/person/:username',
    name: 'Person',
    component: Person
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
