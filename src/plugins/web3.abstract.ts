import { DecodeType } from '@desig/tx-parser'
import { Chain, getChain } from '@desig/supported-chains'
import { decode } from 'bs58'

import {
  AssetMetadata,
  SignedWeb3Tx,
  IWeb3AssetsProvider,
  IWeb3Context,
  Web3TokenAsset,
  Web3Tx,
  IWeb3TxProvider,
  IWeb3Utility,
} from './web3.interface'

export default abstract class Web3ProviderBase
  implements IWeb3Context, IWeb3TxProvider, IWeb3AssetsProvider, IWeb3Utility
{
  abstract nativeMetadata: AssetMetadata
  abstract nativeDecimals: number
  readonly chain: Chain
  readonly id: `${string}::${string}`
  public masterAddr: string
  public initialized = false
  constructor(readonly chainId: string, readonly multisigId: string) {
    this.chain = getChain(chainId)
    this.id = `${chainId}::${this.multisigId}`
    this.masterAddr = this.chain.getAddress(decode(multisigId))
  }

  get nativeAddr() {
    return this.nativeMetadata.address
  }

  async init(): Promise<void> {
    this.initialized = true
  }

  /**
   * Assets
   */
  abstract isWalletAddr(addr?: string): boolean
  isNative(addr: string) {
    return this.nativeAddr.toLowerCase() === addr?.toLowerCase()
  }
  abstract getTokenDecimals(addr: string): Promise<number>
  abstract getTokenMetadata(addr: string): Promise<AssetMetadata>
  abstract getTokenAssets(): Promise<Web3TokenAsset[]>
  abstract transferToken(
    to: string,
    token: string,
    amountUI: string,
  ): Promise<Web3Tx>
  abstract watchToken(
    callback: (data: { token: string; amount: string }) => void,
  ): Promise<() => void>

  // Native Assets
  abstract getNativeAsset(): Promise<Web3TokenAsset>
  abstract transferNative(dst: string, amountUI: string): Promise<Web3Tx>
  abstract watchNative(
    callback: (data: { amount: string }) => void,
  ): Promise<() => void>

  /**
   * Transaction
   */
  abstract decodeTx(
    raw: string,
  ): Promise<{ decodedData: DecodeType; contractAddress: string } | null>
  abstract getExplorerUrl(txHash: string): string
  abstract addSignature(
    web3Tx: Web3Tx,
    sig: string,
    recv?: number,
  ): Promise<SignedWeb3Tx>
  abstract sendAndConfirm(
    signedWeb3Tx: SignedWeb3Tx,
  ): Promise<{ txHash: string }>
}
