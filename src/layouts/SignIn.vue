<template>
  <v-img
    height="100vh"
    class="set-opacity"
    src="../assets/kindle-381242_1280-min.jpg"
  >
    <v-container class="d-flex">
      <v-row class="align-self-center" justify="center">
        <v-col cols="12 text-center"
          ><h1>FanFiction Auto Query</h1>
          <span>Save your favorite filters.</span>
        </v-col>
        <router-view></router-view>
      </v-row>
    </v-container>
  </v-img>
</template>

<style lang="scss">
.container,
.v-parallax {
  height: 100%;
}
.set-opacity {
  .v-image__image,
  .v-image__placeholder {
    opacity: 0.15 !important;
  }
}
</style>
