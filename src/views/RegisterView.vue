<template>
  <main class="max-w-md mx-auto">
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input class="form-input px-4 py-2 rounded-md border border-gray-300 w-full" id="name" type="text"
          placeholder="Enter your name" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input class="form-input px-4 py-2 rounded-md border border-gray-300 w-full" id="email" type="email"
          placeholder="Enter your email address" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
          Message
        </label>
        <textarea class="form-textarea px-4 py-2 rounded-md border border-gray-300 w-full" id="message" rows="4"
          placeholder="Enter your message"></textarea>
      </div>

      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
        Submit
      </button>
    </form>
  </main>
</template>

<script setup>

</script>
