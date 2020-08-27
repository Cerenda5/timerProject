import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userId: null,
    userToken: ""
  },
  mutations: {
    login (state, id, token) {
      state.userId = id
      state.userToken = token
    },
    logout (state) {
      state.userId = null
      state.userToken = ""
    }
  },
  plugins: [createPersistedState()]
})