import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const leftVisible = ref(false)
  const rightVisible = ref(true)

  function toggleLeft() {
    leftVisible.value = !leftVisible.value
  }

  function toggleRight() {
    rightVisible.value = !rightVisible.value
  }

  return { leftVisible, rightVisible, toggleLeft, toggleRight }
})
