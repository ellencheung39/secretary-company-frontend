<template>
  <div class="header-layout">
    <div class="main-header-panel">
      <span class="icon-panel finger">
        <fa-icon :icon="['fas','envelope']" size="lg" />
      </span>
      <span class="icon-panel finger">
        <fa-icon :icon="['fas','bell']" size="lg" />
      </span>
      <span class="user-panel finger">
        <span class="user-profile-image"></span>
        <span class="user-display-name">{{ user.display_name }}</span>
      </span>
      <span class="icon-panel finger">
        <fa-icon :icon="['fas','bars']" size="lg" />
      </span>
    </div>
    <div class="sub-header-panel" v-if="!!page">
      <div class="page-name">{{ page.page_name }}</div>
    </div>
  </div>
</template>

<script>
  import menu from "~/vuex/menu";
  import user from "~/vuex/user";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        page: "page",
        user: "user/current_user",
        get_current_menu: "menu/get_current_menu",
        menus_account: "menu/ordered_menus_account",
      }),
    },
    created() {
      if (!this.$store.hasModule("menu")) {
        this.$store.registerModule("menu", menu);
      }
      if (!this.$store.hasModule("user")) {
        this.$store.registerModule("user", user);
      }
    },
    async fetch() {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  .header-layout {
    display: grid;
    grid-template-rows: 100px 60px;
  }

  .main-header-panel {
    background-color: $white;
    box-shadow: $box-shadow;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > span {
      margin-right: 30px;
    }
  }

  .icon-panel {
    color: $gray-icon;
  }

  .user-panel {
    display: flex;
    align-items: center;
    .user-profile-image {
      background-color: $blue;
      border: 3px $gray-border solid;
      border-radius: 50px;
      display: inline-block;
      height: 50px;
      width: 50px;
      margin-right: 10px;
    }
    .user-display-name {
      color: $gray-header;
      font-size: 16px;
    }
  }

  .sub-header-panel {
    display: flex;
    height: 60px;
    align-items: center;
    background-color: $purple-pale;
  }

  .page-name {
    color: $purple;
    font-size: 22px;
    padding: 0 35px;
  }
</style>
