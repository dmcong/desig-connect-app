import { fromBech32 } from '@cosmjs/encoding'

export const isCosmosAddress = (address: string, prefix = 'cosmos') => {
  try {
    const decodedAddress = fromBech32(address)
    const { prefix: prefixAddress } = decodedAddress
    // Assuming the Cosmos address prefix is "cosmos"
    return prefixAddress === prefix
  } catch (error) {
    return false // Invalid address format
  }
}
