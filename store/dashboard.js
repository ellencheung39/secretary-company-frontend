export default {
  namespaced: true,
  state: () => ({
    is_loading: false,
    dashboard_report: {},
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.is_loading = payload;
    },
    SET_DASHBOARD_REPORT(state, payload) {
      if (!payload) return;
      state.dashboard_report = Object.freeze(payload);
    },
  },
  actions: {
    async getDashboardReport({ commit }, payload) {
      let result = await this.$axios.$get(`${this.$config.baseURL}/user/report/dashboard-user-file-count/`, payload)
      commit('SET_DASHBOARD_REPORT', result.data);
    },
  },
  getters: {
    is_loading: state => state.is_loading,
    dashboard_report: state => state.dashboard_report,
  }
}