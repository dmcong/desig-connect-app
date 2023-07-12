import { useState } from 'react'
import { BrowserProvider, ethers } from 'ethers'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd'
import desig from './logo.svg'
import { chains } from '@desig/supported-chains'

export default function App() {
  const [publicKey, setPublickey] = useState('')
  const [network, setNetwork] = useState('')
  const [balance, setBalance] = useState('')

  const connectButton = async () => {
    if (!window.desig.ethereum) throw new Error('Browser not supported')

    const provider = new BrowserProvider(window.desig.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    const network = await provider.getNetwork()
    const balance = await provider.getBalance(accounts[0])

    let hexString = network.chainId.toString(16) // Convert to hex string
    // Pad with leading zeros if the length is odd
    if (hexString.length % 2 !== 0) {
      hexString = '0x' + hexString
    }
    setNetwork(hexString)
    setPublickey(accounts[0])
    setBalance(ethers.formatEther(balance))
  }

  const chain = chains[network]

  return (
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
      className="card-title"
      bordered={false}
      style={{ width: '100%' }}
      extra={
        <Space size={4}>
          <Typography.Text>View on</Typography.Text>
          <Button
            type="link"
            onClick={() =>
              window.open(
                'https://github.com/dmcong/desig-connect-app/blob/main/src/views/~evm/ethers/index.tsx',
                '_blank',
              )
            }
            style={{ padding: 0 }}
          >
            Github
          </Button>
        </Space>
      }
    >
      <Row gutter={[8, 24]}>
        {!publicKey ? (
          <Col span={24}>
            <Button type="primary" onClick={connectButton}>
              Connect Wallet
            </Button>
          </Col>
        ) : (
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Tag style={{ padding: 8 }} color="success">
                <Space>
                  <Avatar src={chain.icon} />
                  <Typography.Text strong>{chain.name} </Typography.Text>
                  <Divider type="vertical" />
                  <Typography.Text>{publicKey}</Typography.Text>
                  <Divider type="vertical" />
                  <Typography.Text strong>{balance}</Typography.Text>
                </Space>
              </Tag>
            </Space>
          </Col>
        )}
      </Row>
    </Card>
  )
}
