<template>
  <v-col cols="12" md="6">
    <v-card>
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
          <v-img :src="cardQuery.image"></v-img>
        </v-avatar>
      </div>
      <v-card-actions>
        <v-btn icon @click="favQuery(cardQuery)"
          ><v-icon :color="cardQuery.favorited ? 'red' : 'none'"
            >mdi-heart</v-icon
          ></v-btn
        >
        <v-btn icon @click="openForm"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="removeQuery(cardQuery)"
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
    <!-- this.$refs.form.reset() -->
    <!--Modal Form-->
    <v-dialog v-model="dialog" max-width="600px" v-if="dialog" persistent>
      <v-form ref="editForm" :lazy-validation="lazy">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Query</span>
            <v-spacer></v-spacer>
            <!-- <v-btn icon @click="closeForm"><v-icon>mdi-close</v-icon></v-btn> -->
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
                    :value="cardQuery.fandom"
                    @keyup="cardQuery.fandom = $event.target.value"
                    @keydown.enter="editQuery"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-combobox
                    :items="Object.keys(this.categories)"
                    label="Category*"
                    required
                    :rules="inputRules"
                    :value="cardQuery.category"
                    @keyup="cardQuery.category = $event.target.value"
                    @keydown.enter="editQuery"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Query Title*"
                    hint="enter a title for your query"
                    v-model="cardQuery.title"
                    :rules="inputRules"
                    required
                    @keydown.enter="editQuery"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input
                    label="Query Image"
                    accept="image/*"
                    :value="cardQuery.image"
                    @input="
                      cardQuery.image
                        ? (cardQuery.image = $event.target.value)
                        : (cardQuery.image = null)
                    "
                    @keydown.enter="editQuery"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Query Description"
                    v-model="cardQuery.description"
                    @keydown.enter="editQuery"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Query Link*"
                    required
                    :rules="urlRules"
                    v-model="cardQuery.link"
                    @keydown.enter="editQuery"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block x-large color="primary" @click="editQuery"
              >Edit Query</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['query'],
  data() {
    return {
      cardQuery: { ...this.query },
      show: false,
      dialog: false,
      lazy: true,
      valid: true,
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
    ...mapActions(['favQuery']),

    updateQuery(query, event) {
      query = event.target.value
    },
    removeQuery(value) {
      alert('Are you sure?')
      this.$store.dispatch('removeQuery', value)
    },

    openForm() {
      this.dialog = true
    },

    // closeForm() {
    //   this.dialog = false
    //   this.$refs.editForm.resetValidation()
    // },

    editQuery() {
      this.valid = this.$refs.editForm.validate()
      if (this.valid) {
        this.dialog = false
        this.$store.dispatch('editQuery', this.cardQuery)
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

<style lang="scss" scoped></style>
