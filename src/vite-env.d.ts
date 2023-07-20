/// <reference types="vite/client" />

interface Window {
  ethereum?: any
  braveSolana?: any
  BinanceChain?: any
  desig: {
    ethereum?: any
    binance?: any
    solana?: any
    sui?: any
    aptos?: any
    hedera?: any
    uid?: any
    cosmos?: any
  }
}

type Theme = 'light' | 'dark'
