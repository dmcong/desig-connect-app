import { Row } from 'antd'
import Transfer from './transfer'
import Connect from './connect'

const Hedera = () => {
  return (
    <Row gutter={[24, 24]}>
      <Connect />
      <Transfer />
    </Row>
  )
}

export default Hedera
