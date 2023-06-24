<script setup>
import { RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue';
import BottomNav from './components/BottomNav.vue';
import LeftSidebar from './components/LeftSidebar.vue';
</script>

<template>
  <div class="drawer">
    <input id="left-sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <header>
        <TopNav />
      </header>
      <main>
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
