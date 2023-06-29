<template>
  <div id="rightSidebar" v-show="sidebars.rightVisible" class="fixed bg-base-200 w-56 h-full z-50 right-0">
    <Markdown :source="markdown" />
  </div>
</template>

<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import Markdown from '@/components/Markdown.vue'

const sidebars = useSidebarStore()

const markdown = "This is a _test_ of the **markdown** functionality including plugins."
</script>