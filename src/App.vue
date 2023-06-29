<template>
  <DarkOverlay />
  <ToastDisplay />
  <LeftSidebar />
  <RightSidebar />
  <header class="absolute top-0 w-full">
    <TopNav />
  </header>
  <main class="pt-20 pb-20">
    <RouterView />
  </main>
  <footer>
    <BottomNav />
  </footer>
</template>

<style>
body,
#app {
  min-width: 100vw;
  min-height: 100vh;
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
