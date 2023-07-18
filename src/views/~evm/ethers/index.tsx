import { ReactNode, useCallback, useEffect, useState } from 'react'
import { chains } from '@desig/supported-chains'
import { ethers } from 'ethers'

import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd'
import Brand from 'components/brand'
import ConnectButton from './connectButton'
import ChainSelect from './chainSelect'
import Transfer from './transfer'

import { useChainId } from 'hooks/useChainId'
import { useEvmProvider } from 'views/~evm/useEvmProvider'

export default function App() {
  const [publicKey, setPublickey] = useState('')
  const [balance, setBalance] = useState('')
  const { setChainId, chainId } = useChainId()
  const provider = useEvmProvider()

  const fetchInfo = useCallback(async () => {
    if (!provider) return setBalance('0')
    const accounts = await provider.send('eth_requestAccounts', [])
    const balance = await provider.getBalance(accounts[0])
    setPublickey(accounts[0])
    return setBalance(ethers.formatEther(balance))
  }, [provider])

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  return (
    <Card
      title={
        <Space size={12} align="center" className="space-middle-icon">
          <Brand />
          {chainId && <ChainSelect chainId={chainId} setChainId={setChainId} />}
          <ConnectButton />
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
      {!chainId ? (
        <Typography.Text>The wallet is not connected</Typography.Text>
      ) : (
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Space size={12} direction="vertical">
              <Content
                label="Chain: "
                value={
                  <Space>
                    <Typography.Text>{chains[chainId].name}</Typography.Text>
                    <Avatar src={chains[chainId].icon} />
                  </Space>
                }
              />
              <Content
                label="Address: "
                value={<Typography.Text>{publicKey}</Typography.Text>}
              />
              <Content
                label="Balance: "
                value={<Typography.Text>{balance.slice(0, 6)}</Typography.Text>}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Transfer address={publicKey} />
          </Col>
        </Row>
      )}
    </Card>
  )
}

const Content = ({ label, value }: { label: string; value: ReactNode }) => (
  <Space align="center" className="space-middle-icon">
    <Typography.Text type="secondary">{label}</Typography.Text>
    {value}
  </Space>
)
