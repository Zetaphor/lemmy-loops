import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'

export const useUserStore = defineStore('user', () => {
  const api = useApiStore()

  const authenticated = ref(false)
  const person_id = ref(-1)
  const username = ref('')
  const admin = ref(false)
  const moderator = ref(false)
  const avatarImage = ref('/favicon.png')
  const banned = ref(false)
  const bot_account = ref(false)
  const bio = ref('')
  const local = ref(false)
  const matrix_user_id = ref('')
  const display_name = ref('')
  const created = ref('')
  const posts = ref([])
  const comments = ref([])
  const moderates = ref([])
  const unreadCounts = ref({
    replies: 0,
    mentions: 0,
    privateMessages: 0,
    total: 0
  })
  const privateMessages = ref([])

  async function restoreLogin() {
    return new Promise(async (resolve, reject) => {
      const lemmy_jwt = localStorage.getItem('lemmy_jwt')
      const lemmy_person_id = Number(localStorage.getItem('lemmy_person_id'))
      if (
        !lemmy_jwt ||
        !lemmy_person_id ||
        !lemmy_jwt.length ||
        typeof lemmy_jwt !== 'string' ||
        typeof lemmy_person_id !== 'number'
      ) {
        console.log(lemmy_jwt, lemmy_person_id)
        reject()
        return
      }
      api.jwt = localStorage.getItem('lemmy_jwt')
      const personDetails = await api.getPersonDetails(localStorage.getItem('lemmy_person_id'))
      setUserData(personDetails)
      authenticated.value = true
      api.authenticated = true
      resolve()
    })
  }

  function loginUser(instanceUrl, username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.login(instanceUrl, username, password)
        const personDetails = await api.getPersonDetails(username, true)
        authenticated.value = true
        setUserData(personDetails)
        updateUnreadCounts()
        localStorage.setItem('lemmy_jwt', api.jwt)
        localStorage.setItem('lemmy_person_id', person_id.value)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  function updateUnreadCounts() {
    api.getUnreadCount().then((res) => {
      unreadCounts.value.replies = res.replies
      unreadCounts.value.mentions = res.mentions
      unreadCounts.value.privateMessages = res.private_messages
      unreadCounts.value.total =
        unreadCounts.value.replies +
        unreadCounts.value.mentions +
        unreadCounts.value.privateMessages
    })
  }

  function setUserData(personData) {
    posts.value = personData.posts
    comments.value = personData.comments
    moderator.value = personData.moderates.length > 0
    moderates.value = personData.moderates
    username.value = personData.person_view.person.username
    person_id.value = personData.person_view.person.id
    admin.value = personData.person_view.person.admin
    avatarImage.value = personData.person_view.person.avatar
    banned.value = personData.person_view.person.banned
    bio.value = personData.person_view.person.bio
    bot_account.value = personData.person_view.person.bot_account
    local.value = personData.person_view.person.local
    matrix_user_id.value = personData.person_view.person.matrix_user_id
    display_name.value = personData.person_view.person.name
    created.value = personData.person_view.person.published
  }

  return {
    loginUser,
    updateUnreadCounts,
    restoreLogin,
    authenticated,
    unreadCounts,
    privateMessages,
    avatarImage,
    person_id,
    admin,
    moderator,
    banned,
    bot_account,
    bio,
    local,
    matrix_user_id,
    display_name,
    created,
    posts,
    comments,
    moderates
  }
})
