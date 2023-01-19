import axios from 'axios'
import useSWRInfinite from 'swr/infinite'
import { useStore } from '~/store'
import { GithubApiRepositoryResponse } from '~/types/api'

const fetcher = (url: string) =>
  axios.get<GithubApiRepositoryResponse>(url).then((res) => res.data)

export const useRepositories = (user: string) => {
  const pageSize = useStore((state) => state.pageSize * 2)

  const getKey = (pageIndex: number) => {
    return `https://api.github.com/users/${user}/repos?page=${
      pageIndex + 1
    }&per_page=${pageSize}`
  }

  const { data, error, size, setSize } = useSWRInfinite<
    GithubApiRepositoryResponse,
    { error: unknown }
  >(getKey, fetcher)

  return {
    data,
    error,
    size,
    setSize,
    pageSize,
  }
}
