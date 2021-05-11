export default function ({ $axios, store, redirect, route }) {

  $axios.onRequest(config => {
    if (store.getters["user/token"]) {
      config.headers.common["Authorization"] = `Bearer ${store.getters["user/token"].access_token}`;
    }

    

    // if (!!config.data && !!config.data.no_need_loading) {
    //   store.dispatch('setIsNoNeedLoading', true);
    // } else {
    //   store.dispatch('setIsNoNeedLoading', false);
    // }
  });

  $axios.onResponse(response => {

  });

  $axios.onError(error => {

  })
}