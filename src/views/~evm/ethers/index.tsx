import { useState } from 'react'
import { BrowserProvider, ethers } from 'ethers'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import desig from './logo.svg'
export default function App() {
  const [publicKey, setPublickey] = useState('')
  const [network, setNetwork] = useState('')
  const [balance, setBalance] = useState('')

  const connectButton = async () => {
    if (!window.desig.ethereum) throw new Error('Browser not supported')

    const provider = new BrowserProvider(window.desig.ethereum)
    console.log('provider', window.desig.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    const { name } = await provider.getNetwork()
    const balance = await provider.getBalance(accounts[0])
    setNetwork(name)
    setPublickey(accounts[0])
    setBalance(ethers.formatEther(balance))
  }

  return (
    <Row>
      <Col span={24}>
        <Card
          title={
            <Space align="center" className="space-middle-icon">
              <img
                alt="desig"
                src={desig}
                style={{ borderRadius: '10px' }}
                height={30}
              />
              Desig Wallet
            </Space>
          }
          bordered={false}
          style={{ width: '100%' }}
        >
          <Row gutter={[8, 24]}>
            <Col span={24}>
              <Button type="primary" onClick={connectButton}>
                Connect Wallet
              </Button>
            </Col>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                <Typography.Text>{`Network: ${
                  network || '--'
                }`}</Typography.Text>
                <Typography.Text>{`Address: ${
                  publicKey || '--'
                }`}</Typography.Text>
                <Typography.Text>{`Balance: ${
                  balance || '--'
                }`}</Typography.Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
