import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReplyOverlayStore = defineStore('reply-overlay', () => {
  const visible = ref(false)
  const isPost = ref(false)
  const data = ref({})

  function showPostReply() {
    visible.value = true
    isPost.value = true
  }

  function showCommentReply() {
    visible.value = true
    isPost.value = false
  }

  return { visible, isPost, data, showPostReply, showCommentReply }
})
