<template>
  <v-col cols="10" sm="8" lg="6">
    <v-form ref="signInForm">
      <v-card class="text-center" color="black">
        <v-card-title class="text-center pb-0 pt-6">
          <span class="headline text-center d-block" style="width: 100%"
            >Sign In to Your Account</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  label="E-mail Address*"
                  v-model="user.email"
                  :rules="emailRules"
                  filled
                  type="email"
                  placeholder="hello@email.com"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password*"
                  v-model="user.password"
                  type="password"
                  :rules="passwordRules"
                  filled
                  placeholder="*********"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" offset="3" class="d-flex pt-0">
                <v-btn x-large class="flex-grow-1" color="primary"
                  >Sign in</v-btn
                >
              </v-col>
              <v-col cols="12" class="pa-2"
                ><a href="#">I forgot my password</a></v-col
              >

              <v-col cols="12" class="pa-2"
                ><v-btn
                  ><v-icon left>mdi-google</v-icon> Sign in with Google</v-btn
                ></v-col
              >
              <v-col cols="12" class="pa-2"
                >Don't have an account?
                <a href="#">Register for free.</a></v-col
              >
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-form>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      passwordRules: [
        v => !!v || 'Field is required',
        v => (v && v.length > 0) || 'Please enter more than 0 characters',
      ],
      emailRules: [
        v => !!v || 'Field is required',
        v => (v && v.length > 0) || 'Please enter more than 0 characters',
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test(
            v
          ) || 'Invalid e-mail',
      ],
    }
  },
}
</script>
