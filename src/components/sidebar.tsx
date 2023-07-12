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
    key: 'solana',
    label: 'Solana',
    logo: solana,
  },
  {
    key: 'sui',
    label: 'SUI',
    logo: sui,
  },
  {
    key: 'aptos',
    label: 'Aptos',
    logo: aptos,
  },
  {
    key: 'hedera',
    label: 'Hedera',
    logo: hedera,
  },
]

function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <Row>
      <Col span={24}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[pathname.replace('/', '')]}
        >
          {CHAINS.map((chain) => (
            <Menu.Item
              key={chain.key}
              onClick={() => navigate(`/${chain.key}`)}
            >
              <Space align="center" className="space-middle-icon">
                <img src={chain.logo} height={20} width={30} />
                <Typography.Text>{chain.label}</Typography.Text>
              </Space>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
    </Row>
  )
}

export default Sidebar
