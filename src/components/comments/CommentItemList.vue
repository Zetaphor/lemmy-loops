<template>
  <div ref="containerEl" class="w-screen h-screen relative overflow-scroll pt-2 pb-96">
    <div ref="postDataContainerEl">
      <CommentPostData :post="postData" />
    </div>
    <!-- Post sticky title -->
    <div v-show="stickyTitleVisible"
      class="fixed top-14 z-10 card-bordered card-compact shadow-sm w-full pb-1 bg-gray-700 border-gray-600 border-b-2 border-l-0 border-r-0 border-t-0">
      <p class="pl-1 pr-1 pt-2 text-sm text-gray-300 max-h-10 overflow-hidden overflow-ellipsis truncate">{{
        postData.content.name
      }}</p>
      <div>
        <div class="text-sm inline-flex items-center">
          <p class="flex-grow-0 text-md ml-0.5">{{ postData.content.published }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" class="h-4 w-4">
            <circle cx="5" cy="5" r="2" class="fill-current text-gray-600" />
          </svg>
          <p class="flex-grow-0 text-md">{{ postData.counts.score }}pts</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" class="h-4 w-4 mr-0.5">
            <circle cx="5" cy="5" r="2" class="fill-current text-gray-600" />
          </svg>


          <img v-if="postData.community.icon.length && preferences.showPostCommunityIcon" :src="postData.community.icon"
            class="h-4 w-4 rounded-sm mt-0.5 mr-1">
          <p class="text-sm flex-grow-0 text-gray-300">{{ postData.community.name }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 24 24" fill="none" stroke="currentColor" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-gray-400">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <p class="text-sm flex-grow-0 text-gray-400">{{ postData.community.actor_domain }}</p>
        </div>
      </div>
    </div>

    <!-- Comment items -->
    <CommentItem :item="item" v-for="(item, index) in visibleComments" :key="index" />
    <div ref="scrollTargetEl"></div>

    <!-- Comment loader -->
    <div v-if="showLoader" class="flex justify-center items-center">
      <svg class="stroke-gray-100 " xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
        style='shape-rendering: auto;' width='200px' height='200px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
        <path fill='none' stroke-width='10' stroke-dasharray='205.271142578125 51.317785644531256'
          d='M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z'
          stroke-linecap='round' style='transform:scale(0.8);transform-origin:50px 50px'>
          <animate attributeName='stroke-dashoffset' repeatCount='indefinite' dur='2s' keyTimes='0;1'
            values='0;256.58892822265625'></animate>
        </path>
      </svg>
    </div>

    <!-- No comments -->
    <div v-else-if="showSadFace">
      <div class="flex justify-center items-center mt-3">
        <svg class="stroke-gray-100 fill-gray-100 w-24 h-24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
          version="1.1" viewBox="0 0 333 416.25">
          <path d="M167 26c184 0 184 281 0 281-185 0-185-281 0-281zm0 19C6 45 6 289 167 289c160 0 160-244 0-244z" />
          <circle cx="121" cy="122" r="19" />
          <circle cx="213" cy="122" r="19" />
          <path d="M92 237c-1 2 0 4 3 4h9c2 0 2-2 3-3 22-58 97-58 120 0 0 1 1 3 3 3h9c2 0 3-2 2-4-25-78-123-78-149 0z" />
        </svg>
      </div>
      <p class="text-center p-2">It looks like there's no more comments here.</p>
      <p class="text-center p-2">Why not contribute a reply?</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CommentPostData from '@/components/comments/CommentPostData.vue'
import CommentItem from '@/components/comments/CommentItem.vue';
import { usePreferencesStore } from '@/stores/preferences'

const props = defineProps(['postId', 'postData', 'postComments'])

const showLoader = ref(false)
const showSadFace = ref(false)
let visibleComments = ref([])

const preferences = usePreferencesStore()

let commentPageObserver = null;
let postDataObserver = null;

const containerEl = ref(null)
const scrollTargetEl = ref(null)
const postDataContainerEl = ref(null)
const stickyTitleVisible = ref(false)

let currentPage = 0
let commentsPerPage = 10

onMounted(() => {
  showLoader.value = false
  showSadFace.value = false
  renderMoreComments()
  setupObservers()
})

function setupObservers() {
  commentPageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderMoreComments();
        }
      })
    },
    {
      root: containerEl.value,
      rootMargin: '500px',
      threshold: 0.1,
    }
  )

  postDataObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) stickyTitleVisible.value = false
        else stickyTitleVisible.value = true
      })
    },
    {
      root: containerEl.value,
      rootMargin: '1px',
      threshold: 0.1,
    }
  )

  if (scrollTargetEl.value) {
    commentPageObserver.observe(scrollTargetEl.value)
  }

  if (postDataContainerEl.value) {
    postDataObserver.observe(postDataContainerEl.value)
  }
}

onUnmounted(() => {
  if (commentPageObserver && scrollTargetEl.value) {
    commentPageObserver.unobserve(scrollTargetEl.value)
    commentPageObserver.disconnect()
    commentPageObserver = null
  }

  if (postDataObserver && postDataContainerEl.value) {
    postDataObserver.unobserve(postDataContainerEl.value)
    postDataObserver.disconnect()
    postDataObserver = null
  }
})

function renderMoreComments() {
  showLoader.value = true
  const startIndex = currentPage * commentsPerPage
  if (props.postComments.length && (startIndex >= props.postComments.length || commentsPerPage === 0)) {
    console.log('Reached end of list')
    showLoader.value = false
    showSadFace.value = true
    return []
  }
  const endIndex = Math.min(startIndex + commentsPerPage, props.postComments.length)
  const slice = props.postComments.slice(startIndex, endIndex)
  visibleComments.value = [...visibleComments.value, ...slice]
  console.info('Loaded comment page', currentPage)
  currentPage++
  showLoader.value = false
}
</script>
