import Vue from 'vue'
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const state = {
  categories: {
    // Movies: ['Mad Max', 'Marvel Cinematic Universe'],
    // 'TV Shows': ['iCarly', 'AP Bio'],
  },

  ffQueries: [
    // {
    //   fandom: 'Mad Max',
    //   category: 'Movies',
    //   title: 'Furiosa/Max',
    //   description: 'Pairing of Max & Furiosa',
    //   image: null,
    //   favorited: false,
    //   link: 'https://archiveofourown.com',
    //   id: 1598402920206,
    // },
    // {
    //   fandom: 'Mad Max',
    //   category: 'Movies',
    //   title: 'Furiosa/Max',
    //   description: 'Pairing of Max & Furiosa',
    //   image: 'https://vuejs.org/images/logo.png',
    //   favorited: true,
    //   link: 'https://archiveofourown.com',
    //   id: 1598402920207,
    // },
    // {
    //   fandom: 'Marvel Cinematic Universe',
    //   category: 'Movies',
    //   title: 'Peter Parker/Michelle Jones',
    //   description: 'Pairing of Max & Furiosa',
    //   image: 'https://vuejs.org/images/logo.png',
    //   favorited: true,
    //   link: 'https://archiveofourown.com',
    //   id: 1598402920208,
    // },
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

  DELETE_FANDOM(state, value) {
    const i = state.categories[value[0]].indexOf(value[1])
    if (i > -1) state.categories[value[0]].splice(i, 1)
  },

  DELETE_QUERY(state, value) {
    state.ffQueries = state.ffQueries.filter(query => query.id !== value.id)
  },

  FAV_QUERY(state, value) {
    state.ffQueries.map(query => {
      if (query.id === value.id) {
        query.favorited = !query.favorited
      }
    })
  },

  EDIT_QUERY(state, value) {
    state.ffQueries = state.ffQueries.map(query =>
      query.id === value.id ? value : query
    )
  },
}

const actions = {
  saveQuery: ({ commit }, query) => {
    //upload image and get url
    if (query.image !== null && query.image.name) {
      const storageRef = firebase
        .storage()
        .ref(`${query.image.name}`)
        .put(query.image)
      storageRef.on(`state_changed`, () => {
        storageRef.snapshot.ref.getDownloadURL().then(url => {
          query.image = url
        })
      })
    }
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
    value.favorited = !value.favorited
    commit('FAV_QUERY', value)
  },

  editQuery: ({ commit }, query) => {
    //upload image and get url
    if (query.image !== null && query.image.name) {
      const storageRef = firebase
        .storage()
        .ref(`${query.image.name}`)
        .put(query.image)
      storageRef.on(`state_changed`, () => {
        storageRef.snapshot.ref.getDownloadURL().then(url => {
          query.image = url
        })
      })
    }
    commit('EDIT_QUERY', query)

    const { category, fandom } = query
    if (Object.prototype.hasOwnProperty.call(state.categories, category)) {
      if (state.categories[category].includes(fandom)) {
        return
      } else {
        commit('SAVE_FANDOM', query)
      }
    } else {
      // if category doesn't exist, make a new category and add fandom to it
      commit('SAVE_NEW_CATEGORY', query)
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

  deleteQuery: ({ commit }, value) => {
    commit('DELETE_QUERY', value)
  },

  deleteFandom: ({ commit }, value) => {
    commit('DELETE_FANDOM', value)
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
