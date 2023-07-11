<template>
  <div ref="containerEl" class="w-screen h-screen relative overflow-scroll pt-2 pb-96">
    <div ref="postDataContainerEl">
      <CommentPostData :postData="postData" v-if="contentReady" />
    </div>
    <!-- Post sticky title -->
    <div v-if="contentReady" v-show="stickyTitleVisible"
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

          <svg v-if="postData.counts.my_vote === 1" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 70 90"
            class="stroke-orange-300 fill-orange-300 w-4 h-4 mr-1">
            <path
              d="M50 85.5a13 13 0 0 1-13-13 13 13 0 0 1 22.2-9 13 13 0 0 1 3.8 9 13 13 0 0 1-13 13Zm0-11.3c3 0-2 2.2.2 0 2.1-2 .8 3 .8 0 0-2.9 2.9 2 .8 0-2.1-2.2-1.8.2-4.8.2s5.5-2.4 3.4-.3c-2.2 2.1-.7-5-.7-2s-.5-.9 1.6 1.2c2.1 2-4.3.9-1.3.9Zm-21.7-12a5 5 0 0 1-3.5-1.5l-8-8c-1.9-2-1.6-4.9 0-7L38.6 24l8-8c1.9-2 5-2 7 0l8 8L83 45.7c2 2 2 5 0 7l-8 8a5 5 0 0 1-3.3 1.4h-.1a5 5 0 0 1-3.6-1.4L50 42.5 31.9 60.7a5 5 0 0 1-3.6 1.5Zm0-1.6c1 0 .7-2.5 1.4-3.2L49.4 41c.3-.3.8-.3 1.1 0L72 59.2c.7.6-1.2 1.4-.3 1.4.8 0 1.7-.3 2.4-1l7.9-8c1.3-1.3-9.3 10.7-10.6 9.4L53.7 44.5 49 42.1l-5.4-19.6c-1.3-1.3 5.9-3.7 4.5-2.4l.8 22-20.5 19C27 62.5 16.7 50.2 18 51.5l8 8a3 3 0 0 0 2.3 1Z" />
          </svg>
          <svg v-if="postData.counts.my_vote === -1" xmlns="http://www.w3.org/2000/svg"
            class="stroke-blue-300 fill-blue-300 w-4 h-4 mr-1" viewBox="10 0 70 90">
            <path
              d="M50 14.5a12.9 12.9 0 1 0 0 25.9 13 13 0 0 0 13-13 13 13 0 0 0-3.8-9 13.2 13.2 0 0 0-9.2-3.9Zm-9.4 8.2c3 0 8.5 3.2 10.6 5.3 2.1 2.1 9.8-5 9.8-2s.3-4-1.8-1.9a70.3 70.3 0 0 1-20.8 6.4c-3 0 3.9 4.6 1.8 2.5-2.1-2 14.2-1.7 14.2-4.7S39.8 21.5 42 19.4c2.1-2.1-4.3 3.3-1.3 3.3ZM28.3 37.8a5 5 0 0 0-3.5 1.5l-8 8c-1.9 2-1.6 5 0 7l21.7 21.8 8 8a5 5 0 0 0 7 0l8-8L83 54.3c2-2 2-5 0-7l-8-8a5 5 0 0 0-3.3-1.4h-.1a5 5 0 0 0-3.6 1.4L50 57.5 31.9 39.3a5 5 0 0 0-3.6-1.5Zm12 21.2c.8 0 1 7.5 1.6 8.2l14.2-6.8c-.1 3-2.1 15.5-1.8 15.2l10.5-19c.6-.7-4 1.6-3.1 1.6.9 0-6.2 10-5.5 10.6l2.9 7.5c1.4 1.4 24.1-24.4 22.8-23L60.3 74.8l-6.7-14.6L49.3 80c-1.3 1.4 10-12.8 8.7-14.2L39.6 75l8.8 3c-1.2-1.5 2.2-4.8 3.6-6.2l7.6-11.6c.7-.7-20.2-1-19.4-1Z" />
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
    <div v-if="contentReady">
      <template v-for="(item, index) in visibleComments" :key="index">
        <CommentItem v-show="item.depth === 0 || !isCollapsedChild(index)" :collapsed="isCollapsed(item.comment.id)"
          :item="item" :index="index" @setVote="setVote" @setSaved="setSaved" @toggleCollapsed="toggleCollapsed" />
        <div v-if="item.depth + 1 >= 8" v-show="!isCollapsedChild(index)"
          class="relative bg-gray-800 rounded-md p-4 mb-0.5 mt-0.5" :style="{ marginLeft: (item.depth + 1) * 5 + 'px' }">
          <div class="absolute top-0 left-0 bottom-0" style="background-color: #AA8093; width: 3px"></div>
          <p>View {{ item.counts.child_count }} more comment<span v-if="item.counts.child_count > 1">s</span>...</p>
        </div>
      </template>
    </div>
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
import { usePostsStore } from '@/stores/api/posts'
import { useCommentsStore } from '@/stores/api/comments'

