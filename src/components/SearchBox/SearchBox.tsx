import React, { useEffect, useState } from 'react'
import { Button, Input } from '..'
import axios, { RawAxiosRequestConfig } from 'axios'
import { GithubApiUserResponse } from '~/types/api'
import { useStore } from '~/store'
import useSWR from 'swr'

const SearchBox: React.FC = () => {
  const pageSize = useStore((state) => state.pageSize)
  const searching = useStore((state) => state.searching)
  const setSearching = useStore((state) => state.setSearching)
  const setUsers = useStore((state) => state.setUsers)
  const setLoading = useStore((state) => state.setLoading)
  const reset = useStore((state) => state.reset)

  const [value, setValue] = useState<string>('')
  const config: RawAxiosRequestConfig = {
    params: {
      q: searching,
      per_page: pageSize,
    },
  }

  const fetcher = (url: string, config: RawAxiosRequestConfig) =>
    axios.get<GithubApiUserResponse>(url, config).then((res) => res.data)

  const { data, isLoading } = useSWR(
    searching ? ['https://api.github.com/search/users', config] : null,
    ([url, config]) => fetcher(url, config)
  )

  useEffect(() => {
    if (!data) {
      setLoading(true)
    }
    setUsers(data)
    !isLoading && setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading])

  const handleSearch = () => {
    if (value) {
      setSearching(value)
    } else {
      reset()
    }
  }

  return (
    <div className='flex flex-row w-full'>
      <div role={'searchbox'} className='flex flex-col md:flex-row w-full'>
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
  )
}

export default SearchBox
