export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    current_document: {},
    document_list: [],
    limit: 20,
    count: 0,
    offset: null,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_CURRENT_DOCUMENT(state, payload) {
      if (!payload) return;
      state.current_document = Object.freeze(payload);
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
    async getCurrentDocument({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/user/company-file-list/`, payload)
      commit('SET_CURRENT_DOCUMENT', result.data);
    },
    async getDefaultDocumentList({ commit, state }) {
      if (state.offset !== null) return
      commit('SET_DOCUMENT_LIST_REQUEST', { limit: 20, offset: 0 });
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/company-file-list/`, { params: { limit: 20, offset: 0 } })
      commit('SET_DOCUMENT_LIST_RESPONSE', result.data);
    },
    async getDocumentList({ commit }, payload) {
      commit('SET_DOCUMENT_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/company-file-list/`, { params: { limit: payload.limit, offset: payload.offset } })
      commit('SET_DOCUMENT_LIST_RESPONSE', result.data);
    },
    async saveDocument({ commit }, payload) {
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
      let result = await payload.id ?
        this.$axios.$patch(`${this.$config.baseURL}/user/company-file-list/${payload.id}/update/`, content) :
        this.$axios.$post(`${this.$config.baseURL}/user/manage/create-secretary/`, content)
      commit('SET_CURRENT_DOCUMENT', result.data);
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_document: state => state.current_document,
    document_list: state => state.document_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}