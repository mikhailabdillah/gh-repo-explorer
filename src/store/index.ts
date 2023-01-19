import { create } from 'zustand'
import { GithubRepository, GithubApiUserResponse } from '~/types/api'

interface UserRepo {
  user: number
  repositores?: GithubRepository[]
}

interface StoreState {
  pageSize: number
  searching: string | null
  isLoading: boolean
  users?: GithubApiUserResponse
  userRepo: UserRepo[]
}

interface StoreAction {
  setSearching: (val: string) => void
  setLoading: (bool: boolean) => void
  setUsers: (data: GithubApiUserResponse | undefined) => void
  setRepository: (data: UserRepo) => void
  reset: () => void
}

const initialState: StoreState = {
  pageSize: 5,
  searching: null,
  isLoading: false,
  users: undefined,
  userRepo: [],
}

const useStore = create<StoreState & StoreAction>((set, get) => ({
  ...initialState,
  setSearching: (value) => set({ searching: value }),
  setLoading: (bool) => set({ isLoading: bool }),
  setUsers: (data) => set({ users: data }),
  setRepository: (data) =>
    set({
      userRepo: get().userRepo.concat(data),
    }),
  reset: () => set(initialState),
}))

export { useStore }
