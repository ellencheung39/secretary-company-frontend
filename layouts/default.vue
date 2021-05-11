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
  import user from "~/vuex/user";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        auth: "user/token",
      }),
    },
    created() {
      if (!this.$store.hasModule("user")) {
        this.$store.registerModule("user", user);
      }
    },
    async fetch() {
      await this.$store.dispatch("user/getDefaultCurrenctUser");
    },
    middleware({ store, redirect }) {
      if (!store.state.user) {
        // return redirect("/login");
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
