<template>
  <div :style="{ marginLeft: depth * 5 + 'px' }">
    <div class="comment">
      <button @click="toggleCollapse">
        {{ isCollapsed.value ? 'Expand' : 'Collapse' }}
      </button>
      <img :src="comment.creator.avatar" class="w-10 rounded-full" />
      <p>{{ comment.creator.name }}</p>
      <p>{{ comment.comment.content }}</p>
    </div>
    <div v-show="!isCollapsed.value">
      <CommentItem v-for="(child, index) in comment.children" :key="index" :comment="child" :depth="depth + 1" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCommentsStore } from '@/stores/api/comments'

defineProps(['comment', 'depth'])

const isCollapsed = ref(false)
const comments = useCommentsStore()

onMounted(() => {
  comments.renderedNodes = comments.renderedNodes + 1
})

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<style scoped>
.comment {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
