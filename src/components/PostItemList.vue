<template>
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
    <p class="text-center p-2">It looks like there's nothing here :(</p>
    <p class="text-center p-2">Try a different view or sorting option</p>
  </div>
  <div v-else>
    <PostItem v-for="(post, index) in posts.posts" :key="index" :post="post" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostItem from './PostItem.vue';
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/api/posts';
import { useSiteStore } from '@/stores/site'

const site = useSiteStore()
const posts = usePostsStore()
const showLoader = ref(false)
const showSadFace = ref(false)

onMounted(() => {
  if (site.postsStale) updatePosts()
});

async function updatePosts() {
  showSadFace.value = false
  showLoader.value = true
  await posts.getFrontpage(site.postSort, site.postView)
  console.info('Loaded posts')
  site.setPostsStale(false)
  showLoader.value = false
  if (!posts.posts.length) showSadFace.value = true
}

site.$subscribe(() => {
  if (site.postsStale) {
    updatePosts()
  }
})

</script>