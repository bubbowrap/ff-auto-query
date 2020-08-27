<template>
  <div class="layout--default">
    <v-app-bar app dense flat dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="ml-2" link to="/"
          >Fanfic Auto Query</v-toolbar-title
        >
      </div>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
        ><v-icon left>mdi-account-circle</v-icon>
        Sign In
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer floating v-model="drawer" app mobile-breakpoint="600">
      <v-list class="pt-0">
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title>Favorites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="(fandoms, category) in categories"
          :key="category"
          color="none"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="category"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="fandom in fandoms"
            :key="fandom"
            :to="`/category/${makePath(category)}/${makePath(fandom)}`"
          >
            <v-list-item-content>
              <v-list-item-title v-text="fandom"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/About">
          <v-list-item-content>
            <v-list-item-title>About FFAQ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-col cols="12" class="ma-1">
          <router-view></router-view>

          <v-btn fixed dark fab bottom right color="primary" @click="openForm">
            <v-icon>mdi-plus</v-icon>
            <!--Modal Form-->
            <v-dialog v-model="dialog" max-width="600px">
              <v-form ref="queryForm" :lazy-validation="lazy">
                <v-card>
                  <v-card-title>
                    <span class="headline">Add New Query</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-combobox
                            :items="allFandoms"
                            label="Fandom*"
                            required
                            :rules="inputRules"
                            v-model="newQuery.fandom"
                          ></v-combobox>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-combobox
                            :items="Object.keys(this.categories)"
                            label="Category*"
                            required
                            :rules="inputRules"
                            v-model="newQuery.category"
                          ></v-combobox>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            label="Query Title*"
                            hint="enter a title for your query"
                            v-model="newQuery.title"
                            :rules="inputRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-file-input
                            label="Query Image"
                            accept="image/*"
                            v-model="newQuery.image"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Query Description"
                            v-model="newQuery.description"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            label="Query Link*"
                            required
                            :rules="urlRules"
                            v-model="newQuery.link"
                            @keydown.enter="saveQuery"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn block x-large color="primary" @click="saveQuery"
                      >Save Query</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      dialog: false,
      lazy: false,
      valid: false,
      newQuery: {
        fandom: '',
        category: '',
        title: '',
        description: '',
        image: null,
        favorited: false,
        link: '',
        id: Math.round(Date.now() + Math.random()),
      },
      inputRules: [
        v => !!v || 'Field is required',
        v => (v && v.length > 0) || 'Please enter more than 0 characters',
      ],
      urlRules: [
        v => !!v || 'URL is required',
        v => (v && v.length > 0) || 'Please enter more than 0 characters',
      ],
    }
  },
  methods: {
    makePath(value) {
      const regex = /\s/gi
      return value.toLowerCase().replace(regex, '-')
    },
    openForm() {
      this.dialog = true
    },
    saveQuery() {
      this.valid = this.$refs.queryForm.validate()
      if (this.valid) {
        this.dialog = false
        this.$store.dispatch('saveQuery', this.newQuery)
      }
      // {
      //   fandom: 'Bellow',
      //   category: 'TV Shows',
      //   title: 'Peter/MJ',
      //   description: 'Pairing of Max & Furiosa',
      //   image: 'https://vuejs.org/images/logo.png',
      //   favorited: true,
      //   link: 'https://archiveofourown.com',
      //   id: Math.round(Date.now() + Math.random()),
      // })
    },
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    allFandoms() {
      return Object.keys(this.categories).flatMap(
        category => this.categories[category]
      )
    },
  },
}
</script>

<style lang="scss">
.template--default,
.v-main {
  //height: 100%;
  //min-height: 100vh;
}

.v-btn--bottom {
  bottom: 0;
}
</style>
