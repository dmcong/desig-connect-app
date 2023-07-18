import { BrowserProvider } from 'ethers'

import { Col, Row } from 'antd'
import WalletCard from './ethers'
import Rainbowkit from './rainbowkit'

import WalletProvider, { IWalletProvider } from 'providers/wallet.provider'

const WALLET_PROVIDER: IWalletProvider = (() => {
  const provider = new BrowserProvider(window.desig.ethereum, 'any')

  async function getAddress() {
    const accounts = await provider.send('eth_requestAccounts', [])
    return accounts[0] as string
  }
  async function getBalance() {
    const address = getAddress()
    const balance = await provider.getBalance(address)
    return balance.toString()
  }
  async function switchChain(chainId: string) {
    await provider.send('wallet_switchEthereumChain', [{ chainId }])
    const address = await getAddress()
    return { address }
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
        <Col xl={12} xs={24}>
          <Rainbowkit />
        </Col>
        <Col xs={24}>
          <WalletCard />
        </Col>
      </Row>
    </WalletProvider>
  )
}
