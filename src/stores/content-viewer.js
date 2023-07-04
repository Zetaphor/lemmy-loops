import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContentViewerStore = defineStore('contentViewer', () => {
  const visible = ref(false)
  const url = ref('')
  const video = ref(false)
  const audio = ref(false)
  const extension = ref('')

  function hideContent() {
    visible.value = false
    url.value = ''
    video.value = false
    audio.value = false
    extension.value = ''
    document.documentElement.style.zoom = 'reset'
  }

  return { visible, url, audio, video, hideContent }
})
