import React from 'react'
import { GithubRepository, GithubUser } from '~/types/api'
import { Star } from '~/icons'
import { Button, Collapse } from '..'
import { useRepositories } from '~/hooks/useRepositories'

type RepoListsProps = GithubUser

const RepoLists: React.FC<RepoListsProps> = (props) => {
  const { data, error, size, setSize, pageSize } = useRepositories(props.login)

  // @ts-ignore
  const repositories: GithubRepository[] = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize)

  return (
    <div role={'group'} className='mb-4'>
      <Collapse title={props.login}>
        {isEmpty && <p>No repository found!</p>}
        {repositories.map((repo) => (
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
          {!isReachingEnd && (
            <Button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => setSize(size + 1)}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'loading...' : 'Load more'}
            </Button>
          )}
          {isReachingEnd && <p>No more data</p>}
        </div>
      </Collapse>
    </div>
  )
}

export default RepoLists
