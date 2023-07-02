<template>
  <div id="leftSidebar" v-show="sidebars.leftVisible" class="fixed bg-base-200 w-56 h-full z-50">
    <ul v-if="!user.authenticated" class="menu">
      <li><router-link to="login" @click="closeSidebar">Login</router-link></li>
      <li><router-link to="register" @click="closeSidebar">Register</router-link></li>
    </ul>

    <ul v-else class="menu">
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
import { useUserStore } from '@/stores/api/user'
import { useOverlayStore } from '@/stores/overlay'

const overlay = useOverlayStore()
const user = useUserStore()
const sidebars = useSidebarStore()


function closeSidebar() {
  sidebars.leftVisible = false
  overlay.hide()
}
</script>