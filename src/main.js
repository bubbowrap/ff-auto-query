import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'
//import { auth } from './utils/firebaseConfig'
import router from './router'
import store from './store'
// import '@/utils/auth'
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
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('fetchUserData')
        store.dispatch('updateUser', user)
        router.push('/')
      } else {
        store.commit('LOGOUT')
        router.push('/sign-in')
      }
    })
  },
}).$mount('#app')
//   }
// })
