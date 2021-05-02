import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from '@/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default () => new Vuex.Store({
  state: {
    page: {}
  },
  mutations: {
    SET_PAGE(state, payload) {
      state.page = Object.freeze(payload);
    }
  },
  actions: {
    setPage({ commit }, payload) {
      commit('SET_PAGE', payload);
    }
  },
  getters: {
    page: state => state.page
  },
  strict: debug
})