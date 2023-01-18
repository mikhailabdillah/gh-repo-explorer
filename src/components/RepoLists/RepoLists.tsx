import React, { useEffect, useState } from 'react'
import {
  GithubApiRepositoryResponse,
  GithubRepository,
  GithubUser,
} from '~/types/api'
import axios, { RawAxiosRequestConfig } from 'axios'
import { Star } from '~/icons'
import Collapse from '../Collapse'
import useSWR from 'swr'
import Button from '../Button'

type RepoListsProps = GithubUser

const fetcher = (url: string, config: RawAxiosRequestConfig) =>
  axios.get<GithubApiRepositoryResponse>(url, config).then((res) => res.data)

const RepoLists: React.FC<RepoListsProps> = (props) => {
  const [repo, setRepo] = useState<GithubRepository[]>([])
  const [hasNextPage, setNextPage] = useState(false)
  const [page, setPage] = useState(1)

  const config: RawAxiosRequestConfig = {
    params: {
      page,
      per_page: 10,
    },
  }

  const {
    data,
    error,
    isLoading,
  }: {
    data: GithubApiRepositoryResponse | undefined
    error: { status: 403 | 404 } | undefined
    isLoading: boolean
  } = useSWR(
    props.login
      ? [`https://api.github.com/users/${props.login}/repos`, config]
      : null,
    ([url, config]) => fetcher(url, config)
  )

  useEffect(() => {
    if (data) {
      setNextPage(data.length === 10)
      repo.length ? setRepo(repo.concat(data)) : setRepo(data)
    }
  }, [data])

  return (
    <Collapse title={props.login}>
      {isLoading && <p>Loading...</p>}
      {error ? (
        <span>
          Error &quot;{error.status}&quot;: An error occurred while fetching the
          data.
        </span>
      ) : (
        <>
          {repo?.map((repo) => (
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
        </>
      )}
      <div className='text-center'>
        {hasNextPage && (
          <Button onClick={() => setPage(page + 1)} disabled={isLoading}>
            Loadmore
          </Button>
        )}
        {repo.length && !hasNextPage && <span>No more data...</span>}
      </div>
    </Collapse>
  )
}

export default RepoLists
