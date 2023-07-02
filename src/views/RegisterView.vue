<template>
  <main class="max-w-md mx-auto">
    <h1 class="text-center">Register</h1>
    <form>
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2" for="usename">
          Username
        </label>
        <input class="form-input px-4 py-2 rounded-md border border-gray-300 w-full" id="username" type="text"
          placeholder="Enter a username" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input class="form-input px-4 py-2 rounded-md border border-gray-300 w-full" id="email" type="email"
          placeholder="Enter your email address" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="form-input px-4 py-2 rounded-md border border-gray-300 w-full" id="password" type="password"
          placeholder="Enter a password" />
      </div>

      <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-3" type="submit">
        Submit
      </button>
      <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="submit" @click="cancel">
        Cancel
      </button>
    </form>
  </main>
</template>

<script setup>
import { useOverlayStore } from '@/stores/overlay'
import { useRouter } from 'vue-router'

const router = useRouter()
const overlay = useOverlayStore()

function cancel() {
  router.push('/')
  // Restore the bottom nav
  overlay.hide()
}
</script>
