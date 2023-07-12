import { Col, Row } from 'antd'
import WalletCard from './ethers'
import Rainbowkit from './rainbowkit'

export default function Evms() {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xl={12} xs={24}>
          <Rainbowkit />
        </Col>
        <Col xs={24}>
          <WalletCard />
        </Col>
      </Row>
    </>
  )
}
