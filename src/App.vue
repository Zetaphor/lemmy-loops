<template>
  <DarkOverlay />
  <ToastDisplay />
  <LeftSidebar />
  <RightSidebar />
  <ContentOverlay />
  <header class="fixed top-0 w-full z-10">
    <TopNav />
  </header>
  <main class="pt-16 pb-20">
    <RouterView />
  </main>
</template>

<style>
body,
#app {
  min-width: 100vw;
  min-height: 100vh;
  user-select: none;
  overflow: hidden;
}
</style>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TopNav from './components/nav/TopNav.vue';
import LeftSidebar from './components/nav/LeftSidebar.vue';
import DarkOverlay from './components/overlays/DarkOverlay.vue';
import RightSidebar from './components/nav/RightSidebar.vue';
import ToastDisplay from './components/overlays/ToastDisplay.vue';
import ContentOverlay from './components/overlays/ContentOverlay.vue';
import { useUserStore } from '@/stores/api/user'
import { useSiteStore } from '@/stores/site'

const user = useUserStore()
const site = useSiteStore()

onMounted(() => {
  user.restoreLogin().then(() => {
    console.log('Login restored')
    site.postsStale = true
  }).catch(() => {
    console.info('No existing login found')
    site.postsStale = true
  })
})
</script>
