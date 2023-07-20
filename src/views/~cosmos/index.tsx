import { Window as KeplrWindow } from '@keplr-wallet/types'

import { Row } from 'antd'

import WalletProvider, { IWalletProvider } from 'providers/wallet.provider'
import DApp from 'views/dapp'
import { GroupChain } from '@desig/supported-chains'

const WALLET_PROVIDER: IWalletProvider = (() => {
  const provider: KeplrWindow['keplr'] = window.desig.cosmos!
  if (!provider) throw new Error('Invalid provider')

  const getAddress = async () => {
    console.log('provider', provider)
    console.log('zooooo')
    const accounts = await provider.enable('chainId')
    console.log('accounts', accounts)
    return ''
  }
  const getBalance = async () => {
    return ''
  }
  const switchChain = async (chainId: string) => {
    const accounts = await provider.enable('chainId')
    console.log('accounts', accounts)
    return { address: '' }
  }
  return {
    getAddress,
    getBalance,
    switchChain,
  }
})()

export default function Evm() {
  return (
    <WalletProvider provider={WALLET_PROVIDER}>
      <Row gutter={[24, 24]}>
        <DApp groups={[GroupChain.Sei]} />
      </Row>
    </WalletProvider>
  )
}
