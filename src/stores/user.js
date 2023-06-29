import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const person_id = ref(-1)
  const admin = ref(false)
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

  function setUserData(personData) {
    posts.value = personData.posts
    comments.value = personData.comments
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
    setUserData,
    avatarImage,
    person_id,
    admin,
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
