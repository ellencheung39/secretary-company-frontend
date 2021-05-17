<template>
  <div class="menu-layout">
    <nuxt-link class="logo-panel" to="/">
      <logo />
    </nuxt-link>
    <div class="menu-panel" @mouseleave="clearSelectedMenu()">
      <div v-for="(m, m_i) in menus" :key="`menu_${m_i}`" @mouseover="preSelectMenu(m)">
        <nuxt-link class="menu-item" :to="m.url" :class="{ selected: isCurrentPage(m.url) }">
          <div class="icon-panel">
            <fa-icon :icon="m.icon" />
          </div>
          <div class="menu-name">{{ m.menu_name }}</div>
        </nuxt-link>
        <div v-show="isCurrentMainPage(m.url) || (!!selected_menu && selected_menu.menu_id === m.menu_id)" class="sub-menu">
          <nuxt-link v-for="(sm, sm_i) in m.sub_menus" :key="`sub_menu_${m_i}_${sm_i}`" :to="sm.url" class="menu-item" :class="{ selected: isCurrentMainPage(sm.url) }">
            <div class="icon-panel">
              <fa-icon :icon="sm.icon" />
            </div>
            <div class="menu-name">{{ sm.menu_name }}</div>
          </nuxt-link>
        </div>
      </div>
      <div>
        <div class="menu-item" @click="logout()">
          <div class="icon-panel">
            <fa-icon :icon="['fas', 'power-off']" />
          </div>
          <div class="menu-name">登出</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import menu from "~/store/menu";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {};
    },
    async fetch() {
      await this.$store.dispatch("menu/getDefaultMenus");
    },
    computed: {
      ...mapGetters({
        menus: "menu/ordered_menus",
        selected_menu: "menu/selected_menu",
      }),
    },
    created() {
      if (!this.$store.hasModule("menu")) {
        this.$store.registerModule("menu", menu);
      }
    },
    methods: {
      isCurrentMainPage(url) {
        return this.$route.path.startsWith(url);
      },
      isCurrentPage(url) {
        return this.$route.path === url;
      },
      preSelectMenu(menu) {
        this.$store.dispatch("menu/setSelectedMenu", menu);
      },
      clearSelectedMenu() {
        this.$store.dispatch("menu/setSelectedMenu", null);
      },
      logout() {
        this.$store.dispatch("user/logout");
      },
    },
  };
</script>

<style scoped lang="scss">
  .menu-layout {
    background-color: $white;
    box-shadow: $box-shadow;
    display: grid;
    grid-template-rows: 100px auto;
  }
  .logo-panel {
    grid-row: 1/2;
  }
  .menu-panel {
    padding-top: 80px;
    .sub-menu {
      padding-left: 35px;
    }
  }
  .menu-item {
    height: 60px;
    padding-left: 35px;
    border-left: 3px $white solid;
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon-panel {
      width: 20px;
      color: $gray-icon;
      margin-right: 15px;
    }
    .menu-name {
      font-size: 16px;
      line-height: 60px;
      color: $gray-header;
      grid-column: 2/3;
    }
  }

  .menu-item:hover,
  .menu-item.selected {
    border-left-color: $purple;
    background-color: $purple-pale;
  }
</style>
