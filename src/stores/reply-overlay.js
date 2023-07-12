import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReplyOverlayStore = defineStore('reply-overlay', () => {
  const visible = ref(false)
  const isPost = ref(false)
  const data = ref({})

  function showPostReply() {
    isPost.value = true
    visible.value = true
  }

  function showCommentReply() {
    isPost.value = false
    visible.value = true
  }

  return { visible, isPost, data, showPostReply, showCommentReply }
})
