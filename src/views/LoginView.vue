<template>
  <main class="max-w-md mx-auto">
    <h1 class="text-center">Login</h1>
    <form>
      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2" for="instanceUrl">
          Instance URL
        </label>
        <input v-model="instanceUrl" class="form-input px-4 py-2 rounded-md border border-gray-300 w-full"
          id="instanceUrl" type="text" placeholder="Ex: zemmy.cc" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input v-model="username" class="form-input px-4 py-2 rounded-md border border-gray-300 w-full" id="username"
          type="text" placeholder="Enter your username" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-400 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password" class="form-input px-4 py-2 rounded-md border border-gray-300 w-full" id="password"
          type="password" placeholder="Enter your password" />
      </div>

      <button @click="login" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-3"
        type="button">
        Login
      </button>
      <button @click="cancel" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button">
        Cancel
      </button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/api/user'
import { useRouter } from 'vue-router'
import { useOverlayStore } from '@/stores/overlay'
import { useSiteStore } from '@/stores/site'

const router = useRouter()
const user = useUserStore()
const toasts = useToastStore()
const overlay = useOverlayStore()
const site = useSiteStore()

const instanceUrl = ref('')
const username = ref('Zetaphor')
const password = ref('')

async function login() {
  try {
    console.log('login')
    await user.loginUser(instanceUrl.value, username.value, password.value)
    overlay.hide()
    site.postsStale = true
    router.push('/')
  } catch (error) {
    console.error(error)
    toasts.error(error)
  }
}

function cancel() {
  router.push('/')
  // Restore the bottom nav
  overlay.hide()
}
</script>
