import React, { useState } from 'react'
import Transfer from './transfer'
import Connect from './connect'

const Hedera = () => {
  const [accountId, setAccountId] = useState('')

  return (
    <div>
      Hedera
      <Connect />
      <Transfer />
    </div>
  )
}

export default Hedera
