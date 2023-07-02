import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const leftVisible = ref(false)
  const rightVisible = ref(false)

  return { leftVisible, rightVisible }
})
