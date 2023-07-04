<template>
  <DarkOverlay />
  <ToastDisplay />
  <LeftSidebar />
  <RightSidebar />
  <header class="fixed top-0 w-full z-10">
    <TopNav />
  </header>
  <main class="pt-20 pb-20 bg-neutral-900">
    <RouterView />
  </main>
  <footer class="fixed bottom-0 w-full z-10">
    <BottomNav />
  </footer>
</template>

<style>
body,
#app {
  min-width: 100vw;
  min-height: 100vh;
  user-select: none;
}
</style>

<script setup>
import { RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue';
import BottomNav from './components/BottomNav.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import DarkOverlay from './components/DarkOverlay.vue';
import RightSidebar from './components/RightSidebar.vue';
import ToastDisplay from './components/ToastDisplay.vue';
</script>
