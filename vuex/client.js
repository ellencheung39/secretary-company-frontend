export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    fields: [{
      label: "秘書公司名稱",
      type: "test",
      data_location: "name"
    }],
    current_client: {},
    client_list_data: [],
    client_list_search: {
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
    SET_CURRECT_CLIENT(state, payload) {
      if (!payload) return;
      state.current_client = Object.freeze(payload);
    },
    SET_CLIENT_LIST(state, payload) {
      if (!payload) return;
      state.client_list_data = Object.freeze(payload.clients);
      state.client_list_search = Object.freeze({
        search_text: payload.search_text,
        item_per_page: payload.item_per_page,
        page_no: payload.page_no,
        total_count: payload.total_count,
      });
    },
  },
  actions: {
    getDefaultCurrenctClient({ commit }) {
      commit('SET_CURRECT_CLIENT', {
        username: "George Martin"
      });
    },
    getDefaultClientList({ commit }, payload) {
      commit('SET_CLIENT_LIST', {
        search_text: payload?.search_text,
        item_per_page: 10,
        page_no: payload?.page_no || 1,
        total_count: 20,
        clients: [{
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
    async getCurrectClient({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/client`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_CLIENT', result.response_result);
      }
    },
    async getClientList({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/client`, payload)
      if (result.response_code == 200) {
        commit('SET_CLIENT_LIST', result.response_result);
      }
    },
    async saveClient({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/client`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_CLIENT', result.response_result);
      }
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_client: state => state.current_client,
    client_list_data: state => state.client_list_data,
    client_list_search: state => state.client_list_search,
    fields: state => state.fields
  }
}