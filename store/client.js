export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    client: {},
    client_list: [],
    limit: 20,
    count: 0,
    offset: 0,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_CLIENT(state, payload) {
      state.client = Object.freeze(payload);
    },
    SET_CLIENT_LIST_REQUEST(state, payload) {
      if (!payload) return;
      state.limit = payload.limit;
      state.offset = payload.offset;
    },
    SET_CLIENT_LIST_RESPONSE(state, payload) {
      if (!payload) return;
      state.client_list = Object.freeze(payload.results);
      state.count = payload.count;
    },
  },
  actions: {
    async getClient({ commit }, payload) {
      if (!payload.id) return commit('SET_CLIENT', null)
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/secretary/end-user-list/${payload.id}/`)
      commit('SET_CLIENT', result.data);
    },
    async getClientList({ commit, state }, payload) {
      if (!payload) payload = {}
      if (!payload.limit) payload.limit = state.limit || 20
      if (!payload.offset) payload.offset = state.offset || 0
      commit('SET_CLIENT_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/secretary/end-user-list/`, { params: { limit: payload.limit, offset: payload.offset } })
      commit('SET_CLIENT_LIST_RESPONSE', result.data);
    },
    async saveClient(_, payload) {
      if (!payload) return
      let content = {
        username: payload.username,
        password: payload.password,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
      }
      await payload.id ?
        this.$axios.$patch(`${this.$config.baseURL}/user/secretary/end-user-list/${payload.id}/update/`, content) :
        this.$axios.$post(`${this.$config.baseURL}/user/secretary/create-end-user/`, content)
      this.$router.push(`/client/`)
    },
    async deleteClient(_, payload) {
      await this.$axios.$delete(`${this.$config.baseURL}/user/secretary/end-user-list/${payload.id}/`)
      this.$router.push(`/client/`)
    }
  },
  getters: {
    is_loading: state => state.is_loading,
    client: state => state.client,
    client_list: state => state.client_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}