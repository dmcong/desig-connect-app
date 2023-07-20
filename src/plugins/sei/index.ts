import { AssetMetadata } from 'plugins/web3.interface'
import Web3CosmosProvider from 'plugins/cosmos/cosmos.abstract'
import { isSeiAddress, seiExplorer } from './utils'

export default class SeiPlugin extends Web3CosmosProvider {
  nativeMetadata = {
    address: 'usei',
    img: 'https://sei.explorers.guru/chains/sei.png',
    name: 'Sei',
    symbol: 'SEI',
  }
  nativeDecimals = 6

  /**
   * Custom
   */

  async getTokenDecimals(address: string): Promise<number> {
    if (this.isNative(address)) return 6
    return 0
  }

  async getTokenMetadata(address: string): Promise<AssetMetadata> {
    if (this.isNative(address)) return this.nativeMetadata
    return {
      address: address,
      img: '',
      name: address.split('/').at(-1) || '',
      symbol: address.split('/').at(-1) || '',
    }
  }

  getExplorerUrl(txHash: string): string {
    return seiExplorer(txHash, this.chainId)
  }

  isWalletAddr(address: string): boolean {
    return isSeiAddress(address)
  }
}
