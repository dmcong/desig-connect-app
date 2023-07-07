import { InjectedConnector } from "wagmi/connectors/injected";
import { Chain, Wallet } from "@rainbow-me/rainbowkit";

export interface BraveWalletOptions {
  chains: Chain[];
}

type InjectedConnectorOptions = {
  /** Name of connector */
  name?: string | ((detectedName: string | string[]) => string);
  /**
   * [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Provider to target
   *
   * @default
   * () => typeof window !== 'undefined' ? window.ethereum : undefined
   */
  getProvider?: () => any;
  /**
   * MetaMask and other injected providers do not support programmatic disconnect.
   * This flag simulates the disconnect behavior by keeping track of connection status in storage. See [GitHub issue](https://github.com/MetaMask/metamask-extension/issues/10353) for more info.
   * @default true
   */
  shimDisconnect?: boolean;
};

export const DesigWallet = ({ chains, ...options }: BraveWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: "desig",
  name: "desig",
  iconUrl: "",
  iconBackground: "#fff",
  // eslint-disable-next-line
  installed: true,
  downloadUrls: {
    // We're opting not to provide a download prompt if Brave isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },

  createConnector: () => {
    const getProvider = (): any => {
      console.log("first");
      // eslint-disable-next-line
      return typeof window !== "undefined" ? ((window as any).desig as any)?.ethereum : undefined;
    };

    const connector = new InjectedConnector({
      chains,
      options: { getProvider, ...options },
    });

    return {
      connector,
      extension: {
        instructions: {
          steps: [
            {
              description: "We recommend pinning Phantom to your taskbar for easier access to your wallet.",
              step: "install",
              title: "Install the Phantom extension",
            },
            {
              description: "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone.",
              step: "create",
              title: "Create or Import a Wallet",
            },
            {
              description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
              step: "refresh",
              title: "Refresh your browser",
            },
          ],
          learnMoreUrl: "https://help.phantom.app",
        },
      },
    };
  },
});
