// Enable to directly update vuex store
export const strict = false;

// Declare variables here retain until application shut down
export const state = () => ({
  cookie_max_age: 60 * 60 * 24 * 365 * 10,
  dialog_message: null,
  dialog_callback: null,
  fullpage_loading: false,
  is_guest: true,
  member: null,
  window_width: 0,
  page_y_offset: 0,
  page: {}
});

export const mutations = {
  SET_PAGE(state, payload) {
    state.page = Object.freeze(payload);
  },
  SET_DIALOG_MESSAGE(state, payload) {
    state.dialog_message = payload;
    if (!payload) {
      state.dialog_callback = null;
    }
  },
  SET_DIALOG_MESSAGE_WITH_CALLBACK(state, payload) {
    state.dialog_message = payload.message;
    state.dialog_callback = payload.callback;
  },
  SET_LAYOUT(state, payload) {
    if (!payload) return;
    state.window_width = payload.width;
  },
  SET_LOADING(state, payload) {
    state.fullpage_loading = payload;
  },
  SET_MEMBER(state, payload) {
    if (!payload) return;

    if (!!payload && Object.keys(payload).length > 0 && !!payload.m_MEMBER) {
      state.member = Object.freeze(payload.m_MEMBER);
    } else {
      state.member = {};
    }
  },
  SET_PAGE_Y_OFFSET(state, payload) {
    if (!payload) return;

    state.page_y_offset = payload.page_y_offset;
  },
};

export const actions = {
  setPage({ commit }, payload) {
    commit('SET_PAGE', payload);
  },
  setDialogMessage({ commit }, payload) {
    commit('SET_DIALOG_MESSAGE', payload);
  },
  setDialogMessageWithCallback({ commit }, payload) {
    commit('SET_DIALOG_MESSAGE_WITH_CALLBACK', payload);
  },
  setLayout({ commit }, payload) {
    commit('SET_LAYOUT', payload);
  },
  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload);
  },
  setPageYOffset({ commit }, payload) {
    commit('SET_PAGE_Y_OFFSET', payload);
  }
};

export const getters = {
  page: state => state.page,
  dialog_callback: state => state.dialog_callback,
  dialog_message: state => state.dialog_message,
  fullpage_loading: state => state.fullpage_loading,
  member: state => state.member,
  page_y_offset: state => state.page_y_offset,
  window_width: state => state.window_width,
};