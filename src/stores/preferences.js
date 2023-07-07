import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
  const showPostCommunityIcon = ref(true)

  const showPostAvatars = ref(true)
  const showPostCustomAvatars = ref(true)

  const showCommentAvatars = ref(true)
  const showCommentCustomAvatars = ref(true)

  return {
    showPostCommunityIcon,
    showPostAvatars,
    showPostCustomAvatars,
    showCommentAvatars,
    showCommentCustomAvatars
  }
})
