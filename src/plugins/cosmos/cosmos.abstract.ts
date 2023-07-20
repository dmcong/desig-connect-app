import { DecodeType, TxParser } from '@desig/tx-parser'
import { sha256 } from '@noble/hashes/sha256'
import { decode, encode } from 'bs58'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { makeSignDoc, makeSignBytes } from '@cosmjs/proto-signing'
import { StargateClient } from '@cosmjs/stargate'

import Web3ProviderBase from 'plugins/web3.abstract'
import { Web3TokenAsset, Web3Tx, SignedWeb3Tx } from 'plugins/web3.interface'
import { TransactionProvider } from './transaction'
import { decimalize } from 'helpers/util'

export default abstract class Web3CosmosProvider extends Web3ProviderBase {
  abstract getTokenDecimals(addr: string): Promise<number>
  abstract getExplorerUrl(txHash: string): string
  abstract isWalletAddr(address: string): boolean
  protected cosmosParser: TxParser | undefined = undefined

  get txProvider() {
    return new TransactionProvider(
      this.masterAddr,
      this.nativeAddr,
      this.multisigId,
      this.chain.rpcs[0],
    )
  }

  async stargateClient() {
    return await StargateClient.connect(this.chain.rpcs[0])
  }

  async getNativeAsset(): Promise<Web3TokenAsset> {
    const web3 = await this.stargateClient()
    if (!web3) throw new Error('Invalid connection')
    const { amount } = await web3.getBalance(this.masterAddr, this.nativeAddr)

    return {
      amount: amount,
      tokenAddress: this.nativeAddr,
    }
  }

  async getTokenAssets(): Promise<Web3TokenAsset[]> {
    const web3 = await this.stargateClient()
    if (!web3) throw new Error('Invalid connection')
    const tokens = await web3.getAllBalances(this.masterAddr)
    return tokens.map(({ amount, denom }) => ({ amount, tokenAddress: denom }))
  }

  async watchToken(
    callback: (data: { token: string; amount: string }) => void,
  ): Promise<() => void> {
    return () => {}
  }

  async watchNative(
    callback: (data: { amount: string }) => void,
  ): Promise<() => void> {
    return () => {}
  }

  /**
   * Utility
   */

  async transferToken(
    toPub: string,
    token: string,
    amountUI: string,
  ): Promise<Web3Tx> {
    const client = await this.stargateClient()
    if (!client) throw new Error('Invalid connection')
    if (!this.isWalletAddr(this.masterAddr))
      throw new Error('Invalid wallet address')
    if (!this.isWalletAddr(toPub))
      throw new Error('Invalid destination address')

    const decimals = await this.getTokenDecimals(token)
    const amount = decimalize(amountUI, decimals)
    const { accountNumber, txRaw } = await this.txProvider.transferToken(
      toPub,
      amount.toString(),
      token,
    )
    const chainId = await client.getChainId()

    const signDoc = makeSignDoc(
      txRaw.bodyBytes,
      txRaw.authInfoBytes,
      chainId,
      accountNumber,
    )
    const signBytes = makeSignBytes(signDoc)
    const hashedMessage = sha256(signBytes)

    return {
      raw: encode(TxRaw.encode(txRaw).finish()),
      msg: encode(hashedMessage),
    }
  }

  async transferNative(toPub: string, amountUI: string): Promise<Web3Tx> {
    const client = await this.stargateClient()
    if (!client) throw new Error('Invalid connection')
    if (!this.isWalletAddr(this.masterAddr))
      throw new Error('Invalid wallet address')
    if (!this.isWalletAddr(toPub))
      throw new Error('Invalid destination address')

    const decimals = await this.getTokenDecimals(this.nativeAddr)
    const amount = decimalize(amountUI, decimals)
    const { accountNumber, txRaw } = await this.txProvider.transferToken(
      toPub,
      amount.toString(),
      this.nativeAddr,
    )
    const chainId = await client.getChainId()

    const signDoc = makeSignDoc(
      txRaw.bodyBytes,
      txRaw.authInfoBytes,
      chainId,
      accountNumber,
    )
    const signBytes = makeSignBytes(signDoc)
    const hashedMessage = sha256(signBytes)

    return {
      raw: encode(TxRaw.encode(txRaw).finish()),
      msg: encode(hashedMessage),
    }
  }

  /**
   * Transaction utility
   */
  async decodeTx(
    raw: string,
  ): Promise<{ decodedData: DecodeType; contractAddress: string }> {
    return {
      decodedData: { inputs: [], name: '' },
      contractAddress: '',
    }
  }

  async addSignature(
    web3Tx: Web3Tx,
    sig: string,
    recv?: number,
  ): Promise<SignedWeb3Tx> {
    const { raw } = web3Tx
    const { authInfoBytes, bodyBytes } = TxRaw.decode(decode(raw))

    const signedTx = TxRaw.fromPartial({
      authInfoBytes,
      bodyBytes,
      signatures: [decode(sig)],
    })

    return {
      raw: encode(TxRaw.encode(signedTx).finish()),
      msg: encode(TxRaw.encode(signedTx).finish()),
      sig,
    }
  }

  async sendAndConfirm(web3Tx: SignedWeb3Tx): Promise<{ txHash: string }> {
    const client = await this.stargateClient()
    if (!client) throw new Error('Invalid connection')
    const { raw } = web3Tx
    const broadcasted = await client.broadcastTx(decode(raw))
    return { txHash: broadcasted.transactionHash }
  }
}
