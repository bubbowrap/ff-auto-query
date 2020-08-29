import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#F44336',
      },
    },
    dark: true,
  },
})
