<template>
  <div class="menu-layout" :style="`grid-template-columns: 116px repeat(${!!ordered_menu ? ordered_menu.length : 0}, auto) 45px 45px 170px repeat(2, 40px);`">
    <div class="logo-panel finger" @click="redirectTo('/')">
      <img
        class="logo"
      />
    </div>
    <div
      class="finger menu-item"
      :class="{ selected: isCurrentPage(m.url) }"
      v-for="m in ordered_menu"
      :key="m.menu_id"
      @mouseover="selectMenu(m)"
      @click.stop="redirectTo(m.url)"
    >
      {{ m.menu_name }}
      <div class="menu-item-border"></div>
    </div>
    <div class="grid-center" @mouseenter="show_language_panel = true" @mouseleave="show_language_panel = false" @touchstart="show_language_panel = !show_language_panel">
      <div class="language-dropdown">
        <div class="finger language-dropdown-button" style="font-size: 16px; display: flex; flex-direction: row; align-items: center;">
          <fa style="font-size: 20px; margin-right: 8px; color: black;" :icon="fasGlobe" />
          <fa style="color: #E84C52;" :icon="show_language_panel ? fasChevronUp : fasChevronDown" />
        </div>
        <div class="language-dropdown-content" v-show="show_language_panel">
          <div
            class="finger"
            :style="{ color: selected_system_language_id === system_language.system_language_id ? '#E84C52' : '' }"
            v-for="(system_language, idx) in system_languages"
            :key="idx"
            @click="changeSystemLanguage(system_language)"
            @touchstart.stop
          >{{ system_language.system_language_short }}</div>
        </div>
      </div>
    </div>
    <div class="grid-center">
      <fa class="finger" style="font-size: 20px;" :style="{ opacity: show_search_bar ? 0.3 : 1 }" :icon="falSearch" @click="clickSearchButton" />
    </div>
    <div
      v-if="!!ordered_menu && ordered_menu.length > 0"
      class="login-panel finger na"
      @mouseenter="show_my_account_menu = true"
      @mouseleave="show_my_account_menu = false"
      @click="!!is_guest ? redirectTo('/login') : ''"
      @touchstart="show_my_account_menu = !show_my_account_menu"
      na-element="login"
      na-module="core"
      na-view="false"
      :na-data="
        getTrackingObject({
          app_page_section_id: 15366,
          app_page_id: app_page_id
        })
      "
    >
      <div v-if="!!is_guest" style="align-self: center; margin-left: 20px;">
        <img :src="getImgSrc(`https://gratushk.oss-cn-hongkong.aliyuncs.com/gratus/PublicImages/ND/Application/login-icon.png`)" style="width: 26px; height: 26px;" />
      </div>
      <fa v-else :icon="farUser" style="align-self: center; margin-left: 20px; font-size: 14px; font-weight: 400;" />
      <div class="login" @click="!!is_guest ? redirectTo('/login') : ''">
        <div v-if="!!is_guest" style="margin-right: 25px;">{{ $t('Login_SignUp') }}</div>
        <div v-else style="margin-right: 5px;">{{ $t('My_Account') }}</div>
      </div>
      <fa v-if="!is_guest" :icon="!!show_my_account_menu ? fasAngleUp : fasAngleDown" style="align-self: center; font-size: 20px; font-weight: 900; margin-right: 24px;" />
      <transition name="fade-animation">
      </transition>
    </div>
    <div
      class="grid-center na"
      @click="redirectTo('/member/wishlist')"
      na-element="my_favorite"
      na-module="core"
      na-view="false"
      :na-data="
        getTrackingObject({
          app_page_section_id: 15366,
          app_page_id: app_page_id
        })
      "
    >
      <fa class="finger" style="font-size: 20px;" :icon="falHeart" />
    </div>
    <div
      class="grid-center finger na"
      style="justify-self: right;"
      @click="redirectTo(!!is_staff ? '/shoppingcart' : '/campaigncart')"
      na-element="shopping-cart"
      na-module="core"
      na-view="false"
      :na-data="
        getTrackingObject({
          app_page_section_id: 15366,
          app_page_id: app_page_id
        })
      "
    >
      <img v-lazy="getImgSrc(`https://gratushk.oss-cn-hongkong.aliyuncs.com/gratus/PublicImages/ND/Application/icon-shoppingcart-light.png`)" style="width: 26px; height: 26px;" />
      <div class="shopping-cart-count" v-if="shopping_cart_count > 0">{{ shopping_cart_count }}</div>
    </div>
  </div>
</template>

