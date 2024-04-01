<template>
  <nav class="bg-gray-800 p-4 shadow shadow-gray-900 text-white flex justify-between items-center">
    <div>
      <router-link to="/" class="text-3xl font-bold">
        <span class="pi pi-link"></span>
        URLShortify
      </router-link>
    </div>
    <div>
      <router-link to="/me">My Profile</router-link>
      <router-link to="/links">Links</router-link>
      <router-link to="/logout">
        <span class="pi pi-sign-out"></span>
      </router-link>
    </div>
  </nav>
</template>
<style scoped>
a {
  @apply text-white mr-3 no-underline;
}
</style>
