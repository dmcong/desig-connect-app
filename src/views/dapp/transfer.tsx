import { useCallback, useState } from 'react'

import { Button, Col, Input, Row, Typography, notification } from 'antd'
import { useWalletProvider } from 'providers/wallet.provider'

const Transfer = () => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [txHash, setTxHash] = useState('')
  const walletProvider = useWalletProvider()

  const handleTransfer = useCallback(async () => {
    try {
      setLoading(true)
      const { explorerUrl, txHash } = await walletProvider.transfer(
        toAddress,
        amount,
      )
      notification.success({
        message: 'Transfer successfully! Click to view detail!',
        onClick: () => {
          window.open(explorerUrl, '_blank')
        },
      })
      setAmount('0')
      setToAddress('')
      setTxHash(txHash)
    } catch (error: any) {
      notification.error({ message: error.message })
    } finally {
      setLoading(false)
    }
  }, [amount, toAddress, walletProvider])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text strong>Transfer native token</Typography.Text>
      </Col>
      <Col span={24}>
        <Input
          placeholder="Enter To Address"
          onChange={(e) => setToAddress(e.target.value)}
          value={toAddress}
        />
      </Col>
      <Col span={24}>
        <Input
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </Col>
      <Col span={24}>
        <Button
          disabled={!amount || !toAddress}
          loading={loading}
          type="primary"
          onClick={handleTransfer}
        >
          Transfer
        </Button>
      </Col>
      {txHash && <Col span={24}>txHash: {txHash}</Col>}
    </Row>
  )
}

export default Transfer
