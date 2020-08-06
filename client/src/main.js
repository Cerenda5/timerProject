import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import PageHome from './components/PageHome.vue'
import PageUser from './components/PageUser.vue'
import PageNewUser from './components/PageNewUser.vue'
import PageError404 from './components/PageError404.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: PageHome },
    { path: '/user/:id', component: PageUser },
    { path: '/new-user/', component: PageNewUser },
    { path: '/404', component: PageError404 },
    { path: '*', redirect: '/404' }
  ]
})

// axios.defaults.baseURL = process.env.SERVER_URL
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')