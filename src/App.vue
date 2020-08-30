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
      return this.$route.meta.layout || 'Default'
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
