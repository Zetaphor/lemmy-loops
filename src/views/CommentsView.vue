<template>
  <CommentItemList v-if="!showLoader" :postId="props.postId" :postData="postData" :postComments="commentData" />
  <CommentBottomNav />
</template>

<script setup>
import CommentItemList from '@/components/comments/CommentItemList.vue'
import CommentBottomNav from '@/components/comments/CommentBottomNav.vue';

const props = defineProps(['postId'])
</script>
