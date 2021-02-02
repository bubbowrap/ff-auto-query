<template>
  <div>
    <template v-if="favoritedQueries.length">
      <span class="text-overline"
        >Welcome back{{ firstName ? `, ${firstName}!` : '!' }}</span
      >
      <h1>Here are your favorites.</h1>
      <cardList favoritedQueries="true" />
    </template>
    <template v-else>
      <v-col md="9" lg="8">
        <h1>Save Your Favorite Filters.</h1>
        <p>
          Hey {{ firstName ? firstName : 'There' }}! Save and view all of your
          top visited AO3 queries in one central location and get some of your
          precious time back. Click the '+' button in the bottom right corner to get started.
        </p>
      </v-col>
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
    firstName() {
      return this.user.name.split(' ')[0]
    },
  },
}
</script>
