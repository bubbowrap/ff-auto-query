import Vue from 'vue'

const state = {
  categories: {
    Movies: ['Mad Max', 'Marvel Cinematic Universe'],
    'TV Shows': ['iCarly', 'AP Bio'],
  },

  ffQueries: [
    {
      fandom: 'Mad Max',
      category: 'Movies',
      title: 'Furiosa/Max',
      description: 'Pairing of Max & Furiosa',
      image: 'https://vuejs.org/images/logo.png',
      favorited: false,
      link: 'https://archiveofourown.com',
      id: 1598402920206,
    },
    {
      fandom: 'Mad Max',
      category: 'Movies',
      title: 'Furiosa/Max',
      description: 'Pairing of Max & Furiosa',
      image: 'https://vuejs.org/images/logo.png',
      favorited: true,
      link: 'https://archiveofourown.com',
      id: 1598402920207,
    },
  ],
}

const mutations = {
  SAVE_QUERY(state, query) {
    state.ffQueries.unshift(query)
  },
  SAVE_FANDOM(state, query) {
    state.categories[query.category].push(query.fandom)
    state.categories[query.category].sort()
  },
  SAVE_NEW_CATEGORY(state, query) {
    Vue.set(state.categories, query.category)
    state.categories[query.category] = [query.fandom]
  },
}

const actions = {
  saveQuery: ({ commit }, query) => {
    commit('SAVE_QUERY', query)
    const { category, fandom } = query
    if (Object.prototype.hasOwnProperty.call(state.categories, category)) {
      state.categories[category].every(currentFandom => {
        //if fandom doesn't exist in category
        if (currentFandom !== fandom) {
          //push new fandom to category
          commit('SAVE_FANDOM', query)
          console.log(state.categories)
        }
      })
    } else {
      // if category doesn't exist, make a new category and add fandom to it
      commit('SAVE_NEW_CATEGORY', query)
      // state.categories[category] = [fandom]
      // console.log(state.categories)
    }
  },
}

const getters = {
  categories: () => {
    return state.categories
  },
  ffQueries: () => {
    return state.ffQueries
  },
  favoriteQueries: () => {
    return state.ffQueries.filter(query => query.favorited === true)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
