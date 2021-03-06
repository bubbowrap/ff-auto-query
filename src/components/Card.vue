<template>
  <v-col cols="12" md="6">
    <v-card class="flex-grow-1" outlined>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title v-text="cardQuery.title"></v-card-title>

          <v-card-subtitle v-text="cardQuery.fandom"></v-card-subtitle>
          <v-card-text>
            <v-btn
              outlined
              color="primary"
              :href="cardQuery.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Now
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-text>
        </div>

        <v-avatar class="ma-3" size="125" tile v-if="cardQuery.image">
          <v-img
            :src="`${typeof cardQuery.image === String ? '' : cardQuery.image}`"
          ></v-img>
        </v-avatar>
      </div>
      <v-card-actions>
        <v-btn icon @click="favQuery(cardQuery)"
          ><v-icon :color="cardQuery.favorited ? 'red' : 'none'"
            >mdi-heart</v-icon
          ></v-btn
        >
        <v-btn icon @click="openForm"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="deleteQuery(cardQuery)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >

        <v-spacer></v-spacer>

        <v-btn text @click="show = !show" v-if="cardQuery.description">
          Details
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ cardQuery.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <!--Delete Form -->

    <!--Modal Form-->
    <v-dialog v-model="dialog" max-width="600px" v-if="dialog" persistent>
      <v-form ref="editForm" :lazy-validation="lazy">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Query</span>
            <v-spacer></v-spacer>
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
                    :rules="comboRules"
                    v-model="cardQuery.fandom"
                    @keyup="cardQuery.fandom = $event.target.value"
                    @keydown.enter="editQuery"
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
                    v-model="cardQuery.category"
                    @keyup="cardQuery.category = $event.target.value"
                    @keydown.enter="editQuery"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Query Title*"
                    filled
                    dense
                    required
                    hint="enter a title for your query"
                    v-model="cardQuery.title"
                    :rules="inputRules"
                    @keydown.enter="editQuery"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="d-flex pt-3 pb-9 pa-md-3">
                  <v-btn
                    @click="$refs.fileInput.click()"
                    outlined
                    x-large
                    class="flex-grow-1 uploadBtn"
                    color="primary"
                    >{{ imageUploadText }}</v-btn
                  >
                  <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    @change="updateImage"
                    accept="image/*"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Query Link*"
                    filled
                    dense
                    required
                    :rules="urlRules"
                    v-model="cardQuery.link"
                    @keydown.enter="editQuery"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Query Description"
                    filled
                    dense
                    v-model="cardQuery.description"
                    @keydown.enter="editQuery"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn block x-large color="primary" @click="editQuery"
              >Edit Query</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-col>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/storage'
//import { mapActions } from 'vuex'

export default {
  props: ['query'],

  data() {
    return {
      cardQuery: { ...this.query },
      show: false,
      dialog: false,
      lazy: false,
      tempImage: null,
      valid: true,
      imageUploadText: this.query.image ? this.query.image : 'Upload Image',
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
    favQuery(value) {
      this.$store.dispatch('favQuery', value)
      this.snackbarText = 'Query added to favorites!'
      this.snackbar = true
    },

    deleteQuery(value) {
      this.$store.dispatch('deleteQuery', value)
      this.snackbarText = 'Query deleted!'
      this.snackbar = true
    },

    openForm() {
      this.dialog = true
    },

    updateImage() {
      this.tempImage = event.target.files[0]
      this.imageUploadText = event.target.files[0].name

      //upload img get url
      const storageRef = firebase.storage().ref()
      const uploadTask = storageRef
        .child(`${this.tempImage.name}`)
        .put(this.tempImage)

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
            this.tempImage = url
          })
        }
      )
    },

    editQuery() {
      this.valid = this.$refs.editForm.validate()
      if (this.valid) {
        this.dialog = false
        if (this.tempImage !== null) this.cardQuery.image = this.tempImage
        this.$store.dispatch('editQuery', this.cardQuery)
        this.snackbarText = 'Query updated!'
        this.snackbar = true
      }
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