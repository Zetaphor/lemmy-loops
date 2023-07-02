import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', () => {
  const visible = ref(false)
  const clickActive = ref(false)
  const hideNav = ref(false)

  function hide() {
    visible.value = false
    clickActive.value = false
    hideNav.value = false
  }

  return { hide, clickActive, visible, hideNav }
})
