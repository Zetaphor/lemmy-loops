<template>
  <div @click="content.hideContent" v-if="content.visible"
    class="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <video v-if="content.video" controls preload class="w-full h-auto max-w-full max-h-full">
      <source v-if="content.extension == 'mp4'" :src="content.url" type="video/mp4">
      <source v-else-if="content.extension == 'webm'" :src="content.url" type="video/webm">
      <source v-else-if="content.extension == 'ogg'" :src="content.url" type="video/ogg">
      <source v-else-if="content.extension == 'avi'" :src="content.url" type="video/x-msvideo">
      <source v-else-if="content.extension == 'mov'" :src="content.url" type="video/quicktime">
      <source v-else-if="content.extension == 'wmv'" :src="content.url" type="video/x-ms-wmv">
      <source v-else-if="content.extension == 'flv'" :src="content.url" type="video/x-flv">
      Your browser either does not support the video player or playback of the {{ content.extension }} file format.
    </video>

    <audio v-else-if="content.audio" controls preload>
      <source v-if="content.extension == 'mp3'" :src="content.url" type="audio/mpeg">
      <source v-else-if="content.extension == 'wav'" :src="content.url" type="audio/wav">
      <source v-else-if="content.extension == 'ogg'" :src="content.url" type="audio/ogg">
      <source v-else-if="content.extension == 'aac'" :src="content.url" type="audio/aac">
      <source v-else-if="content.extension == 'flac'" :src="content.url" type="audio/flac">
      Your browser either does not support the audio player or playback of the {{ content.video.extension }} file format.
    </audio>

    <img v-else :src="content.url" class="w-full h-auto max-w-full max-h-full" />

    <div class="absolute bottom-10 flex flex-col items-center cursor-pointer bg-gray-500 rounded-md pt-1 pb-1 pl-3 pr-3"
      @click="downloadFile">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30"
        class="h-8 w-8 fill-current stroke-current text-white-500">
        <path
          d="M5.5 12.5a.8.8 0 0 1 1-1l4.7 4.7V2a.8.8 0 0 1 1.6 0v14.2l4.7-4.7a.8.8 0 0 1 1 1l-6 6a.8.8 0 0 1-1 0ZM21 15.3a.8.8 0 0 0-.8.7v4a1.3 1.3 0 0 1-1.2 1.3H5A1.3 1.3 0 0 1 3.7 20v-4a.8.8 0 0 0-1.5 0v4A2.8 2.8 0 0 0 5 22.8h14a2.8 2.8 0 0 0 2.8-2.8v-4a.8.8 0 0 0-.8-.8Z" />
      </svg>
      <p class="text-white text-center">Download
        <span v-if="content.video">&nbsp;Video</span>
        <span v-else-if="content.audio">&nbsp;Audio</span>
        <span v-else>&nbsp;Image</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useContentViewerStore } from '@/stores/content-viewer'

const content = useContentViewerStore()

content.$subscribe(() => {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (content.visible) viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
  else viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
})

async function downloadFile() {
  const response = await fetch(content.url);
  const blob = await response.blob();

  const filename = content.url.match(/[^/\\&?#=]+\.[^/\\&?#=]+(?:[?&].*|$)/)[0];

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(link.href);
}
</script>