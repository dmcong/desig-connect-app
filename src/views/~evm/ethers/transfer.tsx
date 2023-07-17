import { useCallback, useState } from 'react'
import { toBeHex } from 'ethers'

import { Button, Col, Input, Row, Typography, notification } from 'antd'

import { useEvmProvider } from 'hooks/useEvmProvider'
import { decimalize } from 'utils'

const Transfer = ({ address }: { address: string }) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [receiver, setReceiver] = useState('')
  const provider = useEvmProvider()

  const handleTransfer = useCallback(async () => {
    try {
      if (!provider) return
      setLoading(true)
      const decimalAmount = decimalize(amount, 18)
      const params = { to: receiver, value: toBeHex(decimalAmount.toString()) }
      const { gasPrice } = await provider.getFeeData()
      const gasLimit = await provider.estimateGas({
        from: address,
        ...params,
      })
      if (!gasPrice) throw new Error('Invalid gas price')

      await provider.send('eth_sendTransaction', [
        {
          from: address,
          gasLimit: toBeHex(gasLimit),
          gasPrice: toBeHex(gasPrice),
          ...params,
        },
      ])
      notification.success({ message: 'Transfer successfully!' })
      setAmount('0')
      setReceiver('')
    } catch (error: any) {
      notification.error({ message: error.message })
    } finally {
      setLoading(false)
    }
  }, [address, amount, provider, receiver])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text strong>Transfer native token</Typography.Text>
      </Col>
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
        <Button
          disabled={!amount || !receiver}
          loading={loading}
          type="primary"
          onClick={handleTransfer}
        >
          Transfer
        </Button>
      </Col>
    </Row>
  )
}

export default Transfer
