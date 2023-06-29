<template>
  <div v-if="overlay.visible" class="visible fixed w-full h-full bg-base-300 z-10 opacity-80"></div>
</template>

<script setup>
import { useOverlayStore } from '@/stores/overlay'
const overlay = useOverlayStore()
</script>