export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    fields: [{
      label: "秘書公司名稱",
      type: "test",
      data_location: "name"
    }],
    current_company_secretary: {},
    company_secretary_list_data: [],
    company_secretary_list_search: {
      search_text: "",
      item_per_page: 10,
      page_no: 1,
      total_count: 20,
    }
  }),
  mutations: {
    RESET_TEMPORARY_VARIABLES(state, payload) {
      state.temp = {};
    },
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_CURRECT_COMPANY_SECRETARY(state, payload) {
      if (!payload) return;
      state.current_company_secretary = Object.freeze(payload);
    },
    SET_COMPANY_SECRETARY_LIST(state, payload) {
      if (!payload) return;
      state.company_secretary_list_data = Object.freeze(payload.company_secretarys);
      state.company_secretary_list_search = Object.freeze({
        search_text: payload.search_text,
        item_per_page: payload.item_per_page,
        page_no: payload.page_no,
        total_count: payload.total_count,
      });
    },
  },
  actions: {
    getDefaultCurrenctCompanySecretary({ commit }) {
      commit('SET_CURRECT_COMPANY_SECRETARY', {
        username: "George Martin",
        company_secretary: "ABC Com Sec Limited"
      });
    },
    getDefaultCompanySecretaryList({ commit }, payload) {
      commit('SET_COMPANY_SECRETARY_LIST', {
        search_text: payload?.search_text,
        item_per_page: 10,
        page_no: payload?.page_no || 1,
        total_count: 20,
        company_secretarys: [{
          id: 1,
          cr: "2639556",
          br: "68804682",
          client_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }, {
          id: 1,
          cr: "2639556",
          br: "68804682",
          client_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }, {
          id: 1,
          cr: "2639556",
          br: "68804682",
          client_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }, {
          id: 1,
          cr: "2639556",
          br: "68804682",
          client_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }]
      });
    },
    async getCurrectCompanySecretary({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/company_secretary`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_COMPANY_SECRETARY', result.response_result);
      }
    },
    async getCompanySecretaryList({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/company_secretary`, payload)
      if (result.response_code == 200) {
        commit('SET_COMPANY_SECRETARY_LIST', result.response_result);
      }
    },
    async saveCompanySecretary({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/company_secretary`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_COMPANY_SECRETARY', result.response_result);
      }
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_company_secretary: state => state.current_company_secretary,
    company_secretary_list_data: state => state.company_secretary_list_data,
    company_secretary_list_search: state => state.company_secretary_list_search,
    fields: state => state.fields
  }
}