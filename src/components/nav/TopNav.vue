<template>
  <div class="navbar bg-base-300">
    <div v-show="!screen.isLargeScreen" class="flex-none">
      <label for="left-sidebar" class="btn btn-square btn-ghost" @click="toggleLeftSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="px-2 mx-2">
      <!-- <p>Current view or community name</p> -->
    </div>
    <div v-if="!user.authenticated" v-show="screen.isLargeScreen" class="flex-none">
      <ul class="menu menu-horizontal">
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
    </div>
    <div v-else class="navbar-end">
      <button v-if="user.admin" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 5 74 60" stroke="currentColor" class="w-5 h-5 fill-current">
            <path d=" M46.6691 8.11515C52.5065 8.92747 57 13.939 57 20V50C57 56.6274 51.6274 62 45 62H19C12.3726 62 7 56.6274
          7 50V20C7 13.939 11.4935 8.92745 17.3309 8.11515C17.2616 4.86197 19.8801 2 23.3334 2H40.6667C44.1199 2 46.7384
          4.86198 46.6691 8.11515ZM18.2599 12.0338C14.1886 12.4073 11 15.8313 11 20V50C11 54.4183 14.5817 58 19
          58H45C49.4183 58 53 54.4183 53 50V20C53 15.8313 49.8115 12.4073 45.7402 12.0338L45.26 13.68C44.5134 16.24
          42.1667 18 39.5 18H24.5C21.8334 18 19.4867 16.24 18.74 13.68L18.2599 12.0338ZM21.4134 8.56C21.04 7.28 22 6
          23.3334 6H40.6667C42 6 42.96 7.28 42.5867 8.56L41.42 12.56C41.1711 13.4133 40.3889 14 39.5 14H24.5C23.6111 14
          22.8289 13.4133 22.58 12.56L21.4134 8.56Z" />
          </svg>
          <!-- <span class="badge badge-xs badge-primary indicator-item">2</span> -->
        </div>
      </button>
      <button v-if="user.moderator" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 -0.15 1.062 1.4874999999999998" class="w-5 h-5 fill-current">
            <path
              d="M0.032 0.13c0.084,-0.04 0.167,-0.071 0.249,-0.093 0.091,-0.025 0.171,-0.037 0.25,-0.037 0.08,0 0.159,0.012 0.251,0.037 0.081,0.022 0.164,0.053 0.249,0.093 0.018,0.007 0.031,0.025 0.031,0.046 0,0.248 -0.032,0.441 -0.112,0.601 -0.08,0.161 -0.206,0.288 -0.392,0.405 -0.016,0.01 -0.037,0.01 -0.053,0 -0.186,-0.117 -0.312,-0.244 -0.392,-0.405 -0.08,-0.16 -0.113,-0.353 -0.113,-0.601 0,-0.021 0.013,-0.039 0.032,-0.046zm0.499 -0.033c-0.072,0 -0.143,0.011 -0.225,0.033 -0.069,0.018 -0.139,0.044 -0.209,0.076 0.002,0.219 0.033,0.389 0.102,0.528 0.068,0.137 0.175,0.248 0.332,0.35 0.157,-0.102 0.264,-0.213 0.333,-0.35 0.069,-0.139 0.099,-0.309 0.102,-0.528 -0.071,-0.032 -0.14,-0.058 -0.209,-0.076 -0.082,-0.022 -0.154,-0.033 -0.226,-0.033z" />
          </svg>
          <!-- <span class="badge badge-xs badge-primary indicator-item">2</span> -->
        </div>
      </button>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span v-if="user.unreadCounts.total" class="badge badge-xs badge-primary indicator-item">{{
            user.unreadCounts.total }}</span>
        </div>
      </button>
      <button class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img :src="user.avatarImage" />
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { useScreenStore } from '@/stores/screen'
import { useUserStore } from '@/stores/api/user'
import { useSidebarStore } from '@/stores/sidebar'
import { useOverlayStore } from '@/stores/overlay'

const screen = useScreenStore()
const user = useUserStore()
const sidebar = useSidebarStore()
const overlay = useOverlayStore()

function toggleLeftSidebar() {
  if (sidebar.leftVisible) {
    sidebar.leftVisible = false
    overlay.visible = false
  } else {
    sidebar.leftVisible = true
    overlay.visible = true
    overlay.hideNav = true
  }
}

overlay.$subscribe(() => {
  if (overlay.clickActive) {
    if (sidebar.leftVisible) {
      toggleLeftSidebar()
      overlay.hide()
    }
  }
})


</script>
