import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/wall',
    name: 'wall',
    component: () => import('../components/Wall.vue')
  },
  {
    path: '/newtopic',
    name: 'newtopic',
    component: () => import('../components/NewTopic.vue')
  },
  {
    path: '/userslist',
    name: 'userslist',
    component: () => import('../components/UsersList.vue')
  },
  {
    path: '/useraccount',
    name: 'useraccount',
    component: () => import('../components/UserAccount.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  // permet de démarrer à la racine, par conséquent démarrage sur signup
  base: process.env.BASE_URL,
  routes
})

export default router
