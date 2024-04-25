import { getAxiosInstance } from '@/axios'
import type { PaginatedResponse, Link, RawLink } from '@/types'
import { ref, watch, type Ref } from 'vue'

interface UseLinksOptions {
  queries?: Ref<Record<string, string | number>>
}

export const useLinks = ({ queries = ref({}) }: UseLinksOptions = {}) => {
  const slug = 'links'
  const paginatedData = ref<PaginatedResponse<Link>>()
  const item = ref<Link>() 

  function adapter(link: RawLink): Link {
    return {
      ...link,
      created_at: new Date(link.created_at),
      updated_at: new Date(link.updated_at)
    }
  }

  /** get all links */
  async function index(qs?: Record<string, string | number>) {
    qs = { ...queries.value, ...qs }
    // @ts-expect-error page is a number and it is ok
    const q = new URLSearchParams(qs).toString()
  const axiosClient = await getAxiosInstance();
    const { data } = await axiosClient.get<PaginatedResponse<RawLink>>(`/${slug}?${q}`)
    return (paginatedData.value = {
      ...data,
      data: data.data.map((i) => adapter(i))
    })
  }

  watch(queries, index, { deep: true })

  /** find one link by id */
  async function find(id: string | number) {
    const axiosClient = await getAxiosInstance();
    const { data } = await axiosClient.get<RawLink>(`/${slug}/${id}`)
    return (item.value = adapter(data))
  }

  /** create a new link */
  async function create(payload: Partial<Link>) {
    const axiosClient = await getAxiosInstance();
    const { data } = await axiosClient.post<RawLink>(`/${slug}`, payload)
    return (item.value = adapter(data))
  }

  /** update an existing link */
  async function update(id: string | number, payload: Partial<Link>) {
    const axiosClient = await getAxiosInstance();
    const { data } = await axiosClient.put<RawLink>(`/${slug}/${id}`, payload)
    return (item.value = adapter(data))
  }

  /** delete an existing item */
  async function destroy(id: string | number) {
    const axiosClient = await getAxiosInstance();
    await axiosClient.delete(`/${slug}/${id}`)
  }

  return {
    find,
    create,
    update,
    destroy,
    index,
    data: paginatedData,
    link: item
  }
}
