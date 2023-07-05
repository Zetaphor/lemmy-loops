import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', () => {
  const baseUrl = ref('zemmy.cc')

  const sites = ref([])

  // "Active" | "Hot" | "New" | "Old" | "TopDay" | "TopWeek" | "TopMonth" | "TopYear" | "TopAll" | "MostComments" | "NewComments" | "TopHour" | "TopSixHour" | "TopTwelveHour"
  const postSort = ref('Hot')
  const postView = ref('All')

  const postsStale = ref(false)

  function setBaseUrl(newUrl) {
    baseUrl.value = newUrl
  }

  function setPostsStale(value) {
    postsStale.value = value
  }

  return {
    baseUrl,
    sites,
    postSort,
    postView,
    postsStale,
    setPostsStale,
    setBaseUrl
  }
})
