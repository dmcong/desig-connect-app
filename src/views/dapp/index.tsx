import { GroupChain } from '@desig/supported-chains'

import { Card, Col, Divider, Row, Space } from 'antd'
import Brand from 'components/brand'
import ChainSelect from 'components/chainSelect'
import ViewOnGithub from 'components/viewOnGithub'
import ProtectedLogin from 'views/protectedLogin'
import Transfer from './transfer'
import WalletInfo from './walletInfo'

export default function DApp({
  groups,
  src,
}: {
  groups: GroupChain[]
  src: string
}) {
  return (
    <Card
      title={
        <Space size={12} align="center" className="space-middle-icon">
          <Brand />
          <ChainSelect groups={groups} />
        </Space>
      }
      className="card-title"
      bordered={false}
      style={{ width: '100%' }}
      extra={<ViewOnGithub src={src} />}
    >
      <ProtectedLogin>
        <Row gutter={[24, 24]}>
          <Col span={11}>
            <WalletInfo />
          </Col>
          <Col span={1}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>

          <Col span={12}>
            <Transfer />
          </Col>
        </Row>
      </ProtectedLogin>
    </Card>
  )
}
