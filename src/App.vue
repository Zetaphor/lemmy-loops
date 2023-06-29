<script setup>
import { RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue';
import BottomNav from './components/BottomNav.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import ModalAddAccount from './components/ModalAddAccount.vue';

// import { useScreenStore } from '@/stores/screen'
import DarkOverlay from './components/DarkOverlay.vue';
import RightSidebar from './components/RightSidebar.vue';

// const screen = useScreenStore()
</script>

<template>
  <DarkOverlay />
  <ModalAddAccount />
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

<style scoped></style>
