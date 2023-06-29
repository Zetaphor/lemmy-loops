import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', () => {
  const visible = ref(false)

  function toggleOverlay() {
    visible.value = !visible.value
  }

  function showOverlay() {
    visible.value = true
  }

  function hideOverlay() {
    visible.value = false
  }

  return { visible, toggleOverlay, showOverlay, hideOverlay }
})
