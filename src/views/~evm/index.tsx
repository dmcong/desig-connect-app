import { GroupChain } from '@desig/supported-chains'
import { BrowserProvider, toBeHex } from 'ethers'

import { Col, Row } from 'antd'
import Rainbowkit from './rainbowkit'
import DApp from 'views/dapp'

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
    transfer: async (toAddress: string, amount: string) => {
      const provider = new BrowserProvider(window.desig.ethereum)

      const address = await getAddress()
      const params = { to: toAddress, value: toBeHex(amount) }
      const { gasPrice } = await provider.getFeeData()
      const gasLimit = await provider.estimateGas({
        from: address,
        ...params,
      })
      if (!gasPrice) throw new Error('Invalid gas price')
      const txHash = await provider.send('eth_sendTransaction', [
        {
          from: address,
          gasLimit: toBeHex(gasLimit),
          gasPrice: toBeHex(gasPrice),
          ...params,
        },
      ])
      return { explorerUrl: '', txHash }
    },
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
          <DApp
            src="evm"
            groups={[
              GroupChain.Ethereum,
              GroupChain.Binance,
              GroupChain.Linea,
              GroupChain.Moonbeam,
              GroupChain.Polygon_zkevm,
              GroupChain.Zeta,
            ]}
          />
        </Col>
      </Row>
    </WalletProvider>
  )
}
