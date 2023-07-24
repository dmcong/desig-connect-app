import { useMemo } from 'react'
import { decode, encode } from 'bs58'
import { GroupChain, SeiTestnet } from '@desig/supported-chains'
import { StargateClient } from '@cosmjs/stargate'
import { makeSignDoc } from '@cosmjs/proto-signing'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { Window as KeplrWindow } from '@keplr-wallet/types'
import { decodeSignature } from '@cosmjs/amino'

import { Row } from 'antd'
import DApp from 'views/dapp'

import WalletProvider, { IWalletProvider } from 'providers/wallet.provider'
import { useChain } from 'hooks/useChain'
import Web3Factory from 'plugins/web3.factory'

const NETWORK_MAPPING: Record<string, string> = {
  [new SeiTestnet().chainId]: 'atlantic-2',
}

export default function Cosmos() {
  const { chainId } = useChain()
  const network = NETWORK_MAPPING[chainId]

  const provider: IWalletProvider = useMemo(() => {
    const desigWallet: KeplrWindow['keplr'] = window.desig.cosmos!
    if (!desigWallet) throw new Error('Invalid provider')

    const getAddress = async () => {
      await desigWallet.enable('atlantic-2')
      const { bech32Address } = await desigWallet.getKey(network)
      return bech32Address
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
      await desigWallet.enable(NETWORK_MAPPING[chainId])
      const address = await getAddress()
      return { address }
    }

    const transfer = async (toAddress: string, amount: string) => {
      const client = await StargateClient.connect(
        'https://rpc.atlantic-2.seinetwork.io',
      )
      const { bech32Address, pubKey } = await desigWallet.getKey(network)
      const web3Provider = Web3Factory.getInstance(chainId, encode(pubKey))
      console.log('toAddress', toAddress)
      const txTransfer = await web3Provider.transferNative(toAddress, amount)

      console.log('first', txTransfer)
      const txRaw = TxRaw.decode(decode(txTransfer.raw))
      const { accountNumber } = await client.getSequence(bech32Address)
      const signDoc = makeSignDoc(
        txRaw.bodyBytes,
        txRaw.authInfoBytes,
        network,
        accountNumber,
      )
      // Sign transaction
      const sig = await desigWallet.signDirect(network, bech32Address, signDoc)
      txRaw.signatures.push(decodeSignature(sig.signature).signature)
      const { transactionHash } = await client.broadcastTx(
        TxRaw.encode(txRaw).finish(),
      )
      return {
        explorerUrl: web3Provider.getExplorerUrl(transactionHash),
        txHash: transactionHash,
      }
    }

    return {
      getAddress,
      getBalance,
      switchChain,
      transfer,
    }
  }, [chainId, network])

  return (
    <WalletProvider provider={provider}>
      <Row gutter={[24, 24]}>
        <DApp src="cosmos" groups={[GroupChain.Sei]} />
      </Row>
    </WalletProvider>
  )
}
