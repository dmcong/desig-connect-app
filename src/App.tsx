import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Rainbowkit from "./rainbowkit";

// eslint-disable-next-line
console.log("phantom", (window as any)?.phantom?.solana + "");
// eslint-disable-next-line
console.log("phantom-->", (window as any)?.phantom);

// eslint-disable-next-line
console.log("desig", (window as any)?.desig + "");
// eslint-disable-next-line
console.log("desig-->", (window as any)?.desig);

// eslint-disable-next-line
console.log("aptos", (window as any)?.aptos + "");
// eslint-disable-next-line
console.log("aptos-->", (window as any)?.aptos);

// eslint-disable-next-line
console.log("ethereum", (window as any)?.ethereum + "");
// eslint-disable-next-line
console.log("ethereum-->", (window as any)?.ethereum);

//887ed79fede9b6ba4a3e6ed1a9ce5606

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
          <Rainbowkit />
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
