import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', () => {
  const baseUrl = ref('zemmy.cc')

  const sites = ref([])

  // "Active" | "Hot" | "New" | "Old" | "TopDay" | "TopWeek" | "TopMonth" | "TopYear" | "TopAll" | "MostComments" | "NewComments" | "TopHour" | "TopSixHour" | "TopTwelveHour"
  const postSort = ref('Hot')
  const postView = ref('All')
  const postsStale = ref(false)

  const commentSort = ref('Hot')
  const commentsStale = ref(false)

  function setBaseUrl(newUrl) {
    baseUrl.value = newUrl
  }

  return {
    baseUrl,
    sites,
    postSort,
    postView,
    postsStale,
    commentSort,
    commentsStale,
    setBaseUrl
  }
})
