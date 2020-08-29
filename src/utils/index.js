import axios from 'axios'

const firebaseApi = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

const userApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  headers: {
    'Content-type': 'application/json',
  },
})

https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

export { userApi, firebaseApi }
