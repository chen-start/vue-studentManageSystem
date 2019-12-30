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
    component: () => import('@/views/Power.vue'),
    children: [
      {
        path: 'processing-center',
        component: () => import('@/views/MessageManagement/ProcessingCenter.vue')
      },
      {
        path: 'order-management',
        component: () => import('@/views/MessageManagement/OrderManagement.vue')
      },
      {
        path: 'message-center',
        component: () => import('@/views/MessageManagement/MessageCenter.vue')
      },
      {
        path: 'high-school',
        component: () => import('@/views/MessageManagement/HighSchool.vue')
      },{
        path: 'junior-middle-school',
        component: () => import('@/views/MessageManagement/JuniorMiddleSchool.vue')
      },
      {
        path: 'primary-school',
        component: () => import('@/views/MessageManagement/PrimarySchool.vue')
      },
      {
        path: 'call-mi',
        component: () => import('@/views/MessageManagement/CallMi.vue')
      },
      {
        path: 'my-add',
        component: () => import('@/views/MessageManagement/MyAdd.vue')
      },
      {
        path: 'my-news',
        component: () => import('@/views/MessageManagement/MyNews.vue')
      }
    ]
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
