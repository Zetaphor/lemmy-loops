import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', () => {
  const baseUrl = ref('zemmy.cc')

  const sites = ref([])

  const postSort = ref('Hot')
  const postView = ref('All')

  const postsStale = ref(true)

  function setPostsStale(value) {
    postsStale.value = value
  }

  function setBaseUrl(newUrl) {
    baseUrl.value = newUrl
  }

  function setPostView(newView) {
    postView.value = newView
  }

  function setPostSort(newSort) {
    postSort.value = newSort
  }

  return {
    baseUrl,
    sites,
    postSort,
    postView,
    postsStale,
    setBaseUrl,
    setPostSort,
    setPostView,
    setPostsStale
  }
})
