<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <v-component :is="layout">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-component>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},
  computed: {
    layout() {
      return this.$route.meta.layout || 'signIn'
    },
  },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.theme--dark.v-card,
.theme--dark.v-app-bar.v-toolbar.v-sheet,
.theme--dark.v-navigation-drawer,
.v-snack__wrapper.theme--dark {
  background: #232e3a !important;
}
.theme--dark.v-application {
  background: #0f1419 !important;
}
</style>
