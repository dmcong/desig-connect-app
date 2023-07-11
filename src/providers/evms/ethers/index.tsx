import { useState } from "react";
import { BrowserProvider, ethers } from "ethers";

export default function App() {
  const [publicKey, setPublickey] = useState("");
  const [network, setNetwork] = useState("");
  const [chainId, setChainId] = useState("");
  const [msg, setMsg] = useState("");

  const connectButton = async () => {
    if ((window as any)?.desig.ethereum) {
      const provider = new BrowserProvider((window as any)?.desig.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      const { name } = await provider.getNetwork();

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
