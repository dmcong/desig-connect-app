import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { create } from 'zustand'

import { Result } from 'antd'

/**
 * Context
 */

export const WalletProviderContext = createContext<IWalletProvider | null>(null)

/**
 * Store
 */
export interface IWalletProvider {
  getAddress: () => Promise<string>
  getBalance: () => Promise<string>
  switchChain: (chainId: string) => Promise<{ address: string }>
}

type WalletStore = {
  address: string
  balance: string
  setWallet: (payload: { address: string; balance: string }) => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const useWalletStore = create<WalletStore>()((set) => ({
  address: '',
  balance: '',
  setWallet: (payload: { address: string; balance: string }) => set(payload),
}))

// eslint-disable-next-line react-refresh/only-export-components
export const useWalletProvider = () => {
  return useContext(WalletProviderContext)!
}

const WalletProvider = ({
  children,
  provider,
}: PropsWithChildren<{ provider: IWalletProvider | null }>) => {
  const { setWallet } = useWalletStore()

  useEffect(() => {
    return () => {
      setWallet({ address: '', balance: '' })
    }
  }, [setWallet])

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
