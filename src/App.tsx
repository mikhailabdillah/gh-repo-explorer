import { Button, Input } from './components'
import s from './App.module.css'
import axios, { RawAxiosRequestConfig } from 'axios'
import { useState } from 'react'
import { GithubApiUserResponse } from './types/api'
import RepoLists from './components/RepoLists'
import useSWR from 'swr'

const pageSize = 5

const fetcher = (url: string, config: RawAxiosRequestConfig) =>
  axios.get<GithubApiUserResponse>(url, config).then((res) => res.data)

function App() {
  const [searching, setSearching] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [page] = useState(1)
  const config: RawAxiosRequestConfig = {
    params: {
      q: searching,
      page,
      per_page: pageSize,
    },
  }

  const {
    data,
    error,
    isLoading,
  }: {
    data: GithubApiUserResponse | undefined
    error: { status: 403 | 404 } | undefined
    isLoading: boolean
  } = useSWR(
    searching ? ['https://api.github.com/search/users', config] : null,
    ([url, config]) => fetcher(url, config)
  )

  const handleSearch = () => {
    if (value) {
      setSearching(value)
    }
    return
  }

  return (
    <main className={s.app}>
      <div className={s.wrapper}>
        <h1>GitHub repositories explorer</h1>
        <div className={s.card}>
          <div className='flex flex-row w-full'>
            <div
              role={'searchbox'}
              className='flex flex-col md:flex-row w-full'
            >
              <Input
                placeholder='Search'
                className='mr-2 mb-2 md:mb-0 w-full md:w-2/3'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
              />
              <Button className='w-full md:w-2/6' onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
          {/* Lists */}
          <div className='w-full text-center mt-4'>
            {data && searching && (
              <>
                <p className='mb-4'>
                  Showing users for{' '}
                  <b>
                    &quot;{searching}
                    &quot;
                  </b>
                </p>
                {data.total_count === 0 && <p>No result found</p>}
              </>
            )}
            {isLoading && <p className='text-center mb-4'>Loading...</p>}
            {error ? (
              <span>Error: {error.status}</span>
            ) : (
              <>
                {data?.items.map((item, idx) => (
                  <div role={'group'} key={idx} className='mb-4'>
                    <RepoLists {...item} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
