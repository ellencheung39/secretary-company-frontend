export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    document_list: [],
    limit: 20,
    count: 0,
    offset: 0,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_DOCUMENT_LIST_REQUEST(state, payload) {
      if (!payload) return;
      state.limit = payload.limit;
      state.offset = payload.offset;
    },
    SET_DOCUMENT_LIST_RESPONSE(state, payload) {
      if (!payload) return;
      state.document_list = Object.freeze(payload.results.map(_r => {
        return {
          ..._r.secretary,
          id: _r.id,
          username: _r.username
        }
      }));
      state.count = payload.count;
    },
  },
  actions: {
    async getDocumentList({ commit, state }, payload) {
      if (!payload) payload = { limit: state.limit, offset: state.offset }
      commit('SET_DOCUMENT_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/company-file-list/`, { params: { limit: payload.limit, offset: payload.offset } })
      commit('SET_DOCUMENT_LIST_RESPONSE', result.data);
    },
    async saveDocument(_, payload) {
      if (!payload) return
      let content = {
        username: payload.username,
        password: payload.password,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        contact: payload.contact,
        address: payload.address,
        is_licensed: !!payload.is_licensed,
        licensee: payload.licensee
      }
      await this.$axios.$post(`${this.$config.baseURL}/user/manage/create-secretary/`, content)
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    document_list: state => state.document_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}