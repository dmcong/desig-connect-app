import { Col, Row } from "antd";
import WalletCard from "./ethers";
import Rainbowkit from "./rainbowkit";

export default function Evms() {
  return (
    <>
      <div className="evms">
        <WalletCard />
      </div>
      <Row justify="space-around">
        <Col span={4}>
          <Rainbowkit />
        </Col>
        <Col span={4}>
          <Rainbowkit />
        </Col>
      </Row>
    </>
  );
}
