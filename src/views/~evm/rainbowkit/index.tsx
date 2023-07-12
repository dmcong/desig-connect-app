import '@rainbow-me/rainbowkit/styles.css'
import {
  ConnectButton,
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, zora } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  phantomWallet,
} from '@rainbow-me/rainbowkit/wallets'

import { desigWallet } from './desigWallet'
import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd'

import Rainbow from './rainbow.svg'

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [publicProvider()],
)

const projectId = '887ed79fede9b6ba4a3e6ed1a9ce5606'

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      desigWallet({ chains }),
      phantomWallet({ chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function Rainbowkit() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Row>
          <Col span={24}>
            <Card
              title={
                <Space align="center" className="space-middle-icon">
                  <Avatar src={Rainbow} size={30} shape="square" />
                  <Typography.Text>RainbowKit</Typography.Text>
                </Space>
              }
              className="card-title"
              bordered={false}
              extra={
                <Space size={4}>
                  <Typography.Text>View on</Typography.Text>
                  <Button
                    type="link"
                    onClick={() =>
                      window.open(
                        'https://github.com/dmcong/desig-connect-app/blob/main/src/views/~evm/rainbowkit/index.tsx',
                        '_blank',
                      )
                    }
                    style={{ padding: 0 }}
                  >
                    Github
                  </Button>
                </Space>
              }
            >
              <Row gutter={[8, 12]}>
                <Col span={24}>
                  <ConnectButton />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
