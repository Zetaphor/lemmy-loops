<template>
  <PostItem v-for="i in 10" :key="i" />
</template>

<script setup>
import PostItem from './PostItem.vue';

</script>