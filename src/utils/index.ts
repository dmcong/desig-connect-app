import BN from 'bn.js'

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
