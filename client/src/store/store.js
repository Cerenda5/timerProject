import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userId: null,
    userToken: null
  },
  mutations: {
    login (state, datas) {
      state.userId = datas.id
      state.userToken = datas.token
    },
    logout (state) {
      state.userId = null
      state.userToken = null
    }
  },
  plugins: [createPersistedState()]
})