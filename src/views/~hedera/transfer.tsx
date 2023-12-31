import { useState } from 'react'
import { HederaTestnet } from '@desig/supported-chains'
import { TransferTransaction } from '@hashgraph/sdk'

import { Col, Card, Input, Button, Row, notification } from 'antd'

import { useWalletProvider } from './walletProvider'

const Transfer = () => {
  const [amount, setAmount] = useState('')
  const [receiver, setReceiver] = useState('')
  const wallet = useWalletProvider()

  const handleTransfer = async () => {
    try {
      await wallet.connect(new HederaTestnet().chainId)

      const transaction = new TransferTransaction({
        hbarTransfers: [
          {
            accountId: receiver,
            amount,
          },
          {
            accountId: wallet.provider.accountId.toString(),
            amount: `-${amount}`,
          },
        ],
      })

      const populatedTransaction = await wallet.provider.populateTransaction(
        transaction,
      )
      const signedTransaction = await wallet.provider.signTransaction(
        populatedTransaction.freeze(),
      )
      await wallet.provider.call(signedTransaction)
      notification.success({ message: 'Transfer Success' })
    } catch (error: any) {
      notification.error({ message: error.message })
    } finally {
      notification.success({ message: 'Transfer Success' })
    }
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
