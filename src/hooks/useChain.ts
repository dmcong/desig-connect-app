import { create } from 'zustand'

/**
 * Store
 */

export type ChainStore = {
  chainId: string
  setChainId: (address: string) => void
}

export const useChainStore = create<ChainStore>()((set) => ({
  chainId: '',
  setChainId: (chainId: string) => set({ chainId: chainId }),
}))

/**
 * Hook
 */
export const useChain = () => {
  return useChainStore(({ chainId, setChainId }) => ({
    chainId,
    setChainId,
  }))
}
