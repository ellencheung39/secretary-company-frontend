export default {
  namespaced: true,
  state: () => ({
    current_user: {}
  }),
  mutations: {
    SET_CURRECT_USER(state, payload) {
      if (!payload) state.current_user = {}
      else state.current_user = Object.freeze(payload);
    },
  },
  actions: {
    async login({ commit }, payload) {
      let result = await this.$axios.post(`${this.$config.baseURL}/user/login/`, {
        username: payload.username,
        password: payload.password
      })
      console.log(result)
      commit('SET_CURRECT_USER', result.data?.data);
      this.$cookiz.set(this.$config.cookie_user, result.data?.data, {
        maxAge: payload.remember_me ? 2147483647 : 60 * 60 * 24 * 365
      });
      this.$router.push("/companySecretary");
    },
    logout({ commit }) {
      commit('SET_CURRECT_USER', null);
      this.$cookiz.remove(this.$config.cookie_user);
      this.$router.push('/login')
    },
    getUserFromCookie({ commit }) {
      commit('SET_CURRECT_USER', this.$cookiz.get(this.$config.cookie_user));
    }
  },
  getters: {
    current_user: state => state.current_user
  }
}