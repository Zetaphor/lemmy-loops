<script setup>
import { RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue';
import BottomNav from './components/BottomNav.vue';
import LeftSidebar from './components/LeftSidebar.vue';
import ModalAddAccount from './components/ModalAddAccount.vue';

import { useScreenStore } from '@/stores/screen'

const screen = useScreenStore()
</script>

<template>
  <ModalAddAccount />
  <div class="drawer">
    <input id="left-sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col bg-gray-950">
      <header class="absolute top-0 w-full">
        <TopNav />
      </header>
      <main class="pt-20 pb-20">
        <RouterView />
      </main>
      <footer>
        <BottomNav />
      </footer>
    </div>
    <LeftSidebar />
  </div>
</template>

<style scoped></style>
