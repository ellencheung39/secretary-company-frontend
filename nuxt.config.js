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


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome',
    ['cookie-universal-nuxt', {
      alias: 'cookiz',
      parseJSON: true
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
    baseURL: "http://183.178.113.150:8000",
    cookie_user: "current_user"
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
