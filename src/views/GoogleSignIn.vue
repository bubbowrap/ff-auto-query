<template>
  <v-col cols="10" sm="8" lg="6">
    <v-form ref="signInForm">
      <v-card class="text-center transparent" outlined>
        <v-card-title class="text-center pb-0 pt-6">
          <span class="headline text-center d-block" style="width: 100%"
            >Register/Sign In</span
          >
        </v-card-title>
        <v-container class="pt-0">
          <v-row>
            <v-card-text>
              <v-col cols="12" class="pa-2"
                ><v-btn x-large color="primary" @click="googleLogin"
                  ><v-icon left>mdi-google</v-icon> Sign in with Google</v-btn
                ></v-col
              >
              <v-col cols="12"><a href="/">Click here to test it out</a></v-col>
            </v-card-text>
          </v-row>
        </v-container>
      </v-card>
    </v-form>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions(['googleLogin']),
  },
}
</script>

<style lang="scss" scoped>
.transparent {
  border: thin solid rgba(255, 255, 255, 0.2) !important;
}
</style>
