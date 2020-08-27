<template>
  <div>
    <h1>Favorites</h1>
    <cardList favoriteQueries="true" />
  </div>
</template>

<script>
import cardList from '@/components/CardList'

export default {
  components: {
    cardList,
  },
}
</script>
