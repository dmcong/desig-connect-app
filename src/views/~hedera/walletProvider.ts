import { Wallet } from '@hashgraph/sdk'

interface WalletHedera {
  connect: (
    chainId: string,
  ) => Promise<{ chainId: string; pubkey: string; accountId: string }>
  disconnect: (chainId: string) => Promise<void>
  provider: Wallet
}

export const useWalletProvider = () => {
  return window.desig.hedera as WalletHedera
}
