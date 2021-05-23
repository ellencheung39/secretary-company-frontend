<template>
  <div class="main-layout default-layout">
    <lazy-menu class="layout-menu-panel" />
    <div class="layout-content-panel">
      <lazy-header class="mainpage-header-panel" />
      <nuxt class="mainpage-content-panel" />
      <lazy-footer class="mainpage-footer-panel" />
    </div>
  </div>
</template>

<script>
  import user from "~/store/user";

  export default {
    async middleware({ store, redirect }) {
      await store.dispatch("user/getUserFromCookie");
      if (!store.state.user?.current_user?.token) {
        return redirect("/login");
      }
    },
    data() {
      return {};
    },
    fetch() {},
    computed: {},
    created() {
      if (!this.$store.hasModule("user")) {
        this.$store.registerModule("user", user);
      }
    },
    mounted() {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  .default-layout {
    display: grid;
    grid-template-columns: 300px auto;
  }

  .layout-menu-panel {
    grid-column: 1/2;
    z-index: 110;
  }
  .layout-content-panel {
    grid-column: 2/3;
    display: grid;
    grid-template-rows: 160px calc(100vh - 240px) 80px;
  }
  .mainpage-header-panel {
    grid-row: 1/2;
    z-index: 100;
  }
  .mainpage-content-panel {
    grid-row: 2/3;
    overflow: auto;
    padding: 15px;
  }
  .mainpage-footer-panel {
    grid-row: 3/4;
    z-index: 100;
  }
</style>
