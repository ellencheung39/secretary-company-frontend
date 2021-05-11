const { v4: uuidv4 } = require('uuid');

export default {
  namespaced: true,
  state: () => ({
    device_guid: null,
    token: null
  }),
  mutations: {
    RESET_TEMPORARY_VARIABLES(state, payload) {
      state.temp = {};
    },
    SET_TOKEN(state, payload) {
      if (payload) {
        state.token = Object.freeze(payload);
      } else {
        state.token = null;
      }
    },
    SET_DEVICE_GUID(state, payload) {
      if (payload) {
        state.device_guid = Object.freeze(payload);
      }
    },
    SET_REDIRECT_URL_BASE_ADDRESS(state, payload) {
      state.redirect_url_base_address = Object.freeze(payload);
    }
  },
  actions: {
    getDeviceGuidFromCookie({ commit, dispatch }, payload) {
      var cookie_guid = this.$cookiz.get(this.$config.cookie_guid);
      if (cookie_guid) {
        cookie_guid = cookie_guid.replace(/"/g, '');
        commit('SET_DEVICE_GUID', cookie_guid);
        if (this.$config.cookie_domain == 'gratus.com.hk') {
          this.$cookiz.set(this.$config.cookie_guid, cookie_guid, {
            domain: this.$config.cookie_domain,
            maxAge: 60 * 60 * 24 * 365,
            path: '/'
          });
        } else {
          this.$cookiz.set(this.$config.cookie_guid, cookie_guid, {
            maxAge: 60 * 60 * 24 * 365,
            path: '/'
          });
        }
      } else {
        var cookie_guid = uuidv4();
        commit('SET_DEVICE_GUID', cookie_guid);
        if (this.$config.cookie_domain == 'gratus.com.hk') {
          this.$cookiz.set(this.$config.cookie_guid, cookie_guid, {
            domain: this.$config.cookie_domain,
            maxAge: 60 * 60 * 24 * 365,
            path: '/'
          });
        } else {
          this.$cookiz.set(this.$config.cookie_guid, cookie_guid, {
            maxAge: 60 * 60 * 24 * 365,
            path: '/'
          });
        }
      }
    },
    getTokenFromCookie({ commit, dispatch }, payload) {
      var token = this.$cookiz.get(this.$config.cookie_token);
      if (token) {
        commit('SET_TOKEN', JSON.parse(token));
        if (this.$cookiz.get(this.$config.cookie_guest)) {
          commit('SET_IS_GUEST', this.$cookiz.get(this.$config.cookie_guest) === 'true', { root: true });
        } else {
          commit('SET_IS_GUEST', true, { root: true });
        }
      } else {
        commit('SET_IS_GUEST', true, { root: true });
      }
    },
    getTokenFromGratus({ commit, dispatch, state }, payload) {
      var baseURL = this.$config.baseURL || 'http://localhost:9000/api';
  
      let refresh_token = (!!state.token && !!state.token.refresh_token) ? state.token.refresh_token : null;
  
      if (state.is_guest) {
        refresh_token = null;
      }
  
      return this.$axios.$post(`${baseURL}/login/token`, {
        m_MULTIMEDIA_TAG_ASSOC_PLATFORM: [{
          tag_id: this.getters['tag_id_platform']
        }],
        cookie_guid: state.device_guid,
        refresh_token: refresh_token
      }).then(res => {
        if (!!res && !!res.response_code && res.response_code === 200 &&
            !!res.response_result && !!res.response_result.Get_Access_Token_For_Login &&
            !!res.response_result.Get_Access_Token_For_Login.t_TOKEN) {
          var token = res.response_result.Get_Access_Token_For_Login.t_TOKEN;
          if (token) {
            commit('SET_TOKEN', token);
            if (this.$config.cookie_domain == 'gratus.com.hk') {
              this.$cookiz.set(this.$config.cookie_token, token, {
                domain: this.$config.cookie_domain,
                maxAge: 60 * 60 * 24 * 365,
                path: '/'
              });
            } else {
              this.$cookiz.set(this.$config.cookie_token, token, {
                maxAge: 60 * 60 * 24 * 365,
                path: '/'
              });
            }
            commit('SET_IS_GUEST', token.is_guest, { root: true });
            if (this.$config.cookie_domain == 'gratus.com.hk') {
              this.$cookiz.set(this.$config.cookie_guest, token.is_guest, {
                domain: this.$config.cookie_domain,
                maxAge: 60 * 60 * 24 * 365,
                path: '/'
              });
            } else {
              this.$cookiz.set(this.$config.cookie_guest, token.is_guest, {
                maxAge: 60 * 60 * 24 * 365,
                path: '/'
              });
            }
          }
        }
        // Unauthorized
        else if (!!res && !!res.response_code && res.response_code === 401) {
          // this.$router.push('/logout');
        }
      });
    },
    setTokenKey({ commit, dispatch, state }, payload){
      const token_key = getParameterByName('token_key');
      if (token_key) {
        var baseURL = this.$config.baseURL || 'http://localhost:9000/api';
        return this.$axios.$post(`${baseURL}/login/tokenKey`, {
          m_MULTIMEDIA_TAG_ASSOC_PLATFORM: [{
            tag_id: this.getters['tag_id_platform']
          }],
          token_key: token_key.toUpperCase()
        }).then(res => {
          if (!!res && !!res.response_code && res.response_code === 200 &&
              !!res.response_result && !!res.response_result.Get_Access_Token_For_Login_By_Token_Key &&
              !!res.response_result.Get_Access_Token_For_Login_By_Token_Key.token_json) {
            var token = JSON.parse(res.response_result.Get_Access_Token_For_Login_By_Token_Key.token_json);
            if (token) {
              commit('SET_TOKEN', token);
              if (this.$config.cookie_domain == 'gratus.com.hk') {
                this.$cookiz.set(this.$config.cookie_token, token, {
                  domain: this.$config.cookie_domain,
                  maxAge: 60 * 60 * 24 * 365,
                  path: '/'
                });
              } else {
                this.$cookiz.set(this.$config.cookie_token, token, {
                  maxAge: 60 * 60 * 24 * 365,
                  path: '/'
                });
              }
              commit('SET_IS_GUEST', token.is_guest, { root: true });
              if (this.$config.cookie_domain == 'gratus.com.hk') {
                this.$cookiz.set(this.$config.cookie_guest, token.is_guest, {
                  domain: this.$config.cookie_domain,
                  maxAge: 60 * 60 * 24 * 365,
                  path: '/'
                });
              } else {
                this.$cookiz.set(this.$config.cookie_guest, token.is_guest, {
                  maxAge: 60 * 60 * 24 * 365,
                  path: '/'
                });
              }
            }
          }
        });
      }
    },
    logout({ commit, dispatch, state }, payload) {
      commit('SET_TOKEN', null);
      this.$cookiz.remove(this.$config.cookie_token);
      window.location = this.$config.redirect_url_base_address;
    }
  },
  getters: {
    device_guid: state => state.device_guid,
    token: state => state.token
  },
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}