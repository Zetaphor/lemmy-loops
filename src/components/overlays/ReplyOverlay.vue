<template>
  <div class="fixed top-0 left-0 z-20 w-full h-full bg-gray-800">
    <div class="w-full h-4/6 overflow-scroll">
      <p class="text-lg text-white p-2">{{ replyOverlay.data.name }}</p>

      <div class="pl-1">
        <div class="text-sm inline-flex items-center">
          <img v-if="replyOverlay.data.community_icon.length && preferences.showPostCommunityIcon"
            :src="replyOverlay.data.community_icon" class="h-4 w-4 rounded-sm mt-0.5 mr-1">
          <p class="text-sm flex-grow-0 text-gray-300">{{ replyOverlay.data.community_name }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-gray-400">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <p class="text-sm flex-grow-0 text-gray-400">{{ replyOverlay.data.community_actor_domain }}</p>
        </div>
      </div>


      <p v-if="replyOverlay.isPost"
        class="mt-1 text-md text-gray-200 bg-gray-600 rounded-md my-1 px-2 w-15 pl-2 pr-2 pt-2 pb-2">
        <Markdown v-if="!showPreview && replyOverlay.data.content.length" :source="replyOverlay.data.content" />
        <Markdown v-if="showPreview || !replyOverlay.data.content.length" :source="reply" />
      </p>
      <template v-else>
        <div class="divider m-0"></div>
        <!-- Post creator -->
        <div class="pl-1">
          <div class="inline-flex items-center">
            <p class="mr-1">Replying to</p>
            <!-- Custom avatars enabled and avatar image present -->
            <div class="avatar mr-0.5"
              v-if="replyOverlay.data.comment_creator_avatar.length && preferences.showPostAvatars && preferences.showPostCustomAvatars">
              <div class="w-4 rounded-full mr-0.5">
                <img :src="replyOverlay.data.comment_creator_avatar"
                  :alt="`${replyOverlay.data.comment_creator_name}@${replyOverlay.data.comment_creator_actor_domain}`"
                  :title="`${replyOverlay.data.comment_creator_name}@${replyOverlay.data.comment_creator_actor_domain}`" />
              </div>
            </div>
            <!-- Avatars enabled and no image, or avatars enabled and custom avatars disabled -->
            <div v-else-if="preferences.showPostAvatars" class="mr-0.5">
              <Avatar :size="16" variant="beam"
                :name="`${replyOverlay.data.comment_creator_name}@${replyOverlay.data.comment_creator_actor_domain}`" />
            </div>
            <!-- Custom avatars disabled -->
            <div v-else class="mr-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="15 -15 95 120"
                class="h-4 w-4 fill-gray-500 stroke-gray-500">
                <path
                  d="M93.84,70.592l0.039-0.007l-0.17-0.838c-0.063-0.312-0.73-3.149-0.73-3.149l-0.224-0.806l-0.044,0.01  c-3.385-11.005-10.324-14.448-19.842-19.17l-1.896-0.97c2.813-4.172,4.293-9.015,4.293-14.064c0-13.924-11.326-25.251-25.25-25.251  c-13.924,0-25.252,11.327-25.252,25.251c0,5.054,1.482,9.898,4.299,14.072l-1.894,0.957C17.27,51.54,10.061,55.115,6.862,67.409  l-0.065-0.013l-0.477,2.35c-1.043,5.143-1.305,13.467-1.315,13.816c-0.081,2.682,0.896,5.211,2.753,7.125  c1.856,1.912,4.355,2.965,7.036,2.965h70.44c2.684,0,5.181-1.053,7.033-2.969c1.851-1.914,2.818-4.445,2.728-7.127  C94.984,83.236,94.73,75.995,93.84,70.592z M50.015,11.156c11.271,0,20.44,9.17,20.44,20.441s-9.17,20.441-20.44,20.441  c-11.271,0-20.441-9.17-20.441-20.441S38.743,11.156,50.015,11.156z M88.809,87.342c-0.937,0.969-2.205,1.503-3.572,1.503H14.794  c-1.371,0-2.644-0.534-3.585-1.505c-0.942-0.973-1.438-2.262-1.396-3.636c0.012-0.34,0.284-8.381,1.222-13  c2.415-11.897,7.714-14.527,18.281-19.771l2.876-1.472c4.773,4.771,11.078,7.388,17.823,7.388c6.741,0,13.043-2.619,17.815-7.385  l2.891,1.473c9.973,4.947,15.465,7.674,18.008,18.557l0.051,0.223c1.093,4.977,1.404,13.913,1.408,14.006  C90.234,85.088,89.745,86.374,88.809,87.342z" />
              </svg>
            </div>
            <p class="text-sm flex-grow-0 ml-0.5">
              <span class="text-gray-300 text-md">{{ replyOverlay.data.comment_creator_name }}</span>
              <span class="text-gray-400 text-md">@{{ replyOverlay.data.comment_creator_actor_domain }}</span>
            </p>
          </div>
        </div>
        <p class="mt-1 text-md text-gray-200 bg-gray-600 rounded-md my-1 px-2 w-15 pl-2 pr-2 pt-2 pb-2">
          <Markdown v-if="!showPreview && replyOverlay.data.content.length" :source="replyOverlay.data.content" />
          <Markdown v-if="showPreview || !replyOverlay.data.content.length" :source="reply" />
        </p>
      </template>
    </div>
    <div class="divider m-0"></div>
    <div class="w-full h-2/6">
      <textarea v-model="reply" class="textarea textarea-bordered w-full h-32" placeholder="Type your reply"></textarea>
      <button :disabled="!reply.length" v-if="enablePreviewToggle" @click="showPreview = !showPreview"
        class="btn bg-gray-500 hover:bg-gray-700">
        {{ showPreview ? 'Edit' : 'Preview' }}</button>
      <button :disabled="!reply.length" @click="submitReply" class="btn bg-gray-500 hover:bg-gray-700">Submit</button>
      <button @click="cancelReply" class="btn bg-gray-500 hover:bg-gray-700">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useReplyOverlayStore } from '@/stores/reply-overlay'
import { usePreferencesStore } from '@/stores/preferences'
import { useCommentsStore } from '@/stores/api/comments'
import Markdown from '@/components/Markdown.vue'
import Avatar from "vue-boring-avatars"

onMounted(() => {
  if (replyOverlay.data.content.length) {
    showPreview.value = false
    enablePreviewToggle.value = true
  } else {
    showPreview.value = true
    enablePreviewToggle.value = false
  }
})

const comments = useCommentsStore()
const replyOverlay = useReplyOverlayStore()
const preferences = usePreferencesStore()

const reply = ref('')
const showPreview = ref(false)
const enablePreviewToggle = ref(false)

function cancelReply() {
  replyOverlay.visible = false
}

async function submitReply() {
  try {
    if (replyOverlay.isPost) await comments.replyPost(replyOverlay.data.post_id, reply.value)
    else await comments.replyComment(replyOverlay.data.post_id, replyOverlay.data.parent_id, reply.value)
    replyOverlay.visible = false
  } catch (error) {
    console.error(error)
  }
}
</script>