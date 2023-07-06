<template>
  <CommentItemList :post_id="props.post_id" />
  <BottomNav />
</template>

<script setup>
import CommentItemList from '@/components/comments/CommentItemList.vue'
import BottomNav from '@/components/posts/BottomNav.vue';

const props = defineProps(['post_id'])
</script>
