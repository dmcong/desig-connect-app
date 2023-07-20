import { DecodeType } from '@desig/tx-parser'

import {
  Web3TokenAsset,
  SignedWeb3Tx,
  AssetMetadata,
  Web3Tx,
} from 'plugins/web3.interface'
import Web3ProviderBase from 'plugins/web3.abstract'

export default class DefaultPlugin extends Web3ProviderBase {
  nativeMetadata: AssetMetadata = { address: '', img: '', name: '', symbol: '' }
  nativeDecimals: number = 0

  /**
   * Utility
   */
  isWalletAddr(addr: string): boolean {
    return false
  }
  /**
   * Assets
   */
  async getTokenDecimals(addr: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async getTokenMetadata(address: string): Promise<AssetMetadata> {
    if (this.isNative(address))
      return {
        address: this.nativeAddr,
        img: '',
        name: '--',
        symbol: '--',
      }
    // Fetch metadata
    return {
      address,
      img: '',
      name: '--',
      symbol: '--',
    }
  }

  async getTokenAssets(): Promise<Web3TokenAsset[]> {
    return []
  }
  async transferToken(
    toPub: string,
    token: string,
    amountUI: string,
  ): Promise<Web3Tx> {
    return {
      raw: '',
      msg: '',
    }
  }

  async watchToken(
    callback: (data: { token: string; amount: string }) => void,
  ): Promise<() => void> {
    return () => {}
  }

  /**
   * Native asset
   */
  async getNativeAsset(): Promise<Web3TokenAsset> {
    return {
      amount: '0',
      tokenAddress: this.nativeAddr,
    }
  }
  async transferNative(toPub: string, amountUI: string): Promise<Web3Tx> {
    return {
      raw: '',
      msg: '',
    }
  }

  async watchNative(
    callback: (data: { amount: string }) => void,
  ): Promise<() => void> {
    return () => {}
  }

  /**
   * Transaction utility
   */
  async decodeTx(
    raw: string,
  ): Promise<{ decodedData: DecodeType; contractAddress: string }> {
    throw new Error('Not implemented')
  }

  getExplorerUrl(txHash: string): string {
    return ''
  }

  /**
   * Transaction
   */
  async addSignature(
    web3Tx: Web3Tx,
    sig: string,
    recv?: number,
  ): Promise<SignedWeb3Tx> {
    return {
      raw: '',
      msg: '',
      sig,
    }
  }
  async sendAndConfirm(web3Tx: SignedWeb3Tx): Promise<{ txHash: string }> {
    return { txHash: '' }
  }
}
