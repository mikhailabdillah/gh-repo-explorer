import { Button, Input, Collapse } from './components'
import s from './App.module.css'
import axios from 'axios'
import { useState } from 'react'
import { GithubApiRequest, GithubApiResponse } from './types/api'

function App() {
  const [value, setValue] = useState('')
  const [data, setData] = useState<GithubApiResponse>()

  async function fetchData() {
    const params: GithubApiRequest = {
      q: value,
      page: 1,
      per_page: 5,
    }
    await axios
      .get<GithubApiResponse>('https://api.github.com/search/users', {
        params: params,
      })
      .then((res) => setData(res.data))
  }

  return (
    <main className={s.app}>
      <div className={s.wrapper}>
        <h1>GitHub repositories explorer</h1>
        <div className={s.card}>
          <div className='flex flex-row w-full'>
            <div role={'searchbox'} className='flex flex-row w-full'>
              <Input
                placeholder='Search'
                className='mr-2 w-2/3'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button className='w-2/6' onClick={() => fetchData()}>
                Search
              </Button>
            </div>
          </div>
          {/* Lists */}
          <div className='w-full mt-4'>
            {data?.items.map((item) => (
              <div role={'group'} className='mb-4'>
                <Collapse title={item.login}>
                  {item.repos_url}
                  {/* <ul>
                    <li></li>
                  </ul> */}
                </Collapse>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
