import React from 'react'
import s from './App.module.css'
import { useStore } from './store'
import { RepoLists, SearchBox } from './components'
import { useUsers } from './hooks/useUsers'

function App() {
  const searching = useStore((state) => state.searching)
  const { users, isLoading, error } = useUsers()

  return (
    <main className={s.app}>
      <div className={s.wrapper}>
        <h1>GitHub repositories explorer</h1>
        <div className={s.card}>
          <SearchBox />
          {/* Lists */}
          <div className='w-full text-center mt-4'>
            {users && searching && (
              <>
                <p className='mb-4'>
                  Showing users for{' '}
                  <b>
                    &quot;{searching}
                    &quot;
                  </b>
                </p>
                {users.total_count === 0 && <p>No result found</p>}
              </>
            )}
            {isLoading && <p className='text-center mb-4'>Loading...</p>}
            {error && (
              <p>Error: Failed to fetch data. Please try again later!</p>
            )}
            {users &&
              users.items.map((user, idx) => <RepoLists {...user} key={idx} />)}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
