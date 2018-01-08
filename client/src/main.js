// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import store from './vuex/index'
import 'vuetify/dist/vuetify.css'

Vue.config.productionTip = false
let baseURL = 'http://35.185.185.63:3004'
Vue.use(Vuetify)
Vue.use(router)
Vue.prototype.$axios = axios.create({
  baseURL: baseURL
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
