<template>
  <div>
    <div class="main-layout" :style="{ 'grid-template-rows': (!!is_in_app ? '' : '50px') + 'auto auto', 'pointer-events': !!is_preview ? 'none' : '' }">
      <div v-if="!is_in_app" class="header-panel">
        <lazy-header></lazy-header>
      </div>
      <div class="content-panel">
        <nuxt />
      </div>
      <div v-if="!is_in_app" class="mainpage-footer-panel">
        <!-- <lazy-footer></lazy-footer> -->
      </div>
      <!-- <lazy-back-to-top-floating-button style="z-index: 100;" v-if="page_y_offset > 200"></lazy-back-to-top-floating-button> -->
    </div>
    <!-- <lazy-dialog v-if="!!dialog_message"></lazy-dialog> -->
    <div class="mainpage-menu-backpane" v-if="!!show_side_menu" @click.self="closeMainMenu">
      <!-- <lazy-side-menu></lazy-side-menu> -->
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import menu from "~/vuex/menu";
  import { mapGetters } from "vuex";
  // import global from '~/mixins.js/global.js';
  // Vue.mixin(global);

  export default {
    data() {
      return {
        is_preview: false,
      };
    },
    computed: {
      ...mapGetters({
        dialog_message: "dialog_message",
        page_y_offset: "page_y_offset",
        is_in_app: "is_in_app",
        selected_system_language_id: "selected_system_language_id",
        show_search_bar: "menu/show_search_bar",
        show_side_menu: "menu/show_side_menu",
        system_languages: "system_languages",
        tag_id_platform: "tag_id_platform",
        window_width: "window_width",
      }),
      meta() {
        if (this.selected_system_language_id == 2) {
          return [
            {
              hid: "og:description",
              property: "og:description",
              content:
                "gratus是一个属于全港女性的医美平台，针对个人需要，任你自主自选；由轮廓拉提等目标为本医美疗程及产品，全面满足女士们的美容所需所想。",
            },
          ];
        } else {
          return [
            {
              hid: "og:description",
              property: "og:description",
              content:
                "gratus是一個屬於全港女性的醫美平台，針對個人需要，任你自主自選；由輪廓拉提等目標為本醫美療程及產品，全面滿足女士們的美容所需所想。",
            },
          ];
        }
      },
    },
    created() {
      if (!this.$store.hasModule("menu")) {
        this.$store.registerModule("menu", menu);
      }
    },
    head() {
      return {
        bodyAttrs: {
          lang: this.system_languages[this.selected_system_language_id - 1]
            ?.system_language_code,
        },
        meta: [
          // If the image cannot be shown, this might related to the image file size dimension and issue
          {
            hid: "og:image",
            property: "og:image",
            content: `${this.$config.redirect_url_base_address}assets/images/ui/gradient-logo.png`,
          },
          {
            hid: "og:url",
            property: "og:url",
            content: this.$config.redirect_url_base_address,
          },
          { hid: "og:type", property: "og:type", content: "website" },
          ...this.meta,
        ],
        // link: this.preload_link
      };
    },
    methods: {
      closeMainMenu() {
        this.$store.dispatch("menu/setShowSideMenu", false);
      },
      selectMenu(menu) {
        this.$store.dispatch("menu/setSelectedMenu", menu);
      },
    },
    mounted() {
      this.is_preview = this.$route.query.preview === "true";

      // To detect Desktop or Mobile layout
      // Need to initialize once, otherwise, it will treat mobile screen as desktop screen
      // and also triggered by screen resize
      window.onresize = () => {
        this.$store.dispatch("setLayout", {
          width: window.innerWidth,
        });
      };
      window.onscroll = () => {
        this.$store.dispatch("setPageYOffset", {
          page_y_offset: window.pageYOffset,
        });
      };
    },
  };
</script>

<i18n lang="yaml">
en_us:
  Please_Login_First: "Please login first."
zh_cn:
  Please_Login_First: "请先登入."
zh_hk:
  Please_Login_First: "請先登入."
</i18n>

<style lang="scss">
  html {
    font-family: "Roboto", "Microsoft JhengHei", sans-serif, "Source Sans Pro",
      -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial;
    font-size: 12px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;

    /* test avoid white background flash during transition */
    background-color: #ededed;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  .finger {
    cursor: pointer;
  }

  .content-panel {
    background-color: #ededed;
    grid-row: 2/3;
  }
  .footer-panel {
    background-color: #e7e5e5;
    grid-row: 3/4;
  }
  .header-panel {
    background-color: #fff;
    grid-row: 1/2;
    height: auto;
  }

  .solid-button {
    cursor: pointer;
    border-radius: 8px;
    text-align: center;
    // color: $white;
    min-height: 48px;
    place-items: center;
    font-size: 14px;
    font-weight: bold;
    display: grid;
    place-items: center;

    @include gradient(orange);

    @include respond-to(tablet-min) {
      font-size: 16px;
    }

    &.disabled {
      pointer-events: none !important;
      background: $light-gray !important;
      background-image: $light-gray !important;
    }
  }

  .transparent-button-wrapper {
    display: inline-block;
    padding: 2px;
    border-radius: 8px;

    @include gradient(orange);

    .transparent-button {
      display: inline-block;
      position: relative;
      width: 100% !important;
      padding: 0 20px;
      cursor: pointer;
      border-radius: 8px;
      border: 0;

      &::before {
        position: absolute;
        content: " ";
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        // background: $white;
        border-radius: 8px;
      }

      span {
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        color: $mandy;
        -webkit-background-clip: text;
        display: inline-block;
        border: 3px solid transparent;
        border-image-slice: 1;
        position: relative;
        text-align: center;
        display: grid;
        place-content: center;
        min-height: 44px;

        @include respond-to(tablet-min) {
          font-size: 16px;
        }
      }
    }

    &.disabled {
      pointer-events: none;
      background: $lighter-gray;

      .transparent-button span {
        color: $gray;
      }
    }
  }

  body > div {
    -webkit-overflow-scrolling: touch;
  }

  img {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .content_fade-enter-active,
  .content_fade-leave-active {
    transition: opacity 0.5s;
    transition-timing-function: ease;
  }
  .content_fade-enter, .content_fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .main-layout {
    background-color: #fff;
    display: grid;
    grid-template-rows: 77px auto auto;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    /* Rules below not implemented in browsers yet */
    -o-user-select: none;
    user-select: none;

    @media all and (max-width: 896px) {
      grid-template-rows: 50px auto auto;
    }
  }

  .header-panel {
    position: fixed;
    width: 100%;
    z-index: 101;
  }

  .mainpage-footer-panel {
    background-color: #e7e5e5;
    grid-row: 3/4;
  }

  .mainpage-menu-backpane {
    display: none;

    @include respond-to(phone) {
      background-color: rgba(0, 0, 0, 0.5);
      display: block;
      right: 0;
      top: 0;
      bottom: 0px; /* added to allow scrolling in the filter panel */
      min-height: 0 !important; /* added to allow scrolling in the filter panel */
      padding-left: 40px;
      position: fixed;
      overflow-x: hidden;
      overflow-y: scroll;
      transition: 0.5s;
      width: 100%;
      z-index: 101;
    }
  }

  .no-scroll {
    overflow: hidden;
  }

  .share-network-facebook {
    color: $facebook;
  }
  .share-network-whatsapp {
    color: $whatsapp;
  }
</style>
