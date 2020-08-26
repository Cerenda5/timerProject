import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store.js'
import VueRouter from 'vue-router'
import axios from 'axios'

import PageHome from './components/PageHome.vue'
import PageLogin from './components/PageLogin.vue'
import PageSignin from './components/PageSignin.vue'
import PageUser from './components/PageUser.vue'
import PageGroups from './components/PageGroups.vue'
import PageProjects from './components/PageProjects.vue'
import PageProjectDetails from './components/PageProjectDetails.vue'
import PageError404 from './components/PageError404.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: PageHome },
    { path: '/login/', component: PageLogin },
    { path: '/signin/', component: PageSignin },
    { path: '/user/:id', component: PageUser },
    { path: '/groups/', component: PageGroups },
    { path: '/projects/', component: PageProjects },
    { path: '/project/:id/details/', component: PageProjectDetails },
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
  store: store,
  router,
}).$mount('#app')