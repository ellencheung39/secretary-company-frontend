export default function ({ $axios, store }) {

  $axios.onRequest(config => {
    if (store.getters["user/token"]) {
      config.headers.common["Authorization"] = `Token ${store.getters["user/token"]}`;
    }
  });

  $axios.onResponse(response => {
    if (!response.data) throw 'no reponse'
    if (response.data.code != 0) throw response.data.message
  });
  $axios.onError(error => {
    console.log(error.response)
  });
}