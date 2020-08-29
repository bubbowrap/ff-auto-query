<template>
  <div>
    <template v-if="favoritedQueries.length">
      <h1>Your Favorites</h1>
      <cardList favoritedQueries="true" />
    </template>
    <template v-else>
      <h1>Save Your Favorite Filters.</h1>
      <p>
        Hey {{ user.name }}! Save and View all of your top visited AO3 queries
        in one central location and get some of your precious time back. Click
        on the button in the corner to get started.
      </p>
    </template>
  </div>
</template>

<script>
import cardList from '@/components/CardList'
import { mapGetters } from 'vuex'

export default {
  components: {
    cardList,
  },
  computed: {
    ...mapGetters(['user']),
    favoritedQueries() {
      return this.$store.getters.ffQueries.filter(
        query => query.favorited === true
      )
    },
  },
}
</script>
