export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    fields: [{
      label: "秘書公司名稱",
      type: "test",
      data_location: "name"
    }],
    current_document: {},
    document_list_data: [],
    document_list_search: {
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
    SET_CURRECT_DOCUMENT(state, payload) {
      if (!payload) return;
      state.current_document = Object.freeze(payload);
    },
    SET_DOCUMENT_LIST(state, payload) {
      if (!payload) return;
      state.document_list_data = Object.freeze(payload.documents);
      state.document_list_search = Object.freeze({
        search_text: payload.search_text,
        item_per_page: payload.item_per_page,
        page_no: payload.page_no,
        total_count: payload.total_count,
      });
    },
  },
  actions: {
    getDefaultCurrentDocument({ commit }) {
      commit('SET_CURRECT_DOCUMENT', {
        username: "George Martin"
      });
    },
    getDefaultDocumentList({ commit }, payload) {
      commit('SET_DOCUMENT_LIST', {
        search_text: payload?.search_text,
        item_per_page: 10,
        page_no: payload?.page_no || 1,
        total_count: 20,
        documents: [{
          id: 1,
          sn: "121",
          ci: "2639556",
          br: "68804682",
          document_name: "NAR1 周年申報表",
          document_path: "NAR1_2021.pdf",
          client_name: "K&G Distributors",
          upload_dt: "31-3-2021 12:00"
        }, {
          id: 1,
          sn: "121",
          ci: "2639556",
          br: "68804682",
          document_name: "NAR1 周年申報表",
          document_path: "NAR1_2021.pdf",
          client_name: "K&G Distributors",
          upload_dt: "31-3-2021 12:00"
        }, {
          id: 1,
          sn: "121",
          ci: "2639556",
          br: "68804682",
          document_name: "NAR1 周年申報表",
          document_path: "NAR1_2021.pdf",
          client_name: "K&G Distributors",
          upload_dt: "31-3-2021 12:00"
        }, {
          id: 1,
          sn: "121",
          ci: "2639556",
          br: "68804682",
          document_name: "NAR1 周年申報表",
          document_path: "NAR1_2021.pdf",
          client_name: "K&G Distributors",
          upload_dt: "31-3-2021 12:00"
        }]
      });
    },
    async getCurrectDocument({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/document`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_DOCUMENT', result.response_result);
      }
    },
    async getDocumentList({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/document`, payload)
      if (result.response_code == 200) {
        commit('SET_DOCUMENT_LIST', result.response_result);
      }
    },
    async saveDocument({ commit }, payload) {
      let result = await this.$axios.$post(`${this.$config.baseURL}/document`, payload)
      if (result.response_code == 200) {
        commit('SET_CURRECT_DOCUMENT', result.response_result);
      }
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    current_document: state => state.current_document,
    document_list_data: state => state.document_list_data,
    document_list_search: state => state.document_list_search,
    fields: state => state.fields
  }
}