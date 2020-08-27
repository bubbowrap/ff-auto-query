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
      let fandomList = Object.keys(this.$store.getters.categories).flatMap(
        category => this.$store.getters.categories[category]
      )
      //if fandom make path equals loop through fandomList make path
      return fandomList.length
        ? fandomList.filter(f => this.fandom === this.makePath(f))[0].toString()
        : null
    },
    categoryWord() {
      let categoryList = Object.keys(this.$store.getters.categories)

      return categoryList.length
        ? categoryList
            .filter(cat => this.category === this.makePath(cat))[0]
            .toString()
        : null
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

    // unmakePath(value) {
    //   // const regex = /-/gi
    //   return value
    //     .split('-')
    //     .map(v => v.charAt(0).toUpperCase())
    //     .join(' ')
    //   //return value.toLowerCase().replace(regex, ' ').
    // },
  },
}
</script>
