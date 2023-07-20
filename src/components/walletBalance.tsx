import { useEffect, useState } from 'react'
import { chains } from '@desig/supported-chains'

import { Button, Spin, Typography } from 'antd'

import { useWalletProvider } from 'providers/wallet.provider'
import { useChain } from 'hooks/useChain'

const WalletBalance = () => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState<string>('')
  const walletProvider = useWalletProvider()
  const { chainId } = useChain()

  const chain = chains[chainId]

  const handleGetBalance = async () => {
    try {
      setLoading(true)
      const balance = await walletProvider.getBalance()
      setBalance(balance)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setBalance('')
  }, [chain])

  return (
    <>
      <Spin spinning={loading}>
        <div
          style={{
            background: '#fffbe6',
            border: '1px solid #ffe58f',
            padding: '16px 8px',
            justifyContent: 'center',
            display: 'flex',
            borderRadius: 8,
          }}
        >
          <Typography.Title style={{ color: '#d48806', margin: 0 }}>
            {!balance
              ? '--'
              : `${balance} ${chain.group.toUpperCase().slice(0, 3)}`}
          </Typography.Title>
        </div>
      </Spin>
      <Button block onClick={handleGetBalance} loading={loading}>
        Get Balance
      </Button>
    </>
  )
}

export default WalletBalance