<script>
  import menu from "~/vuex/menu";
  import { mapGetters } from "vuex";

  export default {
    components: {
      Fa: async () => {
        var vueFontAwesome = await import("@fortawesome/vue-fontawesome");
        return vueFontAwesome.FontAwesomeIcon;
      },
    },
    computed: {
      ...mapGetters({
        is_guest: "is_guest",
        is_staff: "shopping-cart/is_staff",
        menu: "menu/menu",
        ordered_menu: "menu/ordered_menu",
        selected_menu: "menu/selected_menu",
        selected_system_language_id: "selected_system_language_id",
        shopping_cart_count: "shopping-cart/shopping_cart_count",
        system_languages: "system_languages",
        tag_id_platform: "tag_id_platform",
        show_search_bar: "menu/show_search_bar",
      }),
      fasGlobe() {
        return fasGlobe;
      },
      fasChevronUp() {
        return fasChevronUp;
      },
      fasChevronDown() {
        return fasChevronDown;
      },
      falSearch() {
        return falSearch;
      },
      falHeart() {
        return falHeart;
      },
      farUser() {
        return farUser;
      },
      fasAngleUp() {
        return fasAngleUp;
      },
      fasAngleDown() {
        return fasAngleDown;
      },
    },
    created() {
      if (!this.$store.hasModule("menu")) {
        this.$store.registerModule("menu", menu);
      }
    },
    data() {
      return {
        app_page_id: 10001,
        show_language_panel: false,
        show_my_account_menu: false,
      };
    },
    async fetch() {
      await this.$store.dispatch("menu/getMenuFromMongoDB");
    },
    methods: {
      changeSystemLanguage(system_language) {
        this.show_language_panel = false;
        this.$store.dispatch("setSystemLanguage", system_language);
      },
      selectMenu(menu) {
        this.$store.dispatch("menu/setSelectedMenu", menu);
      },
      switchLocale(locale) {
        this.$i18n.locale = locale;
      },
      initialize() {
        this.$store.dispatch("menu/getMenuFromGratus", {
          m_MULTIMEDIA_TAG_ASSOC_PLATFORM: [
            {
              tag_id: this.tag_id_platform,
            },
          ],
          menu_types: [
            {
              menu_type_id: 1,
            },
            {
              menu_type_id: 3,
            },
            {
              menu_type_id: 14,
            },
            {
              menu_type_id: 6,
            },
            {
              menu_type_id: 12,
            },
            {
              menu_type_id: 13,
            },
          ],
        });
        this.$store.dispatch("shopping-cart/getShoppingCartCountFromGratus", {
          shopping_cart_type_id: !!this.is_staff ? 1 : 30,
          m_MULTIMEDIA_TAG_ASSOC_PLATFORM: [
            {
              tag_id: this.tag_id_platform,
            },
          ],
        });
      },
      isCurrentPage(url) {
        return (
          this.$route.path === url ||
          (url === "/" &&
            (this.$route.path === "/main-community" ||
              this.$route.path === "/main-personalisation"))
        ); // todo delete later
      },
      clickSearchButton() {
        this.$store.dispatch("menu/setShowSearchBar", !this.show_search_bar);
      },
    },
    mounted() {
      this.initialize();
    },
    watch: {
      selected_system_language_id(system_language_id) {
        this.initialize();
      },
    },
  };
</script>

<i18n lang="yaml">
en_us:
  Login_SignUp: "LOGIN / SIGNUP"
  My_Account: "MY ACCOUNT"
zh_cn:
  Login_SignUp: "登入 / 成为会员"
  My_Account: "我的帐户"
zh_hk:
  Login_SignUp: "登入 / 成為會員"
  My_Account: "我的帳戶"
</i18n>

<style scoped lang="scss">
  .logo {
    width: 116px;
    height: 38px !important;
    margin-top: 15px;
  }
  .menu-layout {
    display: grid;
    justify-items: center;
    height: 77px;

    .logo-panel {
      justify-self: left;

      .logo {
        height: 35px;
      }
    }

    .menu-item {
      padding-top: 24px;
      font-weight: 600;
      font-size: 13px;
      font-family: "Microsoft JhengHei";
      text-align: center;
      position: relative;
      min-width: 45px;
    }

    .menu-item:hover,
    .menu-item.selected {
      color: #e84c52;

      .menu-item-border {
        width: 45px;
        height: 3px;
        margin: auto;
        background: linear-gradient(
          to right,
          #ffb000,
          #f78029 30%,
          #fb3846 69%,
          #ff456c 83%,
          #ff455f
        );
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .login-panel {
      align-items: center;
      background-image: -webkit-linear-gradient(
        314deg,
        #ffb000,
        #f78029 30%,
        #fb3846 69%,
        #ff456c 83%,
        #ff455f
      );
      color: #fff;
      display: grid;
      grid-template-columns: auto auto auto;
      height: initial;
      justify-items: center;
      min-width: 126.75px;
      position: relative;

      .login {
        align-self: center;
        margin-left: 5px;
        font-weight: 600;
        justify-self: center;
      }
    }
  }

  .normal-cursor {
    cursor: default;
  }

  .grid-center {
    display: grid;
    margin-top: 24px;
  }

  .language-dropdown {
    position: relative;
    display: inline-block;
  }

  .language-dropdown-content {
    position: absolute;
    background-color: #fff;
    width: 47px;
    height: 120px;
    padding: 20px 0;
    top: 50px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    font-size: 16px;
    z-index: 2;
  }

  .language-dropdown-content .finger {
    margin-bottom: 5px;
    text-align: center;
  }

  .language-dropdown-content .finger:hover {
    color: #e84c52;
  }

  .language-dropdown:hover .language-dropdown-button {
    color: #e84c52;
  }

  .fade-animation-enter-active,
  .fade-animation-leave-active {
    transition: all 0.2s;
  }
  .fade-animation-enter,
  .fade-animation-leave-to {
    opacity: 0;
  }
  .fade-animation-enter-to,
  .fade-animation-leave {
    opacity: 1;
  }
  .shopping-cart-count {
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
    height: 22px;
    position: absolute;
    margin-left: 12px;
    top: 10px;
    width: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