const props = defineProps(['postId'])

const showLoader = ref(true)
const showSadFace = ref(false)
let visibleComments = ref([])
const contentReady = ref(false)

const preferences = usePreferencesStore()
const posts = usePostsStore()
const comments = useCommentsStore()

let commentPageObserver = null;
let postDataObserver = null;

const containerEl = ref(null)
const scrollTargetEl = ref(null)
const postDataContainerEl = ref(null)
const stickyTitleVisible = ref(false)

const postData = ref({})
const commentData = ref([])

const collapsedComments = ref([])

let currentPage = 0
let commentsPerPage = 10

onMounted(async () => {
  contentReady.value = false
  showLoader.value = true
  showSadFace.value = false

  postData.value = await posts.requestSinglePost(props.postId)
  commentData.value = await comments.getComments(props.postId)
  contentReady.value = true

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
  if (commentData.value.length && (startIndex >= commentData.value.length || commentsPerPage === 0)) {
    showLoader.value = false
    showSadFace.value = true
    return []
  }
  const endIndex = Math.min(startIndex + commentsPerPage, commentData.value.length)
  const slice = commentData.value.slice(startIndex, endIndex)
  visibleComments.value = [...visibleComments.value, ...slice]
  currentPage++
  showLoader.value = false
}

function loadCommentThread(commentId) {
  console.log('loadCommentThread', commentId)
}

function setVote(commentIndex, score) {
  if (commentData.value[commentIndex].counts.my_vote === score) {
    score = 0
  }
  comments.sendVote(commentData.value[commentIndex].comment.id, score)
  commentData.value[commentIndex].counts.my_vote = score
  if (typeof visibleComments.value[commentIndex] !== 'undefined') {
    visibleComments.value[commentIndex].counts.my_vote = score
  }
}

function setSaved(commentIndex, saved) {
  comments.saveComment(commentData.value[commentIndex].comment.id, saved)
  if (typeof visibleComments.value[commentIndex] !== 'undefined') {
    visibleComments.value[commentIndex].comment.saved = saved
  }
}

function isCollapsed(comment_id) {
  return collapsedComments.value.includes(comment_id)
}

const isCollapsedChild = (index) => {
  const comment = commentData.value[index]
  if (collapsedComments.value.includes(comment.parent_id)) return true
  for (let i = index; i >= 0; i--) {
    if (collapsedComments.value.includes(commentData.value[i].parent_id)) return true
    if (commentData.value[i].depth === 0) return false
  }
  return false
}

function toggleCollapsed(comment_id) {
  if (collapsedComments.value.includes(comment_id)) {
    collapsedComments.value.splice(collapsedComments.value.indexOf(comment_id), 1)
  } else collapsedComments.value.push(comment_id)
}

</script>
