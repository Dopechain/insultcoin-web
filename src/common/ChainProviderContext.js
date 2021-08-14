import React from "react"
import { ethers } from "ethers"

export let ChainProviderSettings = {
  defaultProvider: new ethers.providers.JsonRpcProvider(
    "http://localhost:8545",
    {
      chainId: 31337,
    }
  ),
}

export default React.createContext({
  defaultProvider: ChainProviderSettings.defaultProvider,
  provider: false,
  setProvider: () => {},
})
