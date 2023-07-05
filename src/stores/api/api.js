import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LemmyHttp } from 'lemmy-js-client'

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
      client
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

  function getPersonDetails(identifier, useUsername = false) {
    return new Promise((resolve, reject) => {
      const form = {
        auth: jwt.value,
        sort: 'New'
      }

      if (useUsername) form.username = identifier
      else form.person_id = identifier

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

  function getUnreadCount() {
    return new Promise((resolve, reject) => {
      const form = {
        auth: jwt.value
      }
      client
        .getUnreadCount(form)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  function postVote(form) {
    client.likePost(form)
  }

  function getPosts(form) {
    return client.getPosts(form)
  }

  return {
    client,
    authenticated,
    jwt,
    getSite,
    login,
    getPersonDetails,
    getPrivateMessages,
    getUnreadCount,
    getPosts,
    postVote
  }
})
