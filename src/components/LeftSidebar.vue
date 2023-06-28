<template>
  <div class="drawer-side">
    <label for="left-sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 w-56">
      <li>
        <details>
          <summary>Username</summary>
          <ul>
            <li><a>Other username</a></li>
            <li><a onclick="modalAddAccount.showModal()">Add Account</a></li>
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
