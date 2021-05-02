export default {
  rootDir: __dirname,
  /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
    'nuxt-compress',
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/scss/default.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  generate: {
    // choose to suit your project
    interval: 2000,
  },
  head: {
    title: 'secretary-company-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: false,
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */

  // fontawesome: {
  //   // If not set, you need to use default <font-awesome-icon> as element name
  //   component: 'fa',
  //   // imports: [
  //   //   {
  //   //     // Style: Solid, Prefix: fas, Availability: Free
  //   //     set: '@fortawesome/free-solid-svg-icons',
  //   //     icons: ['faGlobe', 'faSearch', 'faAngleDown', 'faAngleUp', 'faClipboardList', 'faMapMarkedAlt', 'faClock', 'faCircleNotch', 'faChevronDown', 'faChevronUp']
  //   //   },
  //   //   // {
  //   //   //   // Style: Regular, Prefix: far, Availability: Free
  //   //   //   set: '@fortawesome/free-regular-svg-icons',
  //   //   //   icons: []
  //   //   // },
  //   //   {
  //   //     // Style: Brands, Prefix: fab, Availability: Free
  //   //     set: '@fortawesome/free-brands-svg-icons',
  //   //     icons: ['faFacebookF', 'faInstagram', 'faFacebook', 'faWhatsapp']
  //   //   },
  //   //   {
  //   //     // Style: Solid, Prefix: fas, Availability: Pro
  //   //     set: '@fortawesome/pro-solid-svg-icons',
  //   //     icons: ['faChevronDown', 'faChevronUp', 'faHeart', 'faSortAmountDown', 'faSlidersH', 'faSearchPlus', 'faChevronLeft', 'faChevronRight', 'faCaretCircleLeft', 'faCaretCircleRight', 'faCaretDown', 'faCaretUp']
  //   //   },
  //   //   {
  //   //     // Style: Regular, Prefix: far, Availability: Pro
  //   //     set: '@fortawesome/pro-regular-svg-icons',
  //   //     icons: ['faBars', 'faChevronLeft', 'faChevronRight' , 'faHeart', 'faChevronDown', 'faChevronUp', 'faUser', 'faAngleRight', 'faInfoCircle', 'faSignOut', 'faCaretCircleLeft', 'faCaretCircleRight']
  //   //   },
  //   //   {
  //   //     // Style: Light, Prefix: fal, Availability: Pro
  //   //     set: '@fortawesome/pro-light-svg-icons',
  //   //     icons: ['faSearch', 'faHeart', 'faEye', 'faExternalLink', 'faShoppingCart', 'faSignIn', 'faChevronUp', 'faChevronDown','faCalendarAlt', 'faPlusCircle', 'faExclamationCircle', 'faMinusCircle', 'faTimes', 'faAngleUp', 'faAngleDown', 'faCheck', 'faPlus', 'faFilter','faComment', 'faChevronLeft', 'faChevronRight', 'faInfoCircle', 'faThumbsUp', 'faTimesCircle', 'faSignOut']
  //   //   },
  //   //   // {
  //   //   //   // Style: Duotone, Prefix: fad, Availability: Pro
  //   //   //   set: '@fortawesome/pro-duotone-svg-icons',
  //   //   //   icons: []
  //   //   // }
  //   // ]
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome',
    // ['nuxt-i18n', {
    //   defaultLocale: 'zh_hk',
    //   locales: ['zh_cn', 'zh_hk', 'en_us'],
    //   vueI18nLoader: true,
    //   lazy: false,
    //   strategy: 'no_prefix',
    // }],
    ['cookie-universal-nuxt', {
      alias: 'cookiz',
      parseJSON: false
    }],
    'nuxt-compress',
  ],
  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },



  plugins: [
    '@/plugins/axios',
    '@/plugins/fontawesome.js'

    // { src: '~plugins/nuxt-client-init.js', ssr: false },
    // { src: '~plugins/vue-lazyload.js', ssr: false },
  ],

  publicRuntimeConfig: {
    baseURL: "http://localhost:9000/api"
  },
  privateRuntimeConfig: {
  },
  router: {
    // prefetchLinks: true
    // middleware: 'prepare_route',
  },
  server: {
    //port: 3000,
    host: '0.0.0.0',
  },
  ssr: false,
  styleResources: {
    scss: [
      'assets/scss/variables.scss',
      'assets/scss/mixin.scss',
    ]
  },
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
}
