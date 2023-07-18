import { useLocation, useNavigate } from 'react-router-dom'
import { Card, Col, Menu, Row, Space, Typography } from 'antd'

import evm from '/eth-logo.png'
import cosmos from '/cosmos-logo.png'
import solana from '/solana-logo.svg'
import sui from '/sui-logo.svg'
import aptos from '/aptos-logo.svg'
import hedera from '/hedera-logo.svg'

import github from '/github-logo.webp'

const CHAINS = [
  {
    key: 'evm',
    label: 'EVM',
    logo: evm,
  },
  {
    key: 'cosmos',
    label: 'Cosmos',
    logo: cosmos,
    disabled: true,
  },
  {
    key: 'hedera',
    label: 'Hedera',
    logo: hedera,
  },
  {
    key: 'solana',
    label: 'Solana',
    logo: solana,
    disabled: true,
  },
  {
    key: 'sui',
    label: 'SUI',
    logo: sui,
    disabled: true,
  },
  {
    key: 'aptos',
    label: 'Aptos',
    logo: aptos,
    disabled: true,
  },
]

function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col style={{ paddingTop: 16 }}>
        <Card
          hoverable
          style={{ borderRadius: 8, background: 'rgba(0, 0, 0, 0.02)' }}
          bodyStyle={{ padding: 8 }}
          onClick={() =>
            window.open('https://github.com/dmcong/desig-connect-app', '_blank')
          }
        >
          <img src={github} height={50} />
        </Card>
      </Col>
      <Col span={24}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[pathname.replace('/', '')]}
        >
          <Menu.ItemGroup title="Supported Chains">
            {CHAINS.map((chain) => (
              <Menu.Item
                key={chain.key}
                onClick={() => navigate(`/${chain.key}`)}
                disabled={chain.disabled}
                style={chain.disabled ? { opacity: 0.5 } : undefined}
              >
                <Space align="center" className="space-middle-icon">
                  <img src={chain.logo} width={20} />
                  <Typography.Text>{chain.label}</Typography.Text>
                </Space>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu>
      </Col>
    </Row>
  )
}

export default Sidebar
