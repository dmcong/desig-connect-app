import { useEffect, useMemo } from 'react'
import { GroupChain, chains } from '@desig/supported-chains'
import { Avatar, Select, Space } from 'antd'

import { useChain } from 'hooks/useChain'
import { useQuery } from 'hooks/useQuery'
import { useWalletProvider, useWalletStore } from 'providers/wallet.provider'

const ChainSelect = (props: { groups: GroupChain[] }) => {
  const { chainId, setChainId } = useChain()
  const { address, setWallet } = useWalletStore()
  const wallet = useWalletProvider()
  const query = useQuery()

  const defaultChainId = query.get('defaultChainId')

  const supportedChains = useMemo(() => {
    return Object.values(chains)
      .filter(({ group }) => props.groups.includes(group as GroupChain))
      .map(({ chainId, alias, icon }) => ({
        value: chainId,
        label: (
          <Space>
            <Avatar src={icon} size={20} />
            {alias}
          </Space>
        ),
      }))
  }, [props.groups])

  const handleSwitchChain = async (chainId: string) => {
    if (address) {
      const { address } = await wallet.switchChain(chainId)
      const balance = await wallet.getBalance()
      setWallet({ address, balance })
    }
    setChainId(chainId)
  }

  useEffect(() => {
    if (!chainId) {
      if (defaultChainId) setChainId(defaultChainId)
      else setChainId(supportedChains[0].value)
    }
  }, [chainId, defaultChainId, query, setChainId, supportedChains])

  return (
    <Select
      style={{ width: 200 }}
      size="large"
      options={supportedChains}
      value={chainId ? chainId : undefined}
      placeholder="Select chain"
      onChange={handleSwitchChain}
    />
  )
}

export default ChainSelect
