<template>
  <div>
    <span class="text-overline">{{ categoryWord }}</span>
    <h1>{{ fandomTitle }}</h1>
    <cardList :fandom="fandomTitle" :category="categoryWord" />
  </div>
</template>

<script>
import cardList from '@/components/CardList'

export default {
  props: ['category', 'fandom'],
  data() {
    return {
      params: this.$route.params,
    }
  },
  computed: {
    fandomTitle() {
      let fandomList = this.$store.getters.categories
        ? Object.keys(this.$store.getters.categories).flatMap(
            category => this.$store.getters.categories[category]
          )
        : {}
      //if fandom make path equals loop through fandomList, make path
      return fandomList.length && typeof fandomList !== 'undefined'
        ? fandomList.filter(f => this.fandom === this.makePath(f))[0].toString()
        : '404'
    },
    categoryWord() {
      let categoryList = this.$store.getters.categories
        ? Object.keys(this.$store.getters.categories)
        : {}

      return categoryList.length && typeof categoryList !== 'undefined'
        ? categoryList
            .filter(cat => this.category === this.makePath(cat))[0]
            .toString()
        : '404'
    },
  },
  components: {
    cardList,
  },
  methods: {
    makePath(value) {
      const regex = /\s/gi
      return value.toLowerCase().replace(regex, '-')
    },
  },
}
</script>
