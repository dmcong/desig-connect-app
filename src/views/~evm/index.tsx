import { Col, Row } from 'antd'
import WalletCard from './ethers'
import Rainbowkit from './rainbowkit'

export default function Evms() {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Rainbowkit />
        </Col>
        <Col span={8}>
          <WalletCard />
        </Col>
      </Row>
    </>
  )
}
