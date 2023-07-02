import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', () => {
  const visible = ref(false)
  const clickActive = ref(false)
  const hideNav = ref(false)

  return { clickActive, visible, hideNav }
})
