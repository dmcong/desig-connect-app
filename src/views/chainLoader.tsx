import React, { Suspense, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Alert } from 'antd'
import { useChain } from 'hooks/useChain'
import { useWalletStore } from 'providers/wallet.provider'

const ChainLoader = () => {
  const { chain } = useParams()
  const { setChainId } = useChain()
  const { setWalletAddress } = useWalletStore()

  const Component = useMemo(() => {
    return React.lazy(() =>
      import(`./~${chain}/index.tsx`).catch((e) => ({
        default: () => (
          <Alert
            message={`Unsupported chain: ${chain}`}
            showIcon
            description={e.message}
            type="error"
          />
        ),
      })),
    )
  }, [chain])

  useEffect(() => {
    if (chain) {
      setChainId('')
      setWalletAddress('')
    }
  }, [chain, setChainId, setWalletAddress])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export default ChainLoader
