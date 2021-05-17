export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    fields: [{
      label: "秘書公司名稱",
      type: "test",
      data_location: "name"
    }],
    current_company: {},
    company_list_data: [],
    company_list_search: {
      search_text: "",
      item_per_page: 10,
      page_no: 1,
      total_count: 20,
    }
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_CURRECT_Company(state, payload) {
      if (!payload) return;
      state.current_company = Object.freeze(payload);
    },
    SET_Company_LIST(state, payload) {
      if (!payload) return;
      state.company_list_data = Object.freeze(payload.companys);
      state.company_list_search = Object.freeze({
        search_text: payload.search_text,
        item_per_page: payload.item_per_page,
        page_no: payload.page_no,
        total_count: payload.total_count,
      });
    },
  },
  actions: {
    getDefaultCurrentCompany({ commit }) {
      commit('SET_CURRECT_Company', {
        id: 1,
        cr: "2639556",
        br: "68804682",
        mobile_no: "12345678",
        email: "email",
        register_dt: "12345678",
        company_name: "K&G Distributors",
        company_name_tc: "K&G Distributors",
        company_name_en: "Y&Co Distributors",
        company_secretary: "AND CPA Limited",
        chairperson: ["abc", 'efg'],
        shareholder: ["abc", 'efg']
      });
    },
    getDefaultCompanyList({ commit }, payload) {
      commit('SET_Company_LIST', {
        search_text: payload?.search_text,
        item_per_page: 10,
        page_no: payload?.page_no || 1,
        total_count: 20,
        companys: [{
          id: 1,
          cr: "2639556",
          br: "68804682",
          company_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }, {
          id: 1,
          cr: "2639556",
          br: "68804682",
          company_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }, {
          id: 1,
          cr: "2639556",
          br: "68804682",
          company_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }, {
          id: 1,
          cr: "2639556",
          br: "68804682",
          company_name: "K&G Distributors",
          company_name_tc: "K&G Distributors",
          company_name_en: "Y&Co Distributors",
          company_secretary: "AND CPA Limited"
        }]
      });
    },
    async getCurrectCompany({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/company`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_Company', result.response_result);
      }
    },
    async getCompanyList({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/company`, payload)
      if (result.response_code == 200) {
        commit('SET_Company_LIST', result.response_result);
      }
    },
    async saveCompany({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/company`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_Company', result.response_result);
      }
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_company: state => state.current_company,
    company_list_data: state => state.company_list_data,
    company_list_search: state => state.company_list_search,
    fields: state => state.fields
  }
}