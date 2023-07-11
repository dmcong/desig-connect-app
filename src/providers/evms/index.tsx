import WalletCard from "./ethers";
import Rainbowkit from "./rainbowkit";

export default function Evms() {
  return (
    <>
      <div className="evms">
        <Rainbowkit />
        <WalletCard />
      </div>
    </>
  );
}
