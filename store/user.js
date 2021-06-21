export default {
  namespaced: true,
  state: () => ({
    user_type: null,
    token: null,
  }),
  mutations: {

    SET_USER(state, payload) {
      state.user_type = payload.user_type;
      state.token = payload.token;

    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      let result = await this.$axios.post(`${this.$config.baseURL}/user/login/`, {
        username: payload.username,
        password: payload.password
      })
      commit('SET_USER', result.data.data);
      this.$cookiz.set(this.$config.cookie_user_type, result.data.data.user_type, {
        maxAge: payload.remember_me ? 2147483647 : 60 * 60 * 24
      });
      this.$cookiz.set(this.$config.cookie_token, result.data.data.token, {
        maxAge: payload.remember_me ? 2147483647 : 60 * 60 * 24
      });
      dispatch("setHomePage")
    },
    setHomePage({ state }) {
      if (!state.user_type || !state.token) return
      if (state.user_type == 9) return this.$router.push("/companySecretary");
      if (state.user_type == 1) return this.$router.push("/client");
      if (state.user_type == 2) return this.$router.push("/company");
    },
    async logout({ commit }) {
      commit('SET_USER', {});
      this.$cookiz.remove(this.$config.cookie_user_type);
      this.$cookiz.remove(this.$config.cookie_token);
      this.$router.push('/login')

    },
    getUserFromCookie({ commit, state }) {
      if (state.username && state.token) return
      commit('SET_USER', {
        user_type: this.$cookiz.get(this.$config.cookie_user_type),
        token: this.$cookiz.get(this.$config.cookie_token),
      });
    }
  },
  getters: {
    user_type: state => state.user_type,
    token: state => state.token,
  }
}