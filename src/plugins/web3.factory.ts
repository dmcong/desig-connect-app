import { getChain } from '@desig/supported-chains'

// Chain plugins
import DefaultPlugin from 'plugins/default.plugin'
import SeiPlugin from 'plugins/sei'

import Web3ProviderBase from './web3.abstract'

export default class Web3Factory {
  static stores: { [web3Id: string]: Web3ProviderBase } = {}

  static getInstanceId = (chainId: string, multisigId: string) => {
    return `${chainId}::${multisigId}`
  }

  static newInstance = (chainId: string, multisigId: string) => {
    if (!multisigId || !chainId) return new DefaultPlugin(chainId, multisigId)
    const chain = getChain(chainId)
    switch (chain.group) {
      case 'sei':
        return new SeiPlugin(chainId, multisigId)
      default:
        return new DefaultPlugin(chainId, multisigId)
    }
  }

  static getInstance = (chainId: string, multisigId: string) => {
    const web3Id = this.getInstanceId(chainId, multisigId)

    if (!this.stores[web3Id]) {
      this.stores[web3Id] = this.newInstance(chainId, multisigId)
    }
    return this.stores[web3Id]
  }
}
