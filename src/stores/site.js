import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', () => {
  const baseUrl = ref('zemmy.cc')

  const sites = ref([])

  function setBaseUrl(newUrl) {
    baseUrl.value = newUrl
  }

  return { baseUrl, sites, setBaseUrl }
})
