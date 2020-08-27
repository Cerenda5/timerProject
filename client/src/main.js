import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store.js'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: () => import('./components/PageHome.vue'), meta: { requiresAuth: true } },
    { path: '/login/', component: () => import('./components/PageLogin.vue'), meta: { onlyGuest: true } },
    { path: '/signin/', component: () => import('./components/PageSignin.vue'), meta: { onlyGuest: true } },
    { path: '/user/', component: () => import('./components/PageUser.vue'), meta: { requiresAuth: true } },
    { path: '/groups/', component: () => import('./components/PageGroups.vue'), meta: { requiresAuth: true } },
    { path: '/projects/', component: () => import('./components/PageProjects.vue'), meta: { requiresAuth: true } },
    { path: '/project/:id/details/', component: () => import('./components/PageProjectDetails.vue'), meta: { requiresAuth: true } },
    { path: '/404', component: () => import('./components/PageError404.vue') },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.userId) next()
    else next('/login/')
  }
  else if (to.meta.onlyGuest && store.state.userId) next(from)
  else next()
})

// axios.defaults.baseURL = process.env.SERVER_URL
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store,
  router,
}).$mount('#app')