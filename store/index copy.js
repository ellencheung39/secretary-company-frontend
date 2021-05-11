// Enable to directly update vuex store
export const strict = false;

// Declare variables here retain until application shut down
export const state = () => ({
  app_client_id: 'AAB7F779-577A-4447-BCA4-661048ABF00A',
  app_init_timestamp: new Date().getTime(),
  cookie_max_age: 60 * 60 * 24 * 365 * 10,
  currency_id: 1,
  device_type_id: 3,
  dialog_message: null,
  dialog_callback: null,
  fullpage_loading: false,
  is_guest: true,
  is_in_app: false,
  is_webp_supported: false,
  member: null,
  selected_system_language_id: 1, // default: Traditional Chinese
  system_languages: [{
    system_language_id: 1,
    system_language_code: 'zh_hk',
    system_language_short: '繁',
    system_language_name: '繁體中文',
    seq_no: 1
  }, {
    system_language_id: 2,
    system_language_code: 'zh_cn',
    system_language_short: '简',
    system_language_name: '简体中文',
    seq_no: 2
  }, {
    system_language_id: 3,
    system_language_code: 'en_us',
    system_language_short: 'ENG',
    system_language_name: 'English',
    seq_no: 3
  }],
  tag_id_platform: 82, // desktop: 82, mobile: 83
  tag_id_platform_desktop: 82,
  tag_id_platform_mobile: 83,
  utm_tracking_id: null,
  window_width: 0,
  page_y_offset: 0,
});

