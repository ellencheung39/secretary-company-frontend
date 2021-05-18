export default function ({ $axios, store }) {

  $axios.onRequest(config => {
    if (store.getters["user/current_user"]) {
      config.headers.common["Authorization"] = `Token ${store.getters["user/current_user"].token}`;
    }
  });

  $axios.onResponse(response => {
    if (response.data?.code != 0) throw response.data?.message
  });

}