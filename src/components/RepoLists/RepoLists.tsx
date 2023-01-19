import React, { useEffect, useState } from 'react'
import { GithubApiRepositoryResponse, GithubUser } from '~/types/api'
import axios, { RawAxiosRequestConfig } from 'axios'
import { Star } from '~/icons'
import useSWR from 'swr'
import { Button, Collapse } from '..'
import { useStore } from '~/store'

type RepoListsProps = GithubUser

const fetcher = (url: string, config: RawAxiosRequestConfig) =>
  axios.get<GithubApiRepositoryResponse>(url, config).then((res) => res.data)

const RepoLists: React.FC<RepoListsProps> = (props) => {
  const repository = useStore((state) => state.userRepo)
  const setRepository = useStore((state) => state.setRepository)

  const [hasNextPage, setNextPage] = useState(false)
  const [page, setPage] = useState(1)

  const config: RawAxiosRequestConfig = {
    params: {
      page,
      per_page: 10,
    },
  }

  const { data, isLoading } = useSWR(
    props.login
      ? [`https://api.github.com/users/${props.login}/repos`, config]
      : null,
    ([url, config]) => fetcher(url, config)
  )

  useEffect(() => {
    if (data) {
      setNextPage(data.length === 10)

      const d = repository.find((repo) => repo.user === props.id)
      d?.repositores?.concat(data)
      d
        ? setRepository(d)
        : setRepository({ user: props.id, repositores: data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const repo = repository.find((d) => d.user === props.id)

  return (
    <div role={'group'} className='mb-4'>
      <Collapse title={props.login}>
        {isLoading && <p>Loading...</p>}

        {repo?.repositores?.map((repo) => (
          <div
            key={repo.name}
            className='relative bg-gray-200 text-left p-4 mb-2'
          >
            <a href={repo.html_url} className='text-xl font-medium'>
              {repo.name}
            </a>
            <div className='text-sm mt-2'>{repo.description}</div>
            <div className='absolute top-2 right-2 text-sm'>
              <span>{repo.stargazers_count}</span>
              <Star className='w-4 h-4 ml-1' />
            </div>
          </div>
        ))}
        <div className='text-center'>
          {hasNextPage && (
            <Button onClick={() => setPage(page + 1)} disabled={isLoading}>
              Loadmore
            </Button>
          )}
          {!hasNextPage && <span>No more data...</span>}
        </div>
      </Collapse>
    </div>
  )
}

export default RepoLists
