import { Col, Row, Space, Typography } from 'antd'
import WalletBalance from 'components/walletBalance'

import { useWalletStore } from 'providers/wallet.provider'

const WalletInfo = () => {
  const { address } = useWalletStore()

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title style={{ marginTop: 0 }} level={2}>
          Wallet Information
        </Typography.Title>
      </Col>
      {/* Wallet address */}
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Title style={{ margin: 0 }} level={5}>
            1. Wallet Address
          </Typography.Title>
          <div
            style={{
              background: '#f9f0ff',
              border: '1px solid #d3adf7',
              padding: '16px 8px',
              justifyContent: 'center',
              display: 'flex',
              borderRadius: 8,
            }}
          >
            <Typography.Text style={{ color: '#531dab', fontSize: '16px' }}>
              {address}
            </Typography.Text>
          </div>
        </Space>
      </Col>

      {/* Wallet Balance */}
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Title style={{ margin: 0 }} level={5}>
            2. Balance
          </Typography.Title>
          <WalletBalance />
        </Space>
      </Col>
    </Row>
  )
}

export default WalletInfo
