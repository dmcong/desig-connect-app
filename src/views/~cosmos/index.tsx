import { useMemo } from 'react'
import { decode } from 'bs58'
import { GroupChain } from '@desig/supported-chains'
import { SignDoc } from '@keplr-wallet/types'
import { StargateClient } from '@cosmjs/stargate'
import { makeSignDoc } from '@cosmjs/proto-signing'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

import { Row } from 'antd'
import DApp from 'views/dapp'

import WalletProvider, { IWalletProvider } from 'providers/wallet.provider'
import { useChain } from 'hooks/useChain'
import Web3Factory from 'plugins/web3.factory'

interface ICosmosWallet {
  connect: (chainId: string) => Promise<{ address: string; pubkey: string }>
  disconnect: (chainId: string) => Promise<void>
  switchChain: (chainId: string) => Promise<void>
  sign: (chainId: string, signDoc: SignDoc) => Promise<string>
}

export default function Evm() {
  const { chainId } = useChain()

  const provider: IWalletProvider = useMemo(() => {
    const desigWallet: ICosmosWallet = window.desig.cosmos!
    if (!desigWallet) throw new Error('Invalid provider')

    const getAddress = async () => {
      const { address } = await desigWallet.connect(chainId)
      return address
    }
    const getBalance = async () => {
      const address = await getAddress()
      const client = await StargateClient.connect(
        'https://rpc.atlantic-2.seinetwork.io',
      )
      const balance = await client.getBalance(address, 'usei')
      return balance.amount
    }
    const switchChain = async (chainId: string) => {
      await desigWallet.switchChain(chainId)
      const { address } = await desigWallet.connect(chainId)
      return { address }
    }

    const transfer = async (toAddress: string, amount: string) => {
      const client = await StargateClient.connect(
        'https://rpc.atlantic-2.seinetwork.io',
      )
      const { address, pubkey } = await desigWallet.connect(chainId)
      const web3Provider = Web3Factory.getInstance(chainId, pubkey)
      const txTransfer = await web3Provider.transferNative(toAddress, amount)

      const txRaw = TxRaw.decode(decode(txTransfer.raw))
      const { accountNumber } = await client.getSequence(address)
      const signDoc = makeSignDoc(
        txRaw.bodyBytes,
        txRaw.authInfoBytes,
        await client.getChainId(),
        accountNumber,
      )
      // Sign transaction
      const sig = await desigWallet.sign(chainId, signDoc)
      const signedTx = await web3Provider.addSignature(txTransfer, sig)
      // Broadcast transaction
      const { txHash } = await web3Provider.sendAndConfirm(signedTx)
      return {
        explorerUrl: web3Provider.getExplorerUrl(txHash),
        txHash: txHash,
      }
    }

    return {
      getAddress,
      getBalance,
      switchChain,
      transfer,
    }
  }, [chainId])

  return (
    <WalletProvider provider={provider}>
      <Row gutter={[24, 24]}>
        <DApp src="cosmos" groups={[GroupChain.Sei]} />
      </Row>
    </WalletProvider>
  )
}
