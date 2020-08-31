import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#F4511E',
        dark: '#232e3a',
        darkerColor: '#0f1419',
        error: '#F4511E',
      },
    },
    dark: true,
  },
})

// const mq = window.matchMedia('(prefers-color-scheme: dark)')

// export const vuetify = new Vuetify({
//   theme: { dark: mq.matches }
// })

// mq.addEventListener('change', (e) => {
//   vuetify.framework.theme.dark = e.matches
// })
