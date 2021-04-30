<template>
  <div>
    <div class="header-layout hidden-m" @mouseleave="clearSelectedMenu()">
      <div class="center-panel">
        <Menu @show-search-bar="onShowSearchBar"></Menu>
      </div>
      <!-- <LazySubMenu v-if="!!selected_menu.m_SUBMENU"></LazySubMenu> -->
    </div>
    <!-- <LazySearchBox v-if="!!show_search_bar">
      <template #default="{ search_key, autocomplete, input_attrs, input_events, other_events }">
        <div class="search-text-box-panel hidden-xs">
          <input class="search-text-box" ref="search-text-box" type="text" v-bind="input_attrs" v-on="input_events" :placeholder="$t('Search_Popular_Keyword')" />
          <div class="search-button finger" @click="other_events.click($event, input_attrs.value)">{{ $t('Search') }}</div>
          <LazySearchBoxResult v-if="!!search_key" style="margin-top: 65px;" :results="!!autocomplete ? autocomplete.m_ITEM_TYPE : []" :keyword="search_key" @mouse-enter-item="other_events.mouseEnterItem"></LazySearchBoxResult>
        </div>
      </template>
    </LazySearchBox>-->
    <div class="small-header-layout show-m no-select">
      <div style="margin: 0; font-size: 20px; justify-self: start;">
        <div class="finger sidenav" @click="toggleSideMenuIcon">
          <img style="width: 26px; height: 26px;" v-lazy="getImgSrc(`https://gratushk.oss-cn-hongkong.aliyuncs.com/gratus/PublicImages/ND/Application/icon-mobile-menu-red.png`)" />
        </div>
      </div>
      <div class="logo-panel finger" style="place-self: center;" @click="redirectTo('/')">
        <img
          class="na logo"
          v-lazy="getImgSrc(`https://gratushk.oss-cn-hongkong.aliyuncs.com/gratus/PublicImages/ND/Application/logo.png`)"
          na-element="logo"
          na-module="core"
          na-view="false"
          :na-data="
            getTrackingObject({
              app_page_id: app_page_id,
              app_page_section_id: 15366
            })
          "
        />
      </div>
      <div class="shopping-cart finger" style="width: 26px; height: 26px;" @click="redirectTo(!!is_staff ? '/shoppingcart' : '/campaigncart')">
        <img v-lazy="getImgSrc(`https://gratushk.oss-cn-hongkong.aliyuncs.com/gratus/PublicImages/ND/Application/icon-shoppingcart-light.png`)" />
        <div class="shopping-cart-count" v-if="shopping_cart_count > 0">{{ shopping_cart_count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import menu from "~/vuex/menu";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        app_page_id: 10001,
      };
    },
    computed: {
      ...mapGetters({
        is_staff: "shopping-cart/is_staff",
        selected_menu: "menu/selected_menu",
        shopping_cart_count: "shopping-cart/shopping_cart_count",
        show_search_bar: "menu/show_search_bar",
      }),
    },
    created() {
      if (!this.$store.hasModule("menu")) {
        this.$store.registerModule("menu", menu);
      }
      // if (!this.$store.hasModule('shopping-cart')) {
      //   this.$store.registerModule('shopping-cart', shoppingCart);
      // }
    },
    methods: {
      clearSelectedMenu() {
        this.$store.dispatch("menu/clearSelectedMenu");
      },
      toggleSideMenuIcon() {
        this.$store.dispatch("menu/setShowSideMenu", true);
      },
      onShowSearchBar(val) {
        this.$nextTick(() => {
          const searchTextBox = this.$refs["search-text-box"];
          if (val) searchTextBox.focus();
          else searchTextBox.blur();
        });
      },
    },
  };
</script>

<i18n lang="yaml">
en_us:
  Search: "Search"
  Search_Popular_Keyword: "Search by Popular Beauty Keyword(s)"
zh_cn:
  Search: "搜尋"
  Search_Popular_Keyword: "搜寻热门美容关键字..."
zh_hk:
  Search: "搜尋"
  Search_Popular_Keyword: "搜尋熱門美容關鍵字..."
</i18n>

<style scoped lang="scss">
  $header-min-width: 896px;

  .header-layout {
    background-color: #fff;
    display: grid;
    grid-template-columns: minmax(20px, auto) minmax(auto, 1100px) minmax(
        20px,
        auto
      );
    height: 77px;

    .center-panel {
      grid-column: 2/3;
      grid-auto-rows: 200px;
    }
  }

  .small-header-layout {
    align-items: center;
    display: grid;
    grid-template-columns: repeat(3, auto);
    height: 50px;
    margin: 0 0;
    width: auto;
  }

  .logo {
    height: 32px;
  }

  .sidenav {
    border-radius: 4px;
    padding: 15px 10px 9px 12px;
  }

  .sidenav:hover {
    background: #d3d3d3;
  }

  .search-text-box-panel {
    background-color: #ececec;
    display: grid;
    justify-content: center;
    height: 65px;

    .search-text-box {
      background: #ececec;
      border: none;
      color: black;
      font-size: 19px;
      grid-column: 1/2;
      height: 100%;
      line-height: 65px;
      outline-width: 0;
      text-align: center;
      width: 1000px;
    }

    .search-button {
      background-image: -webkit-linear-gradient(
        314deg,
        #ffb000,
        #f78029 30%,
        #fb3846 69%,
        #ff456c 83%,
        #ff455f
      );
      color: #fff;
      font-size: 16px;
      height: 65px;
      grid-column: 2/3;
      line-height: 65px;
      position: relative;
      text-align: center;
      width: 110px;
    }
  }

  @media all and (max-width: $header-min-width) {
    .hidden-m {
      display: none !important;
    }
  }

  @media all and (min-width: ($header-min-width + 0.5px)) {
    .show-m {
      display: none !important;
    }
  }

  .shopping-cart {
    margin: 0;
    justify-self: end;
    margin-right: 10px;
  }

  .no-select {
    -webkit-tap-highlight-color: transparent;
  }

  .shopping-cart-count {
    align-items: center;
    background-image: -webkit-linear-gradient(
      314deg,
      #ffb000,
      #f78029 30%,
      #fb3846 69%,
      #ff456c 83%,
      #ff455f
    );
    border-radius: 50%;
    color: #fff;
    display: flex;
    height: 20px;
    justify-content: center;
    margin-left: 15px;
    position: absolute;
    top: 4px;
    width: 20px;
  }
</style>
