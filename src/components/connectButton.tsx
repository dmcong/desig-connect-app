import { useCallback } from 'react'

import { Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useWalletProvider, useWalletStore } from 'providers/wallet.provider'
import { useChain } from 'hooks/useChain'

const ConnectButton = () => {
  const { address, setWalletAddress } = useWalletStore()
  const { chainId } = useChain()
  const provider = useWalletProvider()

  const onConnect = useCallback(async () => {
    const { address } = await provider.switchChain(chainId)
    setWalletAddress(address)
  }, [chainId, provider, setWalletAddress])

  const onDisconnect = useCallback(async () => {
    setWalletAddress('')
  }, [setWalletAddress])

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
