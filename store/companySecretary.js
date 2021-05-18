export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    current_company_secretary: {},
    company_secretary_list: [],
    limit: 20,
    count: 0,
    offset: null,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_CURRECT_COMPANY_SECRETARY(state, payload) {
      if (!payload) return;
      state.current_company_secretary = Object.freeze(payload);
    },
    SET_COMPANY_SECRETARY_LIST_REQUEST(state, payload) {
      if (!payload) return;
      state.limit = payload.limit;
      state.offset = payload.offset;
    },
    SET_COMPANY_SECRETARY_LIST_RETURN(state, payload) {
      console.log(payload)
      if (!payload) return;
      state.company_secretary_list = Object.freeze(payload.results);
      state.count = payload.count;
    },
  },
  actions: {
    async getCurrectCompanySecretary({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/user/manage/secretary-list/`, payload)
      commit('SET_CURRECT_COMPANY_SECRETARY', result.data);
    },
    async getCompanySecretaryList({ commit }, payload) {
      commit('SET_COMPANY_SECRETARY_LIST_REQUEST', payload);
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/manage/secretary-list/`, { params: { limit: payload.limit, offset: payload.offset } })
      console.log(result.data)
      commit('SET_COMPANY_SECRETARY_LIST_RETURN', result.data);
    },
    async saveCompanySecretary({ commit }, payload) {
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
        this.$axios.$patch(`${this.$config.baseURL}/user/manage/secretary-list/${payload.id}/update/`, content) :
        this.$axios.$post(`${this.$config.baseURL}/user/manage/create-secretary/`, content)
      commit('SET_CURRECT_COMPANY_SECRETARY', result.data);
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_company_secretary: state => state.current_company_secretary,
    company_secretary_list: state => state.company_secretary_list,
    limit: state => state.limit,
    offset: state => state.offset,
    count: state => state.count
  }
}