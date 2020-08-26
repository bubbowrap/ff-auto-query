<template>
  <v-row>
    <Card v-for="query in ffQueries" :query="query" :key="query.id" />
  </v-row>
</template>

<script>
import Card from './Card'

export default {
  props: ['favoriteQueries', 'fandom'],
  components: {
    Card,
  },
  methods: {
  },
  computed: {
    ffQueries() {
      if (this.favoriteQueries) {
        return this.$store.getters.favoriteQueries
      }
      if (this.fandom) {
        return this.$store.getters.ffQueries.filter(
          query => this.fandom === query.fandom
        )
      } else {
        return this.$store.getters.ffQueries
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
