import { useCallback } from 'react'

import { Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useWalletProvider, useWalletStore } from 'providers/wallet.provider'
import { useChain } from 'hooks/useChain'

const ConnectButton = () => {
  const { address, setWallet } = useWalletStore()
  const { chainId } = useChain()
  const provider = useWalletProvider()

  const onConnect = useCallback(async () => {
    const { address } = await provider.switchChain(chainId)
    const balance = await provider.getBalance()
    setWallet({ address, balance })
  }, [chainId, provider, setWallet])

  const onDisconnect = useCallback(async () => {
    setWallet({ address: '', balance: '' })
  }, [setWallet])

  return address ? (
    <Button onClick={onDisconnect} icon={<IonIcon name="log-out-outline" />}>
      Disconnect
    </Button>
  ) : (
    <Button type="primary" onClick={onConnect}>
      Connect Wallet
    </Button>
  )
}

export default ConnectButton
