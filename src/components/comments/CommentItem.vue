<template>
  <div :style="{ marginLeft: item.comment.depth * 5 + 'px' }">
    <div class="comment">
      <button @click="toggleCollapse">
        {{ isCollapsed.value ? 'Expand' : 'Collapse' }}
      </button>
      <img :src="item.creator.avatar" class="w-10 rounded-full" />
      <p>{{ item.creator.name }}</p>
      <p>{{ item.comment.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps(['item'])

const isCollapsed = ref(false)

// const rainbowColors = [
//   "#FF0000", // Red
//   "#FF7F00", // Orange
//   "#e1ca00", // Yellow
//   "#00dd00", // Green
//   "#0000FF", // Blue
//   "#4B0082", // Indigo
//   "#8B00FF", // Violet
//   "#FF00FF", // Magenta
//   "#FF1493", // Deep Pink
//   "#00FFFF", // Cyan
// ]

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
