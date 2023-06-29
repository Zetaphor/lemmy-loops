<template>
  <div ref="appContainer">
    <DarkOverlay />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue';
import BottomNav from './components/BottomNav.vue';
import LeftSidebar from './components/LeftSidebar.vue';

import DarkOverlay from './components/DarkOverlay.vue';
import RightSidebar from './components/RightSidebar.vue';

const appContainer = ref(null)

</script>
