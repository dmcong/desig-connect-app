import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

/**
 * Store
 */

export type ChainIdStore = {
  chainId: string
  setChainId: (address: string) => void
}

export const useChainIdStore = create<ChainIdStore>()(
  devtools(
    persist(
      (set) => ({
        chainId: '',
        setChainId: (chainId: string) =>
          set({ chainId: chainId }, false, 'setChainId'),
      }),
      {
        name: 'chainId',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)

/**
 * Hook
 */
export const useChainId = () => {
  return useChainIdStore(({ chainId, setChainId }) => ({
    chainId,
    setChainId,
  }))
}
