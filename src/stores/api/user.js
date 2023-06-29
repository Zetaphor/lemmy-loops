import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'

export const useUserStore = defineStore('user', () => {
  const api = useApiStore()

  const authenticated = ref(false)
  const person_id = ref(-1)
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

  function loginUser(instanceUrl, username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.login(instanceUrl, username, password)
        const personDetails = await api.getPersonDetails(username)
        authenticated.value = true
        setUserData(personDetails)
        updateUnreadCounts()
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
    person_id.value = personData.person_view.person.person_id
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