export const mutations = {
  RESET_TEMPORARY_VARIABLES(state, payload) {
    state.temp = {};
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
  SET_IN_APP(state, payload) {
    state.is_in_app = payload;
  },
  SET_IS_GUEST(state, payload) {
    state.is_guest = Object.freeze(payload);
  },
  SET_IS_WEBP_SUPPORT(state, payload) {
    state.is_webp_supported = payload;
  },
  SET_LAYOUT(state, payload) {
    if (!payload) return;

    if (payload.width < 768) {
      state.tag_id_platform = 83;
    } else {
      state.tag_id_platform = 82;
    }
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
  SET_UTM_TRACKING_ID(state, payload) {
    if (!payload) return;
    state.utm_tracking_id = Number(payload.utm_tracking_id);
  },
  SET_PAGE_Y_OFFSET(state, payload) {
    if (!payload) return;

    state.page_y_offset = payload.page_y_offset;
  },
  SET_SYSTEM_LANGUAGE_ID(state, payload) {
    if (payload) {
      state.selected_system_language_id = payload;
    }
  },
};

export const actions = {
  // async nuxtServerInit ({ dispatch, commit }, { req }) {
  //   //console.log('nuxtServerInit');
  // },
  resetAllTemporaryVariables({ commit }) {
    Object.keys(this._mutations).forEach(key => {
      if (key.indexOf("RESET_TEMPORARY_VARIABLES") > -1) {
        commit(`${key}`);
      }
    });
  },
  async verifyBrowserSupportWebp({ dispatch, commit }) {
    var webp = new Image();
    webp.onerror = function() {
      commit('SET_IS_WEBP_SUPPORT', false);
    };
    webp.onload = function() {
      commit('SET_IS_WEBP_SUPPORT', true);
    };
    webp.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
  },
  getMemberForLogin({ commit, rootGetters }, payload) {
    var baseURL = this.$config.baseURL || 'http://localhost:9000/api';
    return this.$axios.$post(`${baseURL}/member/getMember`, payload).then(res => {
      if (res.response_code == 200) {
        var result = res.response_result.Get_Member_For_Login;
        commit('SET_MEMBER', result);
      }
    });
  },
  getSystemLanguageFromCookie({ commit,  state, dispatch }, payload) {
    var system_language_id = this.$cookiz.get(this.$config.cookie_system_language_id);
    if (!system_language_id) {
      for (var i = 0, len = state.system_languages.length; i < len; i++) {
        if (state.system_languages[i].system_language_code === this.$i18n.locale) {
          commit('SET_SYSTEM_LANGUAGE_ID', state.system_languages[i].system_language_id);
          // Check if domain name is production, then need to write to domain cookie
          if (this.$config.cookie_domain == 'gratus.com.hk') {
            this.$cookiz.set(this.$config.cookie_version, this.$config.cookie_version_value, {
              domain: this.$config.cookie_domain,
              maxAge: 60 * 60 * 24 * 365,
              path: '/'
            });
            this.$cookiz.set(this.$config.cookie_system_language_id, state.system_languages[i].system_language_id, {
              domain: this.$config.cookie_domain,
              maxAge: 60 * 60 * 24 * 365,
              path: '/'
            });
          } else {
            // This cookie is set to subdomain
            this.$cookiz.set(this.$config.cookie_version, this.$config.cookie_version_value, {
              maxAge: 60 * 60 * 24 * 365,
              path: '/'
            });
            this.$cookiz.set(this.$config.cookie_system_language_id, state.system_languages[i].system_language_id, {
              maxAge: 60 * 60 * 24 * 365,
              path: '/',
            });
          }
          break;
        }
      }
    } else {
      for (var i = 0, len = state.system_languages.length; i < len; i++) {
        if (state.system_languages[i].system_language_id == system_language_id) {
          commit('SET_SYSTEM_LANGUAGE_ID', state.system_languages[i].system_language_id);
          this.$i18n.setLocale(state.system_languages[i].system_language_code);
          // Check if domain name is production, then need to write to domain cookie
          if (this.$config.cookie_domain == 'gratus.com.hk') {
            this.$cookiz.set(this.$config.cookie_version, this.$config.cookie_version_value, {
              domain: this.$config.cookie_domain,
              maxAge: 60 * 60 * 24 * 365,
              path: '/'
            });
            this.$cookiz.set(this.$config.cookie_system_language_id, state.system_languages[i].system_language_id, {
              domain: this.$config.cookie_domain,
              maxAge: 60 * 60 * 24 * 365,
              path: '/'
            });
          } else {
            // This cookie is set to subdomain
            this.$cookiz.set(this.$config.cookie_version, this.$config.cookie_version_value, {
              maxAge: 60 * 60 * 24 * 365,
              path: '/'
            });
            this.$cookiz.set(this.$config.cookie_system_language_id, state.system_languages[i].system_language_id, {
              maxAge: 60 * 60 * 24 * 365,
              path: '/'
            });
          }
          break;
        }
      }
    }
  },
  getUtmTrackingIdFromQueryString({ commit, rootGetters }, payload) {
    if (!payload.utm_tracking_id) return;

    commit('SET_UTM_TRACKING_ID', payload);
  },
  saveUtmTrackingToGratus({ commit, getters }, payload) {
    if (getters["utm_tracking_id"]) return;

    var baseURL = this.$config.baseURL || 'http://localhost:9000/api';
    return this.$axios.$post(`${baseURL}/campaign/utm/save`, payload).then(res => {
      if (res.response_code == 200) {
        var result = res.response_result.Save_Utm_Tracking_For_Access;
        commit('SET_UTM_TRACKING_ID', result);
      }
    });
  },
  setDialogMessage({ commit }, payload) {
    commit('SET_DIALOG_MESSAGE', payload);
  },
  setDialogMessageWithCallback({ commit }, payload) {
    commit('SET_DIALOG_MESSAGE_WITH_CALLBACK', payload);
  },
  setInApp({ commit }, payload) {
    commit('SET_IN_APP', payload);
  },
  setLayout({ commit }, payload) {
    commit('SET_LAYOUT', payload);
  },
  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload);
  },
  setPageYOffset({ commit }, payload) {
    commit('SET_PAGE_Y_OFFSET', payload);
  },
  setSystemLanguage({ commit, dispatch }, payload) {
    commit('SET_SYSTEM_LANGUAGE_ID', payload.system_language_id);
    this.$i18n.setLocale(payload.system_language_code);
    if (this.$config.cookie_domain == 'gratus.com.hk') {
      this.$cookiz.set(this.$config.cookie_version, this.$config.cookie_version_value, {
        domain: this.$config.cookie_domain,
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
      });
      this.$cookiz.set(this.$config.cookie_system_language_id, payload.system_language_id, {
        domain: this.$config.cookie_domain,
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
      });
    } else {
      this.$cookiz.set(this.$config.cookie_version, this.$config.cookie_version_value, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
      });
      this.$cookiz.set(this.$config.cookie_system_language_id, payload.system_language_id, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
      });
    }
  }
};

export const getters = {
  app_client_id: state => state.app_client_id,
  app_init_timestamp: state => state.app_init_timestamp,
  currency_id: state => state.currency_id,
  device_type_id: state => state.device_type_id,
  dialog_callback: state => state.dialog_callback,
  dialog_message: state => state.dialog_message,
  fullpage_loading: state => state.fullpage_loading,
  is_guest: state => state.is_guest,
  is_in_app: state => state.is_in_app,
  is_webp_supported: state => state.is_webp_supported,
  member: state => state.member,
  page_y_offset: state => state.page_y_offset,
  selected_system_language_id: state => state.selected_system_language_id,
  system_languages: state => state.system_languages,
  tag_id_platform: state => state.tag_id_platform,
  tag_id_platform_desktop: state => state.tag_id_platform_desktop,
  tag_id_platform_mobile: state => state.tag_id_platform_mobile,
  utm_tracking_id: state => state.utm_tracking_id,
  window_width: state => state.window_width,
};