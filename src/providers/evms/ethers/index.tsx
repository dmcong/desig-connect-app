import { useState } from "react";
import { BrowserProvider } from "ethers";

const avlNetwork: any = {
  137: {
    chainId: `0x${Number(137).toString(16)}`,
    rpcUrls: ["https://rpc-mainnet.matic.network/"],
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  43114: {
    chainId: `0x${Number(43114).toString(16)}`,
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    chainName: "Avalanche C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://snowtrace.io/"],
  },
};

export default function App() {
  const [publicKey, setPublickey] = useState("");
  const [network, setNetwork] = useState("");
  const [chainId, setChainId] = useState("");
  const [msg, setMsg] = useState("");

  const connectButton = async () => {
    if ((window as any)?.desig.ethereum) {
      const provider = new BrowserProvider((window as any)?.desig.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      const { name, chainId } = await provider.getNetwork();

      setNetwork(name);
      setPublickey(accounts[0]);
    } else {
      setMsg("Install MetaMask");
    }
  };

  return (
    <div className="App">
      <h1>Connect MetaMask</h1>
      <button onClick={connectButton}>Connect Wallet</button>
      <br />
      <p>Public Key: {publicKey}</p>
      <p>Network: {network}</p>
      {msg && <p>{msg}</p>}
    </div>
  );
}
