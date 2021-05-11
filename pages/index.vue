<template>
  <div class="mainpage-layout">
    <lazy-page-header :page_name="title"></lazy-page-header>
    <!-- <HomeNav></HomeNav>
    <div class="mainpage-content-panel">
      <LazyMainPage v-if="selected_tab == '/'"></LazyMainPage>
      <LazyMainPageCommunity v-if="selected_tab == '/main-community'"></LazyMainPageCommunity>
      <LazyMainPagePersonalisation v-if="selected_tab == '/main-personalisation' && !!is_guest"></LazyMainPagePersonalisation>
      <LazyMainPageMyGratus v-if="selected_tab == '/main-personalisation' && !is_guest"></LazyMainPageMyGratus>
    </div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "客戶列表",
      };
    },
    async fetch() {},
    computed: {
      // ...mapGetters({
      //   user: "user/current_user",
      //   get_current_menu: "menu/get_current_menu",
      //   menus_account: "menu/ordered_menus_account",
      // }),
    },
    created() {
      // if (!this.$store.hasModule("menu")) {
      //   this.$store.registerModule("menu", menu);
      // }
      // if (!this.$store.hasModule("user")) {
      //   this.$store.registerModule("user", user);
      // }
    },
    methods: {
      // onShowSearchBar(val) {},
      // clearSelectedAccountMenu() {},
    },
  };
</script>

<style scoped lang="scss">
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
