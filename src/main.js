import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {message, description} from './data'
import info from './functions'

Vue.config.productionTip = false

info(message)
info(description)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

