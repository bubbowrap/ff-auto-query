<template>
  <v-app>
    <v-component :is="layout">
      <router-view></router-view>
    </v-component>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},
  computed: {
    layout() {
      console.log(this.$route.meta.layout)
      return this.$route.meta.layout || 'Default'
    },
  },
}
</script>
