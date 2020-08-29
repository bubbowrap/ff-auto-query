import Vue from 'vue'
import App from './App.vue'
//import { auth } from './utils/firebaseConfig'
import router from './router'
import store from './store'
import '@/utils/auth'
import vuetify from './plugins/vuetify'
import Default from '@/layouts/Default.vue'
import SignIn from '@/layouts/SignIn.vue'

Vue.component('Default', Default)
Vue.component('signIn', SignIn)

Vue.config.productionTip = false

// let app
// auth.onAuthStateChanged(() => {
//   if (!app) {
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
//   }
// })
