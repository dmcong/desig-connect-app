import { useLocation, useNavigate } from 'react-router-dom'
import { Col, Menu, Row, Space, Typography } from 'antd'

import evm from './brand/eth-logo.svg'
import solana from './brand/solana-logo.svg'
import sui from './brand/sui-logo.svg'
import aptos from './brand/aptos-logo.svg'
import hedera from './brand/hedera-logo.svg'

const CHAINS = [
  {
    key: 'evm',
    label: 'EVM',
    logo: evm,
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
    <Row gutter={[16, 16]}>
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
                  <img src={chain.logo} height={20} width={30} />
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
