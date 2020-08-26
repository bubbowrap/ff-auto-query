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
      return 'Default'
    },
  },
}
</script>
