import { useState } from 'react'
import { HederaTestnet } from '@desig/supported-chains'
import { AccountId, TransferTransaction } from '@hashgraph/sdk'

import { Col, Card, Input, Button, Row } from 'antd'

import { useWalletProvider } from './walletProvider'

const Transfer = () => {
  const [amount, setAmount] = useState('')
  const [receiver, setReceiver] = useState('')
  const provider = useWalletProvider()

  const handleTransfer = async () => {
    await provider.connect(new HederaTestnet().chainId)
    const context = await provider.getContext()

    console.log('receiver', receiver.startsWith('0x'))
    console.log('amount', amount)
    console.log('context.accountId', context.accountId)
    const transaction = new TransferTransaction({
      hbarTransfers: [
        {
          accountId: context.accountId,
          amount,
        },
        {
          accountId: context.accountId,
          amount,
        },
      ],
    })

    const populatedTransaction = await context.populateTransaction(transaction)
    const signedTransaction = await context.signTransaction(
      populatedTransaction.freeze(),
    )
    const result = await context.call(signedTransaction)

    console.log('result', result)
  }

  return (
    <Col span={8}>
      <Card
        title="Transfer native token"
        bordered={false}
        style={{ width: '100%' }}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Input
              placeholder="Enter Receiver"
              onChange={(e) => setReceiver(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Input
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Button type="primary" onClick={handleTransfer}>
              Send
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}
export default Transfer
