import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Default from '@/layouts/Default.vue'
import signIn from '@/layouts/SignIn.vue'

Vue.component('Default', Default)
Vue.component('signIn', signIn)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),

  created() {
    // Firebase configuration
    var firebaseConfig = {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID,
    }
    firebase.initializeApp(firebaseConfig)
  },
}).$mount('#app')
