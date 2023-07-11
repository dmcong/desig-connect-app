import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora, bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { desigWallet } from "./desigWallet";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, bsc],
  [publicProvider()]
);

const projectId = "887ed79fede9b6ba4a3e6ed1a9ce5606";

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   projectId,
//   chains,
// });

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      desigWallet({ chains }),
      phantomWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Rainbowkit() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ConnectButton label="Rainbow" />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
