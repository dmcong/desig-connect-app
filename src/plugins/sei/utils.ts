import { SeiTestnet } from '@desig/supported-chains'
import { isCosmosAddress } from 'plugins/cosmos/utils'

export const isSeiAddress = (address: string) => {
  return isCosmosAddress(address, 'sei')
}

export const seiExplorer = (
  addrOrTx: string,
  chainId: string = new SeiTestnet().chainId,
): string => {
  if (!addrOrTx) return ''
  const pathname = isSeiAddress(addrOrTx) ? 'account' : 'transaction'
  return `https://sei.explorers.guru/${pathname}/${addrOrTx}`
}
