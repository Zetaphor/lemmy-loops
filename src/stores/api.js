import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LemmyHttp } from 'lemmy-js-client'

export const useApiStore = defineStore('api', () => {
  const baseUrl = ref('/')
  const client = new LemmyHttp(baseUrl)

  const username = ref('')
  const password = ref('')
  const jwt = ref('')

  function getSite() {
    return client.getSite({})
  }

  async function login() {
    const loginForm = {
      username_or_email: username.value,
      password: password.value
    }
    this.jwt = await client.login(loginForm).jwt
  }

  return { baseUrl, client, username, password, jwt, getSite, login }
})
