import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { create } from 'zustand'
import { Result } from 'antd'

/**
 * Context
 */
export interface IWalletProvider {
  getAddress: () => Promise<string>
  getBalance: () => Promise<string>
  switchChain: (chainId: string) => Promise<{ address: string }>
  transfer: (
    toAddress: string,
    amount: string,
  ) => Promise<{
    explorerUrl: string
    txHash: string
  }>
}
export const WalletProviderContext = createContext<IWalletProvider | null>(null)

/**
 * Store
 */

type WalletStore = {
  address: string
  setWalletAddress: (address: string) => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const useWalletStore = create<WalletStore>()((set) => ({
  address: '',
  setWalletAddress: (address: string) => set({ address }),
}))

// eslint-disable-next-line react-refresh/only-export-components
export const useWalletProvider = () => {
  return useContext(WalletProviderContext)!
}

const WalletProvider = ({
  children,
  provider,
}: PropsWithChildren<{ provider: IWalletProvider | null }>) => {
  const { setWalletAddress } = useWalletStore()

  useEffect(() => {
    return () => {
      setWalletAddress('')
    }
  }, [setWalletAddress])

  if (!provider)
    return (
      <Result
        status="404"
        title="Not found provider"
        subTitle="Sorry, wallet provider does not exist."
      />
    )

  return (
    <WalletProviderContext.Provider value={provider}>
      {children}
    </WalletProviderContext.Provider>
  )
}
export default WalletProvider
