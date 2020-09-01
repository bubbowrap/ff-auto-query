<template>
  <div class="layout--default">
    <v-app-bar app dense flat dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="ml-2"
          ><a href="/" class="v-toolbar-logo"
            >Fanfic Auto Query</a
          ></v-toolbar-title
        >
      </div>
      <v-spacer></v-spacer>
      <v-btn text @click="logout" v-if="loggedIn"
        ><v-icon left>mdi-account-circle</v-icon> Sign Out</v-btn
      >
      <v-btn text v-else to="/sign-in">
        <v-icon left>mdi-account-circle</v-icon>
        Sign In
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      floating
      v-model="drawer"
      app
      mobile-breakpoint="600"
      src="../assets/night-4702174_1280.jpg"
    >
      <v-list class="pt-0">
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title>Home/Favorites</v-list-item-title>
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
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
          <v-btn fixed dark fab bottom right color="primary" @click="openForm">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <!--Modal Form-->
          <v-dialog v-model="dialog" max-width="600px">
            <v-form ref="queryForm" :lazy-validation="lazy">
              <v-card>
                <v-card-title>
                  <span class="headline">Add New Query</span>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="closeForm"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-text class="pb-0">
                  <v-container class="pb-0">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-combobox
                          :items="allFandoms"
                          label="Fandom*"
                          filled
                          dense
                          required
                          autofocus
                          :rules="comboRules"
                          v-model="newQuery.fandom"
                          @keydown.enter="saveQuery"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-combobox
                          :items="Object.keys(this.categories)"
                          label="Category*"
                          filled
                          dense
                          required
                          :rules="comboRules"
                          v-model="newQuery.category"
                          @keydown.enter="saveQuery"
                        ></v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Query Title*"
                          filled
                          dense
                          required
                          hint="enter a title for your query"
                          v-model="newQuery.title"
                          :rules="inputRules"
                          @keydown.enter="saveQuery"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="d-flex pt-3 pb-9 pa-md-3">
                        <v-btn
                          @click="$refs.fileInput.click()"
                          outlined
                          x-large
                          class="flex-grow-1"
                          color="primary"
                          >{{ imageUploadText }}</v-btn
                        >
                        <input
                          type="file"
                          ref="fileInput"
                          style="display: none"
                          @change="uploadImage"
                          accept="image/*"
                          @keydown.enter="saveQuery"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Query Link*"
                          filled
                          dense
                          required
                          :rules="urlRules"
                          v-model="newQuery.link"
                          @keydown.enter="saveQuery"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Query Description"
                          filled
                          dense
                          v-model="newQuery.description"
                          @keydown.enter="saveQuery"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
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
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: true,
      dialog: false,
      lazy: false,
      valid: false,
      imageUploadText: 'Upload image',
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
      snackbar: false,
      snackbarText: '',
      timeout: 2000,
      comboRules: [
        v => !!v || 'Field is required',
        v => (v && v.length > 0) || 'Please enter more than 0 characters',
        v => (v && v.length < 50) || 'Please enter less than 50 characters',
        v => {
          if (/^[a-zA-Z0-9!?&-@:;\s]*$/gi.test(v)) {
            return true
          }
          return 'No special characters allowed'
        },
      ],
      inputRules: [
        v => !!v || 'Field is required',
        v => (v && v.length > 0) || 'Please enter more than 0 characters',
        v => (v && v.length < 50) || 'Please enter less than 50 characters',
      ],
      urlRules: [
        v => !!v || 'URL is required',
        v => (v && v.length > 0) || 'Please enter more than 0 characters',
        v =>
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi.test(
            v
          ) || 'URL must be valid and contain http:// or https://',
      ],
    }
  },
  methods: {
    ...mapActions(['logout']),

    makePath(value) {
      const regex = /[\s!?&-@:;]/gi
      const dashRegex = /-+/g
      return value
        .toLowerCase()
        .replace(regex, '-')
        .replace(dashRegex, '-')
    },
    openForm() {
      this.dialog = true
    },

    closeForm() {
      this.dialog = false
    },

    uploadImage() {
      this.newQuery.image = event.target.files[0]
      this.imageUploadText = event.target.files[0].name

      //upload img get url

            const storageRef = firebase.storage().ref()
      const uploadTask = storageRef
        .child(`${this.newQuery.image.name}`)
        .put(this.newQuery.image)

      uploadTask.on(
        `state_changed`,
        snapshot => {
          console.log(snapshot.totalBytes)
        },
        e => {
          console.error(e)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            this.newQuery.image = url
          })
        }
      )
    },

    saveQuery() {
      this.valid = this.$refs.queryForm.validate()

      if (this.valid) {
        this.$store.dispatch('saveQuery', this.newQuery)
        this.dialog = false
        this.$refs.queryForm.resetValidation()
        this.resetQuery()
        this.snackbarText = 'Query saved!'
        this.snackbar = true
      }
    },

    resetQuery() {
      this.newQuery = {
        fandom: '',
        category: '',
        title: '',
        description: '',
        image: null,
        favorited: false,
        link: '',
        id: Math.round(Date.now() + Math.random()),
      }
      this.imageUploadText = 'Upload Image'
    },
  },

  computed: {
    ...mapGetters(['loggedIn']),

    categories() {
      return this.$store.getters.categories
    },
    allFandoms() {
      return Object.keys(this.categories).flatMap(
        category => this.categories[category]
      )
    },
  },

  created() {
    if (window.innerWidth < 600) {
      this.drawer = false
    }
  },
}
</script>

<style lang="scss">
h1 {
  line-height: 1;
  margin-bottom: 1rem;
}

.v-toolbar__title {
  .v-toolbar-logo {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: white;
    }
  }
}
.v-btn--bottom {
  bottom: 0;
}
</style>
