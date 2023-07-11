import { NavLink } from "react-router-dom";
import { Menu } from "antd";

const CHAINS = [
  {
    key: "evm",
    label: "EVM",
  },
  {
    key: "solana",
    label: "Solana",
    Content: "This is Solana content",
  },
  {
    key: "sui",
    label: "SUI",
    Content: "This is SUI content",
  },
  {
    key: "aptos",
    label: "Aptos",
    Content: "This is Aptos content",
  },
  {
    key: "hedera",
    label: "Hedera",
    Content: "This is Aptos content",
  },
];

function Sidebar() {
  return (
    <Menu theme="light" mode="inline" style={{ height: "100%" }}>
      {CHAINS.map((chain) => (
        <Menu.Item key={chain.key}>
          <NavLink to={`/${chain.key}`}>{chain.label}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default Sidebar;
