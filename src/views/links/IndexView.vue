<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'

const links = [
  {
    short_link: '234jlsfsf',
    full_link: 'https://vueschool.io',
    views: 3,
    id: 1
  },
  {
    short_link: 'adfaowerw',
    full_link: 'https://google.com',
    views: 1,
    id: 2
  },
  {
    short_link: '234sfdjaip',
    full_link: 'https://vuejsnation.com/',
    views: 0,
    id: 3
  }
]
</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center">
        <SearchInput modelValue="" />
        <router-link to="/links/create" class="ml-4">
          <span class="pi pi-plus"></span> Create New
        </router-link>
      </div>
    </nav>

    <div v-if="true">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <th class="w-[35%]">Full Link</th>
            <th class="w-[35%]">Short Link</th>
            <th class="w-[10%]">Views</th>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[6%] text-center">
              <button><span class="pi pi-sync"></span></button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in links">
            <td>
              <a :href="link.full_link" target="_blank">
                {{ link.full_link.replace(/^http(s?):\/\//, '') }}</a
              >
            </td>
            <td>
              <a :href="`/${link.short_link}`" target="_blank"> /{{ link.short_link }} </a>
            </td>
            <td>{{ link.views }}</td>
            <td>
              <router-link class="no-underline" :to="`/links/${link.id}`"
                ><span class="pi pi-pencil"></span
              ></router-link>
            </td>
            <td>
              <button><span class="pi pi-trash"></span></button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div class="mt-5 flex justify-center"></div>
    </div>

    <!-- No links message for when table is empty -->
    <div v-else class="border-dashed border-gray-500 p-3 border-[1px] text-center">
      <div class="flex justify-center">
        <span class="pi pi-link"></span>
      </div>
      <p>
        <!-- Show this if reason for no links is none found in search -->
        <span v-if="false"> No links matching links found. </span>

        <!-- Show this if reason for no links is User has none -->
        <span v-else>
          No links created yet
          <router-link to="/links/create" class="text-green-600"
            >Go create your first link!</router-link
          >
        </span>
      </p>
    </div>
  </div>
</template>
