import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LemmyHttp } from 'lemmy-js-client'
import { useToastStore } from './toast'

export const useApiStore = defineStore('api', () => {
  const baseUrl = ref('/')
  const client = new LemmyHttp(baseUrl.value)

  const jwt = ref('')
  const authenticated = ref(false)

  function getSite() {
    return client.getSite({})
  }

  function login(instanceUrl, username, password) {
    return new Promise((resolve, reject) => {
      const loginForm = {
        username_or_email: username,
        password: password
      }
      jwt.value = client
        .login(loginForm)
        .then((res) => {
          if (res.jwt) {
            authenticated.value = true
            jwt.value = res.jwt
            resolve()
          }
        })
        .catch((err) => reject(err))
    })
  }

  function getPersonDetails(username) {
    return new Promise((resolve, reject) => {
      const form = {
        username: username,
        auth: jwt.value,
        // limit: 10,
        sort: 'New'
      }
      client
        .getPersonDetails(form)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  function getPrivateMessages() {
    const form = {
      auth: jwt.value,
      limit: 50
    }
    client.getPrivateMessages(form).then((res) => {
      console.log(res)
    })
  }

  return { authenticated, getSite, login, getPersonDetails, getPrivateMessages }
})
