<template>
  <PostItem v-for="(post, index) in posts.posts" :key="index" :post="post" />
</template>

<script setup>
import PostItem from './PostItem.vue';
import { onMounted } from 'vue'
import { usePostsStore } from '@/stores/api/posts';

const posts = usePostsStore()

onMounted(async () => {
  if (!posts.length) {
    await posts.getFrontpage()
    console.info('Loaded posts')
  }
});

</script>