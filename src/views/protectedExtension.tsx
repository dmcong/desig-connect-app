import { Fragment, PropsWithChildren, useEffect, useState } from 'react'

import { Button, Result, Spin } from 'antd'

const ProtectedExtension = ({
  children,
}: PropsWithChildren<{ check?: boolean }>) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  if (!window?.desig)
    return (
      <Spin spinning={loading}>
        <Result
          status="403"
          title="Desig Extension has not been installed."
          subTitle="Please install Desig Extension first to use this feature!"
          extra={
            <Button
              type="primary"
              onClick={() =>
                window.open(
                  'https://chrome.google.com/webstore/detail/desig-wallet/panpgppehdchfphcigocleabcmcgfoca?hl=en',
                  '_blank',
                )
              }
            >
              Install Now
            </Button>
          }
        />
      </Spin>
    )

  return <Fragment>{children}</Fragment>
}

export default ProtectedExtension
