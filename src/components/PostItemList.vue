<script setup>
import PostItem from './PostItem.vue';

</script>

<template>
  <PostItem v-for="i in 10" :key="i" />
</template>