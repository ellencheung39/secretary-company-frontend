export default function ({ $axios, store, redirect, route }) {
  //$axios.defaults.baseURL = 'https://www.coronafreemovement.com/api'; // store.$env.base_url;

  $axios.onRequest(config => {
    if (!!store.getters["login/token"]) {
      config.headers.common["Authorization"] = `Bearer ${store.getters["login/token"].access_token}`;
    }
    //client-side login interceptor!

    // var aURL = new URL(config.url);
    // if (aURL.pathname === '/api/product/productReview/add' || aURL.pathname === '/api/mainHome/hot/wishlist') {
    //   // console.log("pathname:", aURL.pathname);
    //   var is_guest = store.getters["login/is_guest"];
    //   if (!!is_guest) {
    //     console.log("is guest!");
    //     var languageId = store.getters["selected_system_language_id"]
    //     var msgObj = {
    //       '1': '請先登入',
    //       '2': '请先登入',
    //       '3': 'Please login first.'
    //     }
    //     var baseUrl= store.getters["login/redirect_url_base_address"];

    //     if (aURL.pathname === '/api/product/productReview/add') {
    //       store.dispatch('setDialogMessage', msgObj[languageId.toString()]);
    //     }
    //     if (aURL.pathname === '/api/mainHome/hot/wishlist') {
    //       redirect(baseUrl + '/login?return_url=%2F');
    //     }
    //     console.error("operation not allowed");
    //     // this.redirect('/login?return_url=%2F')
    //     return Promise.reject(msg);
    //   }
    // }

    // Development ONLY
    // if (window.location.href.includes("localhost")) {
    //   if (config.url.startsWith("v2")) {
    //     config.baseURL = 'http://192.168.124.104:55102/api';
    //   }
    // }

    if (config.url.includes('api/footprint')) {

      if (!config.data) config.data = {};

      config.data.api_timestamp = new Date().getTime();
      config.data.app_client_id = store.getters["app_client_id"];
      config.data.app_init_timestamp = store.getters["app_init_timestamp"];
      config.data.currency_id = store.getters["currency_id"];
      config.data.device_guid = store.getters["login/device_guid"];
      config.data.query_string = route.fullPath.substr(route.fullPath.indexOf('?'), route.fullPath.length);
      config.data.device_type_id = store.getters['device_type_id'];
      config.data.system_language_id = store.getters["selected_system_language_id"];
      config.data.t_TRACKING = store.getters["tracking/t_tracking"];

      // Add utm_tracking_id to t_TRACKING
      if (!config.data.t_TRACKING) config.data.t_TRACKING = {};
      config.data.t_TRACKING.utm_tracking_id = store.getters['utm_tracking_id'];

      // Extract params from t_PARAMS to root level
      if (!!config.data.t_PARAMS && !!config.data.t_PARAMS.app_page_id) {
        config.data.app_page_id = config.data.t_PARAMS.app_page_id;
      }
      if (!!config.data.t_PARAMS && !!config.data.t_PARAMS.app_page_section_id) {
        config.data.app_page_section_id = config.data.t_PARAMS.app_page_section_id;
      }

      // If first land on website, the app_page_timestamp should be counted from application startup
      if (!!config.data.t_TRACKING && !config.data.t_TRACKING.url_source) {
        config.data.app_page_timestamp = config.data.app_init_timestamp;
      } else {
        config.data.app_page_timestamp = store.getters["tracking/app_page_timestamp"];
      }

      // Copy url to t_TRACKING, if this is the first land then is_external equals to true
      if (!!config && !!config.data && !!config.data.url) {
        if (!config.data.t_TRACKING) config.data.t_TRACKING = {};
        config.data.t_TRACKING.url = config.data.url;
        config.data.t_TRACKING.is_external = (!config.data.t_TRACKING.url_source) ? true : false;
      }

    } else {

      config.data = {
        app_client_id: store.getters["app_client_id"],
        currency_id: store.getters["currency_id"],
        device_guid: store.getters["login/device_guid"],
        device_type_id: store.getters['device_type_id'],
        system_language_id: store.getters["selected_system_language_id"],
        tag_id_platform: store.getters['tag_id_platform'],
        t_PARAMS: config.data,
        t_TRACKING: store.getters["tracking/t_tracking"],
      }

      // Add utm_tracking_id to t_TRACKING
      if (!config.data.t_TRACKING) config.data.t_TRACKING = {};
      config.data.t_TRACKING.utm_tracking_id = store.getters['utm_tracking_id'];

      // Add member_referral_code, staff_id_referral, member_referral_code_shop, staff_id_referral_shop to t_TRACKING
      if (process.client) {
        ['member_referral_code', 'staff_id_referral', 'member_referral_code_shop', 'staff_id_referral_shop'].forEach(session_name => {
          config.data.t_TRACKING[session_name] = sessionStorage.getItem(session_name) || null;
        });
      }

      // config.data.system_language_id = store.getters["selected_system_language_id"]
      // config.data = {
      //   currency_id: 1,
      //   app_client_id: 'AAB7F779-577A-4447-BCA4-661048ABF00A',
      //   is_json_schema: false,
      //   device_guid: store.$cookiz.get('device_guid'),
      //   src_os : store.$cookiz.get('src_os'),
      //   device_os_version : store.$cookiz.get('device_os_version'),
      //   src_browser : store.$cookiz.get('src_browser'),
      //   device_type_id: store.getters["device_type_id"],
      //   query_string: route.query,
      //   //src_ip_address: store.getters["ip/ip_address"],
      //   system_language_id: store.getters["system-language/system_language_id"],
      //   loc_id_db_account: store.getters["login/loc_id_db_account"],
      //   account_id: store.getters["login/account_id"],
      //   t_PARAMS: config.data
      // }
    }

    // Enable loading page

    // if (!!config.data && !!config.data.no_need_loading) {
    //   store.dispatch('setIsNoNeedLoading', true);
    // } else {
    //   store.dispatch('setIsNoNeedLoading', false);
    // }
    // store.dispatch('setNoOfRequestCount', 1);
    // Set access token for authorization
    // Modified by Calvin Lam on 29 Jan 2019, No need to pass access token through headers since it is not secured
    // We will encrypt the token inside body_params and send to server
    // if (store.getters["signin/access_token"] !== null) {
    //   config.headers.common["Authorization"] = `Bearer ${store.getters["signin/access_token"]}`;
    // }

    // Encrypt data
    // config.data = (new Cryptography()).encrypt({
    //   t_PARAMS: config.data,
    //   system_language_id: store.getters["system-language/system_language_id"],
    //   //device_guid: store.getters["signin/device_guid"],
    //   device_type_id: store.getters["device_type_id"],
    //   //url: route.path,
    //   query_string: route.query,
    //   currency_id: 1
    // });

    //console.log('plugin/axios.js/$axios.onRequest');
    //console.log(config.data);
    //console.log('Making request to ' + config.url)
  });

  $axios.onResponse(response => {
    if (!!response) {
      if (!!response.data) {
        if (!!response.data.response_code && response.data.response_code !== 200 && response.data.response_code !== 600) {
          // Ignore error returned from footprint and MongoNetworkError
          // if (!!response.config && !!response.config.url && !response.config.url.includes('api/footprint')) {
          //   store.dispatch('setDialogMessage', response.data.response_message);
          // }
          if ((!!response.config && !!response.config.url && !response.config.url.includes('api/footprint')) &&
              (!!response.data && !!response.data.response_message && !response.data.response_message.includes('MongoNetworkError'))) {
            store.dispatch('setDialogMessage', response.data.response_message);
          }
        }
      }
    }
    // if (!response.config.baseURL.includes('arcgis') &&
    //     response.config.url !== 'pq_Get_NoOfMovementJoiner' &&
    //     response.config.url !== 'pt_Save_TrackingLog' &&
    //     response.config.url !== 'pq_Get_IpLocation') {
    //   store.dispatch('setIsLoading', -1);
    // }

    // if ((response.data.response_code === process.env.response_code.success) &&
    //   (!!response.data.response_result && Object.keys(response.data.response_result).length > 0)) {

    //   response.data.response_result = response.data.response_result[Object.keys(response.data.response_result)];
    //  }
    // if (response.data.response_code === process.env.response_code.unauthorized) {
    //   // Handle unauthorized action returned from web API, logout the user and ask them to login again
    //   var pathname = route.fullPath;
    //   store.dispatch('signin/logout').then(() => {
    //     store.dispatch('initialize');
    //   });
    //   console.log(pathname)
    //   if (pathname.indexOf('/signin') >= 0) {
    //     store.dispatch('setDialogMessage', response.data.response_message).then(() => {
    //     });
    //   }
    //   else if (pathname.indexOf('/cms') >= 0) {
    //     redirect('/cms/signin?returnUrl=' + pathname);
    //   }
    //   else {
    //     redirect('/signin?returnUrl=' + pathname);
    //   }
    // } else {
  });

  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status);
    // console.log(error);
    // switch (code) {
    //   default:
    //     store.dispatch('setDialogMessage', error.response);
    //     break;
    // }
  })
}