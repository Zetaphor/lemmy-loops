<template>
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

  <CommentPostData v-if="!showLoader" :post="postData" />
  <CommentItemList v-if="!showLoader" :postId="props.postId" :postComments="commentData" />
  <CommentBottomNav />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommentPostData from '@/components/comments/CommentPostData.vue'
import CommentItemList from '@/components/comments/CommentItemList.vue'
import { useCommentsStore } from '@/stores/api/comments'
import CommentBottomNav from '@/components/comments/CommentBottomNav.vue';

import { usePostsStore } from '@/stores/api/posts'

const props = defineProps(['postId'])

const posts = usePostsStore()
const comments = useCommentsStore()

const postData = ref({})
const commentData = ref([])

const showLoader = ref(true)


onMounted(async () => {
  try {
    postData.value = await posts.requestSinglePost(props.postId)
    commentData.value = await comments.getComments(props.postId)
    showLoader.value = false
  } catch (error) {
    console.error(error)
  }

})


</script>
