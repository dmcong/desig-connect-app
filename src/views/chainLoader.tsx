import React, { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Alert } from 'antd'

const ChainLoader = () => {
  const { chain } = useParams()

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export default ChainLoader
