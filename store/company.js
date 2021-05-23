export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    current_company: {},
    company_list: [],
    limit: 20,
    count: 0,
    offset: null,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_CURRENT_COMPANY(state, payload) {
      if (!payload) return;
      state.current_company = Object.freeze(payload);
    },
    SET_COMPANY_LIST_REQUEST(state, payload) {
      if (!payload) return;
      state.limit = payload.limit;
      state.offset = payload.offset;
    },
    SET_COMPANY_LIST_RESPONSE(state, payload) {
      if (!payload) return;
      state.company_secretary_list = Object.freeze(payload.results);
      state.count = payload.count;
    },
  },
  actions: {
    async getCurrentCompany({ commit }, payload) {
      // let result = await this.$axios.$post(`${this.$config.baseURL}/user/company-list/`, payload)
      // commit('SET_CURRENT_COMPANY', result.data)
      commit('SET_CURRENT_COMPANY', {});
    },
    async getDefaultCompanyList({ commit, state }) {
      if (state.offset !== null) return
      commit('SET_COMPANY_LIST_REQUEST', { limit: 20, offset: 0 });
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/company-list/`, { params: { limit: 20, offset: 0 } })
      commit('SET_COMPANY_LIST_RESPONSE', result.data);
    },
    async getCompanyList({ commit }, payload) {
      commit('SET_COMPANY_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/company-list/`, { params: { limit: payload.limit, offset: payload.offset } })
      commit('SET_COMPANY_LIST_RESPONSE', result.data);
    },
    async saveCompany({ commit }, payload) {
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
        this.$axios.$patch(`${this.$config.baseURL}/user/company-list/${payload.id}/update/`, content) :
        this.$axios.$post(`${this.$config.baseURL}/user/create-company/`, content)
      commit('SET_CURRENT_COMPANY', result.data);
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_company: state => state.current_company,
    company_list: state => state.company_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}