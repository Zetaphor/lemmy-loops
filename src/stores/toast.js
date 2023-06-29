import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function error(content) {
    addToast('error', content)
  }

  function success(content) {
    addToast('success', content)
  }

  function warning(content) {
    addToast('warning', content)
  }

  function info(content) {
    addToast('info', content)
  }

  function addToast(type, content) {
    console.log('addToast', type, content)
    toasts.value.push({
      type: `alert-${type}`,
      content,
      interval: setTimeout(() => {
        const lastToast = toasts.value.pop()
        clearInterval(lastToast.interval)
      }, 5000)
    })
  }

  return { toasts, error, success, warning, info }
})
