import useSWR from 'swr'
import axios from 'axios'
import { GithubApiUserResponse } from '~/types/api'
import { useStore } from '~/store'

const fetcher = (url: string) =>
  axios.get<GithubApiUserResponse>(url).then((res) => res.data)

export const useUsers = () => {
  const searching = useStore((state) => state.searching)
  const pageSize = useStore((state) => state.pageSize)

  const { data: users, error } = useSWR<
    GithubApiUserResponse,
    { error: unknown }
  >(
    searching
      ? `https://api.github.com/search/users?q=${searching}&per_page=${pageSize}`
      : null,
    (url: string) => fetcher(url)
  )

  return {
    users,
    isLoading: searching && !error && !users,
    error,
  }
}
