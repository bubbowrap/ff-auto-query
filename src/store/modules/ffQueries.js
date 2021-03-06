import Vue from 'vue'
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const state = {
  categories: {},
  //{
  // Movies: ['Mad Max', 'Marvel Cinematic Universe'],
  // 'TV Shows': ['AP Bio'],
  // }

  ffQueries: [],
  // [
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
  // ],
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
    const i = state.categories[value[0]]
      ? state.categories[value[0]].indexOf(value[1])
      : {}
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

  FETCH_USER_DATA(state, userData) {
    state.categories = userData.categories
    state.ffQueries = userData.ffQueries
  },
}

const actions = {
  saveQuery: ({ dispatch, commit }, query) => {
    query.fandom = query.fandom.indexOf(' ')
      ? query.fandom
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : query.fandom.charAt(0) + query.fandom.slice(1)
    query.category = query.category.indexOf(' ')
      ? query.category
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : query.category.charAt(0) + query.category.slice(1)
    commit('SAVE_QUERY', query)

    const { category, fandom } = query
    //if the category object has the category
    if (Object.prototype.hasOwnProperty.call(state.categories, category)) {
      //loop through the categories and check the fandom
      const saveFandom = state.categories[category].every(
        currentFandom => currentFandom !== fandom
      )
      //if fandom doesn't exist in category
      if (saveFandom) {
        //push new fandom to category
        commit('SAVE_FANDOM', query)
      }
    } else {
      // if category doesn't exist, make a new category and add fandom to it
      commit('SAVE_NEW_CATEGORY', query)
    }

    dispatch('updateDB')
  },

  favQuery: ({ dispatch, commit }, value) => {
    value.favorited = !value.favorited
    commit('FAV_QUERY', value)
    dispatch('updateDB')
  },

  editQuery: async ({ dispatch, commit }, query) => {
    try {
      await commit('EDIT_QUERY', query)

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
    } finally {
      dispatch('updateDB')
    }
  },

  updateDB: () => {
    //add to DB
    let uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users/' + uid)
      .update({
        categories: state.categories,
        ffQueries: state.ffQueries,
      })
      .catch(error => console.error(error))
  },

  deleteCategory: ({ dispatch, commit }, value) => {
    commit('DELETE_CATEGORY', value)
    dispatch('updateDB')
  },

  deleteQuery: async ({ dispatch, commit }, value) => {
    await commit('DELETE_QUERY', value)
    dispatch('updateDB')
  },

  deleteFandom: ({ dispatch, commit }, value) => {
    commit('DELETE_FANDOM', value)
    dispatch('updateDB')
  },

  fetchUserData({ commit }) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users/' + uid)
      .once('value')
      .then(data => {
        const categories = data.val().categories ? data.val().categories : {}
        const ffQueries = data.val().ffQueries ? data.val().ffQueries : []
        commit('FETCH_USER_DATA', { categories, ffQueries })
      })
      .catch(error => console.error(error))
  },
}

const getters = {
  categories: () => {
    return state.categories
  },
  ffQueries: () => {
    return state.ffQueries
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
