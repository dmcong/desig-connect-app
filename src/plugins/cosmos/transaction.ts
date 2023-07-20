import { decode } from 'bs58'
import {
  MsgSendEncodeObject,
  calculateFee,
  StargateClient,
} from '@cosmjs/stargate'
import {
  coins,
  TxBodyEncodeObject,
  Registry,
  makeAuthInfoBytes,
  encodePubkey,
} from '@cosmjs/proto-signing'
import { Int53 } from '@cosmjs/math'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { encodeSecp256k1Pubkey } from '@cosmjs/amino'

export class TransactionProvider {
  constructor(
    readonly walletAddr: string,
    readonly nativeAddress: string,
    readonly multisigId: string,
    readonly rpc: string,
  ) {}

  async transferToken(recipient: string, amount: string, denom: string) {
    const client = await StargateClient.connect(this.rpc)
    const { accountNumber, sequence } = await client.getSequence(
      this.walletAddr,
    )
    const sendMsg: MsgSendEncodeObject = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: this.walletAddr,
        toAddress: recipient,
        amount: coins(amount, denom),
      },
    }
    const txBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: { messages: [sendMsg] },
    }
    const registry = new Registry()
    const txBodyBytes = registry.encode(txBodyEncodeObject)

    const fee = calculateFee(100_000, `0.1${this.nativeAddress}`)
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(decode(this.multisigId)))
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit,
      fee.granter,
      fee.payer,
    )
    const txRaw = TxRaw.fromPartial({
      authInfoBytes,
      bodyBytes: txBodyBytes,
    })

    return { txRaw, accountNumber }
  }
}
