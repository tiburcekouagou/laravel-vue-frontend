<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { TailwindPagination } from 'laravel-vue-pagination'
import { useRoute, useRouter } from 'vue-router'
import TableTh from '@/components/TableTh.vue'
import { useLinks } from '@/composables/useLinks'
import type { Link, PaginatedResponse } from '@/types'

type Query = { page: number; 'filter[full_link]': string; sort: '' }

const router = useRouter()
const route = useRoute()
const queries = ref<Query>({
  page: 1,
  sort: '',
  'filter[full_link]': '',
  ...route.query
})

const { data, index: getLinks, destroy } = useLinks({queries})
onMounted(async () => {
  await getLinks()
})

watch(queries, async() => {
  // await getLinks()
  router.push({ query: queries.value }), { deep: true }
})

let links = computed(() => (data.value as PaginatedResponse<Link>)?.data)

async function handleDelete(id: number) {
  await destroy(id)
  if ((data.value as PaginatedResponse<Link>)) {
    (data.value as PaginatedResponse<Link>).data = (data.value as PaginatedResponse<Link>).data.filter((link) => link.id !== id)
  }
}
</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center">
        <SearchInput v-model="queries['filter[full_link]']" />
        <router-link to="/links/create" class="ml-4">
          <span class="pi pi-plus"></span> Create New
        </router-link>
      </div>
    </nav>
    <div v-if="true">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <TableTh v-model="queries.sort" name="full_link" class="w-[29%]">Full Link</TableTh>
            <TableTh v-model="queries.sort" name="short_link" class="w-[29%]">Short Link</TableTh>
            <TableTh v-model="queries.sort" name="views" class="w-[16%]">Views</TableTh>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[6%] text-center">
              <button @click="getLinks()">
                <span class="pi pi-sync w-[15px] relative top-[2px]"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(link, i) in links" :key="i">
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
              <button><span class="pi pi-trash" @click="handleDelete(link.id)"></span></button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <TailwindPagination :data="data" @pagination-change-page="queries.page = $event" />
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
