import React, { useState } from 'react'
import { Col, Card, Button, Row, Space, Typography } from 'antd'
import { useWalletProvider } from './walletProvider'

import { HederaTestnet } from '@desig/supported-chains'

const Connect = () => {
  const [data, setData] = useState({
    chainId: '',
    pubkey: '',
    accountId: '',
  })
  const provider = useWalletProvider()

  const handleConnect = async () => {
    const data = await provider.connect(new HederaTestnet().chainId)
    setData(data)
  }

  const handleDisconnect = async () => {
    await provider.disconnect(new HederaTestnet().chainId)
    setData({
      chainId: '',
      pubkey: '',
      accountId: '',
    })
  }

  return (
    <Col span={8}>
      <Card title="Connect" bordered={false} style={{ width: '100%' }}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button type="primary" onClick={handleConnect} block>
              Connect
            </Button>
          </Col>
          <Col span={12}>
            <Button onClick={handleDisconnect} block>
              Disconnect
            </Button>
          </Col>
          <Col span={24}>
            <Typography.Text>{`Chain ID: ${
              data.chainId || '--'
            }`}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text>{`Pubkey ECDSA: ${
              data.pubkey || '--'
            }`}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text>{`AccountId: ${
              data.accountId || '--'
            }`}</Typography.Text>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}
export default Connect
