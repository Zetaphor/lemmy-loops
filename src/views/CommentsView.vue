<template>
  <ReplyOverlay v-if="replyOverlay.visible" />
  <CommentItemList v-if="!showLoader" :postId="props.postId" />
  <CommentBottomNav />
</template>

<script setup>
import CommentItemList from '@/components/comments/CommentItemList.vue'
import CommentBottomNav from '@/components/comments/CommentBottomNav.vue';
import ReplyOverlay from '../components/overlays/ReplyOverlay.vue';
import { useReplyOverlayStore } from '@/stores/reply-overlay'

const props = defineProps(['postId'])

const replyOverlay = useReplyOverlayStore()


</script>
