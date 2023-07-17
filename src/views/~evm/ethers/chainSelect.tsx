import { GroupChain, chains } from '@desig/supported-chains'
import { Select } from 'antd'
import { useMemo } from 'react'

const ChainSelect = ({
  chainId,
  setChainId,
}: {
  chainId: string
  setChainId: (val: string) => void
}) => {
  const supportedChains = useMemo(() => {
    const acceptedChain = [
      GroupChain.Ethereum,
      GroupChain.Binance,
      GroupChain.Linea,
      GroupChain.Moonbeam,
      GroupChain.Polygon_zkevm,
      GroupChain.Zeta,
    ]
    return Object.values(chains)
      .filter(({ group }) => acceptedChain.includes(group as GroupChain))
      .map(({ chainId, alias }) => ({ value: chainId, label: alias }))
  }, [])

  return (
    <Select
      style={{ width: 200 }}
      options={supportedChains}
      value={chainId ? chainId : undefined}
      placeholder="Select chain"
      onChange={setChainId}
    />
  )
}

export default ChainSelect
