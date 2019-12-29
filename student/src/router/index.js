import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import('@/views/Start.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('@/views/Role.vue')
  },
  {
    path: '/power',
    name: 'power',
    component: () => import('@/views/Power.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/Setting.vue')
  },
  {
    path: '/student',
    name: 'student',
    component: ()=>import('@/views/Student.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
