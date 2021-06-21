import orderBy from "lodash/orderBy";
import filter from "lodash/filter";

export default {
  namespaced: true,
  state: () => ({
    menus: [],
    selected_menu: {},
  }),
  mutations: {
    SET_MENUS(state, payload) {
      if (!payload) return;
      state.menus = Object.freeze(payload);
    },
    SET_SELECTED_MENU(state, payload) {
      state.selected_menu = Object.freeze(payload);
    }
  },
  actions: {
    getMenus({ commit, rootState }) {
      if (!rootState.user || !rootState.user.user_type) return
      let user_type = rootState.user.user_type
      commit('SET_MENUS', [
        user_type == 9 ? {
          menu_id: "1_1", menu_type_id: 1, icon: ['fas', 'th-large'], menu_name: '秘書公司列表', url: '/companySecretary/',
          sub_menus: [
            { menu_id: "1_2", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '新增/修改秘書公司', url: '/companySecretary/edit/' },
            { menu_id: "1_3", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '移除秘書公司', url: '/companySecretary/delete/', is_disable: true }
          ]
        } : null,
        user_type == 9 || user_type == 1 ? {
          menu_id: "2_1", menu_type_id: 1, icon: ['fas', 'folder'], menu_name: '客戶列表', url: '/client/',
          sub_menus: user_type == 1 ? [
            { menu_id: "2_2", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '新增/修改客戶', url: '/client/edit/' },
            { menu_id: "2_3", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '移除客戶', url: '/client/delete/', is_disable: true }
          ] : null
        } : null,
        {
          menu_id: "3_1", menu_type_id: 1, icon: ['fas', 'folder'], menu_name: '公司列表', url: '/company/',
          sub_menus: user_type == 1 ? [
            { menu_id: "3_2", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '新增公司', url: '/company/create/', is_disable: true },
            { menu_id: "3_3", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '修改公司', url: '/company/edit/', is_disable: true },
            { menu_id: "3_4", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '移除公司', url: '/company/delete/', is_disable: true }
          ] : null
        },
        {
          menu_id: "4_1", menu_type_id: 1, icon: ['fas', 'folder'], menu_name: '文件清單', url: '/document/',
          sub_menus: [
            { menu_id: "4_2", menu_type_id: 1, icon: ['fas', 'file-alt'], menu_name: '新的提交', url: '/document/create/' },
            // { menu_id: "4_3", menu_type_id: 1, icon: ['fas', 'shopping-cart'], menu_name: '待確定的提交', url: '/document/approval/' }
          ]
        },
        { menu_id: "5_1", menu_type_id: 1, icon: ['fas', 'user-alt'], menu_name: '設定', url: '/setting/' },
      ]);
    },
    setSelectedMenu({ commit }, payload) {
      commit('SET_SELECTED_MENU', payload)
    }
  },
  getters: {
    menus: state => state.menus,
    selected_menu: state => state.selected_menu,
    ordered_menus: state => orderBy(filter(state.menus, { menu_type_id: 1 }), ['display_seq']),
    ordered_menus_account: state => orderBy(filter(state.menus, { menu_type_id: 2 }), ['display_seq']),
  }
}