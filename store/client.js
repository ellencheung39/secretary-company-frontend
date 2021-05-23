export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    current_client: {},
    client_list: [],
    limit: 20,
    count: 0,
    offset: null,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_CURRENT_CLIENT(state, payload) {
      if (!payload) return;
      state.current_client = Object.freeze(payload);
    },
    SET_CLIENT_LIST_REQUEST(state, payload) {
      if (!payload) return;
      state.limit = payload.limit;
      state.offset = payload.offset;
    },
    SET_CLIENT_LIST_RESPONSE(state, payload) {
      if (!payload) return;
      state.client_secretary_list = Object.freeze(payload.results);
      state.count = payload.count;
    },
  },
  actions: {
    async getCurrentClient({ commit }, payload) {
      // let result = await this.$axios.$post(`${this.$config.baseURL}/user/client-list/`, payload)
      // commit('SET_CURRENT_CLIENT', result.data)
      commit('SET_CURRENT_CLIENT', {});
    },
    async getDefaultClientList({ commit, state }) {
      if (state.offset !== null) return
      commit('SET_CLIENT_LIST_REQUEST', { limit: 20, offset: 0 });
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/client-list/`, { params: { limit: 20, offset: 0 } })
      commit('SET_CLIENT_LIST_RESPONSE', result.data);
    },
    async getClientList({ commit }, payload) {
      commit('SET_CLIENT_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/client-list/`, { params: { limit: payload.limit, offset: payload.offset } })
      commit('SET_CLIENT_LIST_RESPONSE', result.data);
    },
    async saveClient({ commit }, payload) {
      if (!payload) return
      let content = {
        phone: payload.phone,
        email: payload.email,
        business_registration: payload.business_registration,
        certificate_registration: payload.certificate_registration,
        chinese_name: payload.chinese_name,
        english_name: payload.english_name,
        exchange_secretary: payload.exchange_secretary,
        current_directors: payload.current_directors,
        current_shareholders: payload.current_shareholders,
        register_time: new Date()
      }
      let result = await payload.id ?
        this.$axios.$patch(`${this.$config.baseURL}/user/client-list/${payload.id}/update/`, content) :
        this.$axios.$post(`${this.$config.baseURL}/user/create-client/`, content)
      commit('SET_CURRENT_CLIENT', result.data);
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_client: state => state.current_client,
    client_list: state => state.client_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}