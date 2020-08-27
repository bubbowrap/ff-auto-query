<template>
  <v-row v-if="ffQueries.length">
    <Card
      v-for="query in ffQueries"
      :query="query"
      :key="query.id"
      @checkQueries="checkQueries()"
    />
  </v-row>
  <v-row v-else>
    <v-col>
      <v-alert border="left">
        There's nothing here! Use the button in the corner or click here to
        start adding your queries.
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import Card from './Card'

export default {
  props: ['favoriteQueries', 'fandom', 'category'],
  components: {
    Card,
  },

  watch: {
    navCategories() {
      this.checkFandoms()
    },
    ffQueries() {
      this.checkFandoms()
    },
  },

  methods: {
    checkFandoms() {
      //remove Fandom from array if empty
      if (this.ffQueries.length === 0) {
        this.$store.dispatch('deleteFandom', [this.category, this.fandom])
        this.$router.push('/404')
      }
      //remove category if empty
      for (let category in this.$store.getters.categories) {
        if (this.$store.getters.categories[category].length === 0) {
          this.$store.dispatch('deleteCategory', category)
        }
      }
    },
  },

  computed: {
    navCategories() {
      return this.$store.getters.categories
    },
    ffQueries() {
      if (this.favoriteQueries) {
        return this.$store.getters.ffQueries.filter(
          query => query.favorited === true
        )
      }
      if (this.fandom && this.category) {
        return this.$store.getters.ffQueries.filter(
          query =>
            this.fandom === query.fandom && this.category === query.category
        )
      } else {
        return this.$store.getters.ffQueries
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
