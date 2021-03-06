const config = {
  loading: "~/components/loading.vue",
  router: {
    extendRoutes(routes) {
      routes.push({
        path: "/",
        component: "~/pages/apps/sites/index.vue"
      });
    }
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Global CSS
  */
  css: ["~/assets/scss/app.scss", 'quill/dist/quill.core.css', 'quill/dist/quill.snow.css', 'quill/dist/quill.bubble.css'],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    "~/plugins/fireauth.js",
    "~/plugins/fakeauth.js",
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vuelidate.js",
    "~/plugins/draggable.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/tour.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/mask.js",
    "~/plugins/quill-editor.js",
    "~/plugins/chartist.js",
    "~/plugins/vue-googlemap.js",
    "~/plugins/string-filter",
    {src: '~/plugins/vue-stripe-checkout.js', ssr: false},
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment',

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
  ],
  i18n: {
    locales: ['en', 'fr', 'es', 'ar'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        fr: require('./locales/fr.json'),
        es: require('./locales/es.json'),
        ar: require('./locales/ar.json'),
        zh: require('./locales/zh.json')
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {},
  env: {
    auth: process.env.VUE_APP_DEFAULT_AUTH,
    apikey: process.env.VUE_APP_APIKEY,
    authdomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseurl: process.env.VUE_APP_DATABASEURL,
    projectid: process.env.VUE_APP_PROJECTId,
    storgebucket: process.env.VUE_APP_STORAGEBUCKET,
    message: process.env.VUE_APP_MESSAGINGSENDERID,
    appid: process.env.VUE_APP_APPId,
    measurement: process.env.VUE_APP_MEASUREMENTID,
    STRIPE_PK: 'pk_test_hG84qIUb4VFN5KlhKOSAqYET',

  },
  serverMiddleware: [],

  toast: {
    position: 'top-center',
    theme: "bubble",
    duration: 30000,
    action: {
      text: 'x',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  }
}

//customization for different dev envs
const fs = require('fs')
const apiFilePath = '/api/index.js'

let apiServer = 'https://app.payin.com'

if (fs.existsSync('.' + apiFilePath)) {
  //in api dev env
  config.serverMiddleware.push(
    // Will register file from project api directory to handle /api/* requires
    {path: '/api', handler: '~' + apiFilePath}
  )
  apiServer = ''
}

config.auth = {
  strategies: {
    local: {
      endpoints: {
        login: {url: apiServer + '/api/sessions', method: 'post', propertyName: 'token'},
        logout: {url: apiServer + '/api/sessions', method: 'delete'},
        user: {url: apiServer + '/api/sessions/user', method: 'get', propertyName: 'data'}
      },
      // tokenRequired: true,
      tokenType: ''
    }
  },
  redirect: {
    login: '/account/login',
    logout: '/account/login',
    callback: '/account/login',
    home: '/'
  },
  resetOnError: true


}

export default config
