import type { FormKitNode } from '@formkit/core'
import { AxiosError } from 'axios'
export function handleInvalidForm(err: any, node?: FormKitNode): void {
  if (err instanceof AxiosError && err.response?.status === 422) {
    node?.setErrors([], err.response.data.errors)
  }
}
