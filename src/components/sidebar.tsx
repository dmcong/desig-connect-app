import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import Brand from "./brand";

const CHAINS = [
  {
    key: "1",
    label: "EVMs",
  },
  {
    key: "2",
    label: "Solana",
    Content: "This is Solana content",
  },
  {
    key: "3",
    label: "SUI",
    Content: "This is SUI content",
  },
  {
    key: "4",
    label: "Aptos",
    Content: "This is Aptos content",
  },
];

function Sidebar() {
  return (
    <Menu theme="light" mode="inline" style={{ height: "100%" }}>
      {CHAINS.map((chain) => (
        <Menu.Item key={chain.key}>
          <NavLink to={`/${chain.label.toLowerCase()}`}>{chain.label}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default Sidebar;
