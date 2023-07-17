import { useMemo } from 'react'
import { chains } from '@desig/supported-chains'
import { BrowserProvider, Network } from 'ethers'

import { useChainId } from 'hooks/useChainId'

export const useEvmProvider = () => {
  const { chainId } = useChainId()

  const provider = useMemo(() => {
    try {
      if (!chainId) return
      window.desig.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      const chain = chains[chainId]
      const network = new Network(chain.name, BigInt(chainId))
      return new BrowserProvider(window.desig.ethereum, network)
    } catch (error) {
      return
    }
  }, [chainId])

  return provider
}
