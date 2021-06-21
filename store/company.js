export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    company: {},
    company_list: [],
    limit: 20,
    count: 0,
    offset: 0,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_COMPANY(state, payload) {
      state.company = Object.freeze(payload);
    },
    SET_COMPANY_LIST_REQUEST(state, payload) {
      if (!payload) return;
      state.limit = payload.limit;
      state.offset = payload.offset;
    },
    SET_COMPANY_LIST_RESPONSE(state, payload) {
      if (!payload) return;
      state.company_list = Object.freeze(payload.results);
      state.count = payload.count;
    },
  },
  actions: {
    async getCompany({ commit }, payload) {
      if (!payload.id) return commit('SET_COMPANY', null)
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/company-list/${payload.id}/`)
      commit('SET_COMPANY', result.data)
    },
    async getCompanyList({ commit, state }, payload) {
      if (!payload) payload = {}
      if (!payload.limit) payload.limit = state.limit || 20
      if (!payload.offset) payload.offset = state.offset || 0
      commit('SET_COMPANY_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/company-list/`, { params: { end_user: payload.id, limit: payload.limit, offset: payload.offset } })
      commit('SET_COMPANY_LIST_RESPONSE', result.data);
    },
    async saveCompany(_, payload) {
      if (!payload) return
      let content = {
        end_user: payload.end_user,
        business_registration: payload.business_registration,
        certificate_registration: payload.certificate_registration,
        company_chinese_name: payload.company_chinese_name,
        company_english_name: payload.company_english_name,
        type_of_company: payload.type_of_company,
        company_address: payload.company_address,
        company_email: payload.company_email,
        // company_email: payload.company_email,
        // company_email: payload.company_email,
        // company_email: payload.company_email,
        // company_email: payload.company_email,
        // company_email: payload.company_email,
        // company_email: payload.company_email,
        // company_email: payload.company_email,

        presentor_name: new Date()
      }
      await payload.id ?
        this.$axios.$patch(`${this.$config.baseURL}/user/company-list/${payload.id}/update/`, content) :
        this.$axios.$post(`${this.$config.baseURL}/user/create-company/`, content)
      this.$router.push(`/company/${payload.end_user}`)
    },

    async deleteClient(_, payload) {
      await this.$axios.$delete(`${this.$config.baseURL}/user/company-list/${payload.id}/`)
      this.$router.push(`/company/${payload.end_user}`)
    }
  },
  getters: {
    is_loading: state => state.is_loading,
    company: state => state.company,
    company_list: state => state.company_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}