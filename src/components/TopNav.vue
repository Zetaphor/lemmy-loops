<template>
  <div class="fixed w-full navbar bg-base-300">

    <div v-show="!screen.isLargeScreen" class="flex-none">
      <label for="left-sidebar" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="px-2 mx-2">
      <p>Current view or community name
      </p>
    </div>
    <div v-show="screen.isLargeScreen" class="flex-none">
      <ul class="menu menu-horizontal">
        <li><a>Navbar Item 1</a></li>
        <li><a>Navbar Item 2</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 -0.15 1.062 1.4874999999999998" class="w-5 h-5 fill-current">
            <path
              d="M0.032 0.13c0.084,-0.04 0.167,-0.071 0.249,-0.093 0.091,-0.025 0.171,-0.037 0.25,-0.037 0.08,0 0.159,0.012 0.251,0.037 0.081,0.022 0.164,0.053 0.249,0.093 0.018,0.007 0.031,0.025 0.031,0.046 0,0.248 -0.032,0.441 -0.112,0.601 -0.08,0.161 -0.206,0.288 -0.392,0.405 -0.016,0.01 -0.037,0.01 -0.053,0 -0.186,-0.117 -0.312,-0.244 -0.392,-0.405 -0.08,-0.16 -0.113,-0.353 -0.113,-0.601 0,-0.021 0.013,-0.039 0.032,-0.046zm0.499 -0.033c-0.072,0 -0.143,0.011 -0.225,0.033 -0.069,0.018 -0.139,0.044 -0.209,0.076 0.002,0.219 0.033,0.389 0.102,0.528 0.068,0.137 0.175,0.248 0.332,0.35 0.157,-0.102 0.264,-0.213 0.333,-0.35 0.069,-0.139 0.099,-0.309 0.102,-0.528 -0.071,-0.032 -0.14,-0.058 -0.209,-0.076 -0.082,-0.022 -0.154,-0.033 -0.226,-0.033z" />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item">2</span>
        </div>
      </button>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item">2</span>
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
          <img src="/favicon.png" />
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { useScreenStore } from '@/stores/screen'

const screen = useScreenStore()


</script>
