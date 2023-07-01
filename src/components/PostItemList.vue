<template>
  <div v-if="showLoader" class="text-slate-100 flex justify-center items-center">
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
  <div v-else>
    <PostItem v-for="(post, index) in posts.posts" :key="index" :post="post" />
  </div>
</template>

<style scoped>
.loader {
  width: 210px;
  height: 150px;
  mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyBzdHlsZT0nc2hhcGUtcmVuZGVyaW5nOiBhdXRvOycgd2lkdGg9JzIwMHB4JyBoZWlnaHQ9JzIwMHB4JyB2aWV3Qm94PScwIDAgMTAwIDEwMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0neE1pZFlNaWQnPjxwYXRoIGZpbGw9J25vbmUnIHN0cm9rZT0nIzBhMGEwYScgc3Ryb2tlLXdpZHRoPScxMCcgc3Ryb2tlLWRhc2hhcnJheT0nMjA1LjI3MTE0MjU3ODEyNSA1MS4zMTc3ODU2NDQ1MzEyNTYnIGQ9J00yNC4zIDMwQzExLjQgMzAgNSA0My4zIDUgNTBzNi40IDIwIDE5LjMgMjBjMTkuMyAwIDMyLjEtNDAgNTEuNC00MCBDODguNiAzMCA5NSA0My4zIDk1IDUwcy02LjQgMjAtMTkuMyAyMEM1Ni40IDcwIDQzLjYgMzAgMjQuMyAzMHonIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3R5bGU9J3RyYW5zZm9ybTpzY2FsZSgwLjgpO3RyYW5zZm9ybS1vcmlnaW46NTBweCA1MHB4Jz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdzdHJva2UtZGFzaG9mZnNldCcgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnIGR1cj0nMnMnIGtleVRpbWVzPScwOzEnIHZhbHVlcz0nMDsyNTYuNTg4OTI4MjIyNjU2MjUnPjwvYW5pbWF0ZT48L3BhdGg+PC9zdmc+)
}
</style>

<script setup>
import { ref } from 'vue'
import PostItem from './PostItem.vue';
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/api/posts';
import { useSiteStore } from '@/stores/site'

const site = useSiteStore()
const posts = usePostsStore()
const showLoader = ref(true)

onMounted(() => {
  if (site.postsStale) updatePosts()
});

async function updatePosts() {
  showLoader.value = true
  await posts.getFrontpage(site.postSort, site.postView)
  console.info('Loaded posts')
  site.setPostsStale(false)
  showLoader.value = false
}

site.$subscribe(() => {
  if (site.postsStale) updatePosts()
})

</script>