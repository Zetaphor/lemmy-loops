<script setup>
const hasImage = true;
const hasBody = true;
const hasLink = false;
</script>

<style>
.image-link {
  max-height: 7rem;
}

.image-no-link {
  max-height: 6rem;
}

.image-container-link {
  width: 7rem;
}

.image-container-no-link {
  width: 6rem;
}
</style>

<template>
  <!-- TODO: Need to write media queries -->
  <div class="card-bordered card-compact rounded-md my-2 mx-2 bg-gray-800 shadow-sm cursor-pointer flex">
    <div :class="['flex-grow', hasImage ? 'w-80' : 'w-80']">
      <div class="p-2">
        <p class="text-xl text-white">Post Title</p>

        <div v-if="hasLink" class="text-xs inline-flex items-center text-gray-500">
          <svg version="1.1" viewBox="300 200 750 750" xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current text-gray-500">
            <path
              d="m762.18 781.91h-33.719c-2.2578 0-4.7539 0-7.0078-0.44531-14.484-0.25391-28.738-2.7344-42.098-6.8047-34.824-10.633-65.16-32.125-86.426-60.625-5.6641-7.2461-10.402-14.711-14.473-22.621-3.8398-7.2461-7.2461-14.734-9.7305-22.633-6.5508-17.664-9.9609-36.66-9.9609-56.566s3.4062-38.93 9.9609-56.555h61.754c4.2969 0 8.3633 0.43359 12.445 1.3555-10.176 15.828-16.285 34.824-16.285 55.199s6.1211 39.371 16.285 55.188c4.5234 6.8047 9.7422 13.141 15.828 18.781 6.1328 5.8789 12.898 10.871 20.594 15.168 14.473 7.9336 31.223 12.684 49.105 12.684h158.37c56.125 0 101.81-45.695 101.81-101.81 0-56.113-45.695-101.8-101.81-101.8h-66.973c-14.461-26.699-34.152-49.777-57.684-67.883h124.66c93.66 0 169.69 75.996 169.69 169.68 0 93.695-76.031 169.69-169.69 169.69l-124.64 0.007813z" />
            <path
              d="m700.18 538.25c-6.3359-5.8906-13.117-11.09-20.809-15.145-14.461-8.1836-31.223-12.684-48.863-12.684h-158.39c-56.09 0-101.8 45.684-101.8 101.8 0 56.113 45.719 101.81 101.8 101.81h67.199c14.27 26.473 33.938 49.535 57.469 67.871h-124.67c-93.66 0-169.67-75.996-169.67-169.69 0-93.684 76.008-169.68 169.67-169.68h158.39c2.4961 0 4.7539 0 7.0312 0.44531 14.461 0.22656 28.488 2.7344 41.832 6.8047 35.074 10.633 65.375 32.113 86.438 60.625 5.8672 7.2344 10.633 14.711 14.699 22.621 3.8281 7.2461 7.2461 14.711 9.7422 22.633 6.5625 17.629 9.9375 36.648 9.9375 56.555s-3.3711 38.902-9.9375 56.566h-61.766c-4.2734 0-8.6055-0.44531-12.445-1.3789 10.402-15.805 16.285-34.801 16.285-55.188 0-20.363-5.8789-39.359-16.285-55.199-4.543-6.7852-9.7383-13.109-15.859-18.762z" />
          </svg>
          <p class="ml-1 mb-0 flex-grow-0 text-gray-400">
            linkdomain.com
          </p>
        </div>

        <p v-if="hasBody"
          class="text-md text-gray-200 bg-gray-600 rounded-md my-1 px-3 w-15 max-h-10 overflow-hidden overflow-ellipsis truncate">
          Lorem ipsum dolor
          sit amet,
          consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div>
          <div class="text-sm text-gray-400 inline-flex items-center">
            <p class="text-sm flex-grow-0">community</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="5"
              stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-400">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <p class="text-sm flex-grow-0">server.com</p>
          </div>
        </div>

        <div>
          <div class="text-xs inline-flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 -5 100 100"
              class="fill-current text-gray-500 w-4 h-4 pr-1">
              <path
                d="M50,88.8C50,88.8,50,88.8,50,88.8c-4,0-7.5-2-9.5-5.4l-5-8.5h-6.1c-14.8,0-26.8-12-26.8-26.8v-10    c0-14.8,12-26.8,26.8-26.8h41.3c14.8,0,26.8,12,26.8,26.8v10c0,14.8-12,26.8-26.8,26.8h-6.1l-5,8.5C57.5,86.7,54,88.8,50,88.8z     M29.3,20.9c-9.5,0-17.2,7.7-17.2,17.2v10c0,9.5,7.7,17.2,17.2,17.2h8.9c1.7,0,3.3,0.9,4.1,2.4l6.4,10.8c0.4,0.6,0.9,0.7,1.2,0.7    s0.9-0.1,1.2-0.7l6.4-10.8c0.9-1.5,2.4-2.4,4.1-2.4h8.9c9.5,0,17.2-7.7,17.2-17.2v-10c0-9.5-7.7-17.2-17.2-17.2H29.3z" />
            </svg>


            <p class="flex-grow-0">200</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" class="h-4 w-4">
              <circle cx="5" cy="5" r="2" class="fill-current text-gray-600" />
            </svg>
            <p class="flex-grow-0">3h</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" class="h-4 w-4">
              <circle cx="5" cy="5" r="2" class="fill-current text-gray-600" />
            </svg>
            <p class="flex-grow-0">
              <span class="text-gray-300">username</span>
              <span class="text-gray-400">@beehaw.org</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasImage" :class="[hasLink ? 'image-container-link' : 'image-container-no-link']">
      <div class="w-full flex justify-end">
        <div class="text-center">
          <img :class="[hasLink ? 'image-link' : 'image-no-link']" src="https://placekitten.com/300/300">
          <p class="text-2xl my-0 text-gray-600">9999</p>
        </div>
      </div>
    </div>
    <div v-else class="w-20">
      <div class="w-full h-full flex items-center justify-end">
        <p class="m-0 pr-3 text-3xl text-gray-600">999</p>
      </div>
    </div>
  </div>
</template>