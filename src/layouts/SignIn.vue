<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-form ref="signInForm">
            <v-card rounded="">
              <v-card-title class="text-center">
                <span class="headline">Sign In</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="E-mail Address*"
                        hint="enter your e-mail address"
                        v-model="user.email"
                        :rules="[rules.required, rules.email]"
                        filled
                        type="email"
                        placeholder="hello@email.com"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Password*"
                        hint="enter your password"
                        v-model="user.password"
                        type="password"
                        :rules="inputRules"
                        filled
                        placeholder="*********"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
}
</script>
