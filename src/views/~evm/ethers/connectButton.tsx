import { useCallback, useEffect } from 'react'
import { BrowserProvider } from 'ethers'

import { Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useChainId } from 'hooks/useChainId'

const ConnectButton = () => {
  const { setChainId, chainId } = useChainId()

  const onConnect = useCallback(async () => {
    if (!window.desig.ethereum) throw new Error('Browser not supported')
    const provider = new BrowserProvider(window.desig.ethereum)
    const network = await provider.getNetwork()

    let chainId = network.chainId.toString(16) // Convert to hex string
    // Pad with leading zeros if the length is odd
    if (chainId.length % 2 !== 0) {
      chainId = '0x' + chainId
    }
    setChainId(chainId)
  }, [setChainId])

  const onDisconnect = useCallback(async () => {
    await window.desig.ethereum.request({
      method: 'disconnect',
    })
    setChainId('')
  }, [setChainId])

  const onReconnect = useCallback(async () => {
    if (chainId) await onConnect()
  }, [chainId, onConnect])

  useEffect(() => {
    onReconnect
  }, [onReconnect])

  return chainId ? (
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
