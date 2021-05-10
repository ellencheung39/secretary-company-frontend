export default {
  namespaced: true,
  state: () => ({
    current_user: {},
    token: {}
  }),
  mutations: {
    RESET_TEMPORARY_VARIABLES(state, payload) {
      state.temp = {};
    },
    SET_CURRECT_USER(state, payload) {
      if (!payload) return;
      state.current_user = Object.freeze(payload);
    }
  },
  actions: {
    getDefaultCurrentUser({ commit }) {
      commit('SET_CURRECT_USER', {
        display_name: "George Martin"
      });
    },
    async login({ commit }, payload) {
      commit('SET_CURRECT_USER', payload);
      // let result = await this.$axios.$post(`${this.$config.baseURL}/login`, payload)
      // if (result.response_code == 200) {
      //   commit('SET_CURRECT_USER', result.response_result);
      // }
      // return result
    },
    async getCurrentUser({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/getCurrentUser`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_USER', result.response_result);
      }
    }
  },
  getters: {
    current_user: state => state.current_user,
    token: state => state.token
  }
}