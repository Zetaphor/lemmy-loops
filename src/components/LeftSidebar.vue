<template>
  <div id="leftSidebar" v-show="sidebars.leftVisible" class="fixed bg-base-200 w-56 h-full z-50">
    <ul class="menu">
      <li>
        <details>
          <summary>Username</summary>
          <ul>
            <li><router-link to="addAccount">Add Account</router-link></li>
            <li><a>Logout</a></li>
          </ul>
        </details>
      </li>
      <li><a>Posts</a></li>
      <li>
        <details>
          <summary>Profile</summary>
          <ul>
            <li><a>Posts</a></li>
            <li><a>Comments</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Inbox</summary>
          <ul>
            <li><a>Unread</a></li>
            <li><a>Messages</a></li>
            <li><a>Sent</a></li>
          </ul>
        </details>
      </li>
      <li><a>Moderation</a></li>
      <li><a>Applications</a></li>
    </ul>
  </div>
</template>

<script setup>
import { useSidebarStore } from '@/stores/sidebar'
const sidebars = useSidebarStore()
</script>