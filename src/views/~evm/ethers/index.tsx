import { ReactNode } from 'react'
import { GroupChain, chains } from '@desig/supported-chains'

import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd'
import Brand from 'components/brand'
import ConnectButton from 'components/connectButton'
import ChainSelect from 'components/chainSelect'
import Transfer from './transfer'

import { useChain } from 'hooks/useChain'
import { useWalletStore } from 'providers/wallet.provider'

export default function App() {
  const { address, balance } = useWalletStore()
  const { chainId } = useChain()

  return (
    <Card
      title={
        <Space size={12} align="center" className="space-middle-icon">
          <Brand />
          <ChainSelect
            groups={[
              GroupChain.Ethereum,
              GroupChain.Binance,
              GroupChain.Linea,
              GroupChain.Moonbeam,
              GroupChain.Polygon_zkevm,
              GroupChain.Zeta,
            ]}
          />
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
      {!address ? (
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
                value={<Typography.Text>{address}</Typography.Text>}
              />
              <Content
                label="Balance: "
                value={<Typography.Text>{balance.slice(0, 6)}</Typography.Text>}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Transfer address={address} />
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
