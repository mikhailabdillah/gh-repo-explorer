import React, { useEffect, useState, useRef } from 'react'
import { Button, Input } from '..'
import { useStore } from '~/store'

const SearchBox: React.FC = () => {
  const setSearching = useStore((state) => state.setSearching)
  const reset = useStore((state) => state.reset)

  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>('')

  // Auto focus to the search box input
  useEffect(() => {
    function focusInput({ repeat, metaKey, ctrlKey, key }: KeyboardEvent) {
      if (repeat) return
      if ((metaKey || ctrlKey) && key === '/') ref.current?.focus()
    }
    window.addEventListener('keydown', focusInput)

    return () => {
      window.removeEventListener('keydown', focusInput)
    }
  }, [])

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
        <div className='relative mr-2 mb-2 md:mb-0 w-full md:w-2/3'>
          <Input
            ref={ref}
            placeholder='Search...'
            className='w-full'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <span className='text-xs py-1 px-1.5 absolute top-2.5 right-2.5 border border-blue-300 bg-blue-100 text-blue-500 rounded-sm'>
            {'Ctrl+/'}
          </span>
        </div>
        <Button className='w-full md:w-2/6' onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchBox
