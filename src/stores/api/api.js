import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LemmyHttp } from 'lemmy-js-client'

export const useApiStore = defineStore('api', () => {
  const baseUrl = ref('https://zemmy.cc')
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

  function postVote(post_id, vote) {
    const form = {
      auth: jwt.value,
      post_id: post_id,
      score: vote
    }
    return client.likePost(form)
  }

  function postSave(post_id, saved) {
    const form = {
      auth: jwt.value,
      post_id: post_id,
      save: saved
    }
    return client.savePost(form)
  }

  function getPosts(sort, view, page) {
    const form = {
      type_: view,
      sort: sort,
      limit: 25,
      page: page.value
    }

    if (authenticated.value) {
      form.auth = jwt.value

      if (view == 'Saved') {
        form.type_ = 'All'
        form.saved_only = true
      }
    }
    return client.getPosts(form)
  }

  function getComments(post_id, sort, view, page, limit) {
    const form = {
      post_id: post_id,
      max_depth: 8,
      sort: sort,
      type_: view
      // limit: limit,
      // page: page
    }
    console.log(form)
    if (authenticated.value) form.auth = jwt.value
    return client.getComments(form)
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
    postVote,
    postSave,
    getComments
  }
})
