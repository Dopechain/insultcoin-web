import React from "react"
import { ethers } from "ethers"

export let ChainProviderSettings = {
  defaultProvider: new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/",
    {
      chainId: 56,
    }
  ),
}

export default React.createContext({
  defaultProvider: ChainProviderSettings.defaultProvider,
  provider: false,
  setProvider: () => {},
  connected: false,
})
