<template>
  <div class="thread">
    <CommentItem :comment="rootComment" :depth="1" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CommentItem from './CommentItem.vue';

const rainbowColors = [
  "#FF0000", // Red
  "#FF7F00", // Orange
  "#e1ca00", // Yellow
  "#00dd00", // Green
  "#0000FF", // Blue
  "#4B0082", // Indigo
  "#8B00FF", // Violet
  "#FF00FF", // Magenta
  "#FF1493", // Deep Pink
  "#00FFFF", // Cyan
];
</script>

<style scoped>
.thread {
  margin: 0 auto;
  width: 60%;
}
</style>
