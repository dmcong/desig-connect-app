import { Fragment, PropsWithChildren } from 'react'

import { Result } from 'antd'
import ConnectButton from 'components/connectButton'
import { useWalletStore } from 'providers/wallet.provider'

const ProtectedLogin = ({
  children,
}: PropsWithChildren<{ check?: boolean }>) => {
  const { address } = useWalletStore()
  if (!address)
    return (
      <Result
        status="403"
        title="The wallet is not connected."
        subTitle="Please connect your wallet first to use this feature!"
        extra={<ConnectButton />}
      />
    )

  return <Fragment>{children}</Fragment>
}

export default ProtectedLogin
