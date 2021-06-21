export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    company_secretary: null,
    company_secretary_list: [],
    limit: 20,
    count: 0,
    offset: 0,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_COMPANY_SECRETARY(state, payload) {
      state.company_secretary = Object.freeze(payload);
    },
    SET_COMPANY_SECRETARY_LIST_REQUEST(state, payload) {
      if (!payload) return;
      state.limit = payload.limit;
      state.offset = payload.offset;
    },
    SET_COMPANY_SECRETARY_LIST_RESPONSE(state, payload) {
      if (!payload) return;
      state.company_secretary_list = Object.freeze(payload.results.map(_r => {
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
    async getCompanySecretary({ commit }, payload) {
      if (!payload.id) return commit('SET_COMPANY_SECRETARY', null)
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/manage/secretary-list/${payload.id}/`)
      commit('SET_COMPANY_SECRETARY', { username: result.data.username, ...result.data.secretary });
    },
    async getCompanySecretaryList({ commit, state }, payload) {
      if (!payload) payload = {}
      if (!payload.limit) payload.limit = state.limit || 20
      if (!payload.offset) payload.offset = state.offset || 0
      commit('SET_COMPANY_SECRETARY_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/manage/secretary-list/`, { params: { limit: payload.limit, offset: payload.offset } })
      commit('SET_COMPANY_SECRETARY_LIST_RESPONSE', result.data);
    },
    async saveCompanySecretary(_, payload) {
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
      await payload.id ?
        this.$axios.$patch(`${this.$config.baseURL}/user/manage/secretary-list/${payload.id}/update/`, content) :
        this.$axios.$post(`${this.$config.baseURL}/user/manage/create-secretary/`, content)
      this.$router.push(`/companySecretary/`)
    },
    async deleteCompanySecretary(_, payload) {
      await this.$axios.$delete(`${this.$config.baseURL}/user/manage/secretary-list/${payload.id}/`)
      this.$router.push(`/companySecretary/`)
    }
  },
  getters: {
    is_loading: state => state.is_loading,
    company_secretary: state => state.company_secretary,
    company_secretary_list: state => state.company_secretary_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}