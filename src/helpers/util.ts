import { decode } from 'bs58'
import BN from 'bn.js'

/**
 * Delay by async/await
 * @param ms - milisenconds
 * @returns
 */
export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Validate Desig address
 * @param address Desig address
 * @returns true/false
 */
export const isAddress = (address: string | undefined): address is string => {
  if (!address) return false
  try {
    const buf = decode(address)
    if (!buf || !buf.length) throw new Error('Invalid address')
    return true
  } catch (er) {
    return false
  }
}

/**
 * Shorten a long address
 * @param address - The long address
 * @param num - The number of the heading and trailing characters
 * @param delimiter - The delimiter
 * @returns Shortened address
 */
export const shortenAddress = (address: string, num = 4, delimiter = '...') => {
  return (
    address.substring(0, num) +
    delimiter +
    address.substring(address.length - num, address.length)
  )
}

export const decimalize = (n: string, decimals: number): BN => {
  const [emphasis, correctness] = hydrateFloat(n)
  const _ten = new BN(10)
  return emphasis
    .mul(_ten.pow(new BN(decimals)))
    .div(_ten.pow(new BN(correctness)))
}

/**
 * Hydrate a float to a big int & its decimals
 * @param n The float
 * @returns [BN, decimals]
 */
export const hydrateFloat = (n: string | number): [BN, number] => {
  const ten = new BN(10)
  const m = n.toString()
  const [int, dec] = m.split('.')
  const correctness = (dec || '').length
  const emphasis = new BN(int)
    .mul(ten.pow(new BN(correctness)))
    .add(new BN(dec || '0'))
  return [emphasis, correctness]
}

/**
 * Composite a big int & its decimals to a float
 * @param emphasis The big int
 * @param correctness The decimals
 * @returns The float
 */
export const compositeFloat = (emphasis: BN, correctness: number): string => {
  const ten = new BN(10)
  const a = emphasis.div(ten.pow(new BN(correctness)))
  const b = emphasis.sub(a.mul(ten.pow(new BN(correctness))))
  const int = a.toString()
  let dec = b.toString()
  while (dec.length < correctness) dec = '0' + dec
  return int + '.' + dec
}

export const isValidUrl = (path: string) => {
  let url
  try {
    url = new URL(path)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const getTxExpiredTime = async () => {
  // TODO: get tx expired time with multisigId
  const msPerDay = 1000 * 60 * 60 * 24
  return msPerDay * 30
}
