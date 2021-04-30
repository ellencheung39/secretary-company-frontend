import orderBy from "lodash/orderBy";
import filter from "lodash/filter";

export default {
  namespaced: true,
  state: () => ({
    cookie_max_age: 60 * 60 * 24 * 365 * 10,
    menu: {},
    selected_menu: {},
    show_side_menu: false,
    show_search_bar: false,
  }),
  mutations: {
    RESET_TEMPORARY_VARIABLES(state, payload) {
      state.temp = {};
    },
    SET_MENU(state, payload) {
      if (!payload) return;
  
      state.menu = Object.freeze(payload);
      if (state.menu.m_MENU.length > 0) {
        state.selected_menu = Object.freeze(state.menu.m_MENU[0]);
      }
    },
    SET_MENUS(state, payload) {
      if (!payload) return;
      if (!payload.menu) return;
  
      state.menu = Object.freeze(payload.menu);
      if (!!state.menu && state.menu.m_MENU.length > 0) {
        state.selected_menu = Object.freeze(state.menu.m_MENU[0]);
      }
    },
    SET_SELECTED_MENU(state, payload) {
      state.selected_menu = Object.freeze(payload);
    },
    SET_SHOW_SIDE_MENU(state, payload) {
      state.show_side_menu = payload;
    },
    SET_SHOW_SEARCH_BAR(state, payload) {
      state.show_search_bar = payload;
    },
  },
  actions: {
    clearSelectedMenu({ commit }) {
      commit('SET_SELECTED_MENU', {});
    },
    getMenuFromGratus({ commit, rootGetters }, payload) {
      var baseURL = this.$config.baseURL || 'http://localhost:9000/api';
      return this.$axios.$post(`${baseURL}/menu/gratus`, payload).then(res => {
        if (res.response_code == 200) {
          var result = res.response_result.Get_Menus_For_Sitemap;
          commit('SET_MENU', result);
        }
      });
    },
    getMenuFromMongoDB({ commit, rootGetters }, payload) {
      var baseURL = this.$config.baseURL || 'http://localhost:9000/api';
      return this.$axios.$post(`${baseURL}/menu/mongodb`, payload).then(res => {
        if (res.response_code == 200) {
          var result = res.response_result;
          commit('SET_MENUS', result);
        }
      });
    },
    setSelectedMenu({ commit }, payload) {
      commit('SET_SELECTED_MENU', payload);
    },
    setShowSideMenu({ commit }, payload) {
      commit('SET_SHOW_SIDE_MENU', payload);
    },
    setShowSearchBar({ commit }, payload) {
      commit('SET_SHOW_SEARCH_BAR', payload);
    },
  },
  getters: {
    menu: state => state.menu,
    selected_menu: state => state.selected_menu,
    show_side_menu: state => state.show_side_menu,
    show_search_bar: state => state.show_search_bar,
    ordered_menu: state => orderBy(filter(state.menu.m_MENU, { 'menu_type_id': 1 }), ['display_seq']),
    ordered_menu_my_account: state => orderBy(filter(state.menu.m_MENU, { 'menu_type_id': 3 }), ['display_seq']),
    ordered_footer_about: state => getOrderedFooterItem(state.menu.m_MENU, 12),
    ordered_footer_information: state => getOrderedFooterItem(state.menu.m_MENU, 13),
    ordered_footer_bottom: state => orderBy(filter(state.menu.m_MENU, { 'menu_type_id': 6 }), ['display_seq']),
  }
}

const getOrderedFooterItem = function(item, menu_type_id) {
  const footerItem = filter(item, { 'menu_type_id': menu_type_id })[0];
  if (!footerItem) return null;
  return {
    ...footerItem,
    m_SUBMENU: orderBy(footerItem.m_SUBMENU, ['display_seq'])
  };
}