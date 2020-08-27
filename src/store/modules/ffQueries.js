import Vue from 'vue'

const state = {
  categories: {
    // Movies: ['Mad Max', 'Marvel Cinematic Universe'],
    // 'TV Shows': ['iCarly', 'AP Bio'],
  },

  ffQueries: [
    {
      fandom: 'Mad Max',
      category: 'Movies',
      title: 'Furiosa/Max',
      description: 'Pairing of Max & Furiosa',
      image: null,
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
    {
      fandom: 'Marvel Cinematic Universe',
      category: 'Movies',
      title: 'Peter Parker/Michelle Jones',
      description: 'Pairing of Max & Furiosa',
      image: 'https://vuejs.org/images/logo.png',
      favorited: true,
      link: 'https://archiveofourown.com',
      id: 1598402920208,
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
  DELETE_CATEGORY(state, query) {
    Vue.delete(state.categories, query)
  },
  FAV_QUERY(value) {
    value.favorited = !value.favorited
  },
  EDIT_QUERY(state, value) {
    state.ffQueries = state.ffQueries.map(query =>
      query.id === value.id ? value : query
    )
  },
  REMOVE_FANDOM(state, value) {
    console.log(value[0])
    const i = state.categories[value[0]].indexOf(value[1])
    if (i > -1) state.categories[value[0]].splice(i, 1)
  },
  REMOVE_QUERY(state, value) {
    state.ffQueries = state.ffQueries.filter(query => query.id !== value.id)
  },
}

const actions = {
  saveQuery: ({ commit }, query) => {
    commit('SAVE_QUERY', query)
    const { category, fandom } = query
    //if the category object has the category
    if (Object.prototype.hasOwnProperty.call(state.categories, category)) {
      //loop through the categories and check the fandom
      state.categories[category].every(currentFandom => {
        //if fandom doesn't exist in category
        if (currentFandom !== fandom) {
          //push new fandom to category
          commit('SAVE_FANDOM', query)
        }
      })
    } else {
      // if category doesn't exist, make a new category and add fandom to it
      commit('SAVE_NEW_CATEGORY', query)
    }
  },

  favQuery: ({ commit }, value) => {
    commit('FAV_QUERY', value)
  },

  editQuery: ({ commit }, value) => {
    commit('EDIT_QUERY', value)
    console.log(state.categories)

    const { category, fandom } = value
    if (Object.prototype.hasOwnProperty.call(state.categories, category)) {
      if (state.categories[category].includes(fandom)) {
        return
      } else {
        commit('SAVE_FANDOM', value)
      }
    } else {
      // if category doesn't exist, make a new category and add fandom to it
      commit('SAVE_NEW_CATEGORY', value)
    }
    for (const query in state.ffQueries) {
      if (query.length === 0) {
        Vue.delete(category)
      }
    }
  },
  deleteCategory: ({ commit }, value) => {
    commit('DELETE_CATEGORY', value)
  },
  removeQuery: ({ commit }, value) => {
    commit('REMOVE_QUERY', value)
  },
  removeFandom: ({ commit }, value) => {
    commit('REMOVE_FANDOM', value)
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
