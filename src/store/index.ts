import { create } from 'zustand'
interface StoreState {
  pageSize: number
  searching: string | null
}

interface StoreAction {
  setSearching: (val: string) => void
  reset: () => void
}

const initialState: StoreState = {
  pageSize: 5,
  searching: null,
}

const useStore = create<StoreState & StoreAction>((set) => ({
  ...initialState,
  setSearching: (value) => set({ searching: value }),
  reset: () => set(initialState),
}))

export { useStore }
