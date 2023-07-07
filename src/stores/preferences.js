import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
  const showPostAvatars = ref(false)
  const showPostCustomAvatars = ref(false)
  const showCommentAvatars = ref(true)
  const showCommentCustomAvatars = ref(true)

  return {
    showPostAvatars,
    showPostCustomAvatars,
    showCommentAvatars,
    showCommentCustomAvatars
  }
})
