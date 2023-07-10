import { Content } from "antd/es/layout/layout";
import Rainbowkit from "./rainbowkit";

export default function Evms() {
  return (
    <>
      <div className="evms">
        <ul>
          <li>
            Rainbow Wallet
            <Rainbowkit />
          </li>
          <li>MetaMask Wallet</li>
        </ul>
      </div>
    </>
  );
}
