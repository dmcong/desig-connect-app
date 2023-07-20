import { Chain } from '@desig/supported-chains'
import { DecodeType } from '@desig/tx-parser'

export interface IWeb3Context {
  nativeMetadata: AssetMetadata
  nativeDecimals: number
  chain: Chain
  chainId: string
  masterAddr: string
  initialized: boolean
  init(): Promise<void>
}

/**
 * Transaction interface
 */
export type Web3Tx = {
  raw: string
  msg: string
}
export type SignedWeb3Tx = {
  raw: string
  msg: string
  sig: string
}

export interface IWeb3TxProvider {
  // Utility
  decodeTx(raw: string): Promise<{
    decodedData: DecodeType
    contractAddress: string
  } | null>
  getExplorerUrl(txHash: string): string
  // Transaction
  addSignature(web3Tx: Web3Tx, sig: string): Promise<SignedWeb3Tx>
  sendAndConfirm(tx: SignedWeb3Tx): Promise<{ txHash: string }>
}

/**
 * Assets
 */
export type Web3TokenAsset = {
  tokenAddress: string
  amount: string
}

export type AssetMetadata = {
  address: string
  name: string
  symbol: string
  img: string
}

export interface IWeb3AssetsProvider {
  getTokenMetadata(addr: string): Promise<AssetMetadata>
  getTokenDecimals(addr: string): Promise<number>
  // Tokens
  getTokenAssets(): Promise<Web3TokenAsset[]>
  transferToken(to: string, token: string, amount: string): Promise<Web3Tx>
  watchToken(
    callback: (data: { token: string; amount: string }) => void,
  ): Promise<() => void>
  // Native
  getNativeAsset(): Promise<Web3TokenAsset>
  transferNative(dst: string, amount: string): Promise<Web3Tx>
  watchNative(callback: (data: { amount: string }) => void): Promise<() => void>
}

export interface IWeb3Utility {
  isNative(addr: string): boolean
  isWalletAddr(addr: string): boolean
}
