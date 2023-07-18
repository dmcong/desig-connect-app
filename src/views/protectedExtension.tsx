import { Fragment, PropsWithChildren } from 'react'

import { Button, Result } from 'antd'

const ProtectedExtension = ({
  children,
}: PropsWithChildren<{ check?: boolean }>) => {
  if (!window?.desig)
    return (
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
    )

  return <Fragment>{children}</Fragment>
}

export default ProtectedExtension
