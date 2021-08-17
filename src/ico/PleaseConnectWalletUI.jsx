import React from "react"

export default class PleaseConnectWalletUI extends React.Component {
  render() {
    return (
      <div className="bg-red-800 md:rounded-xl flex-grow-0 my-3 p-4 md:mx-5">
        <div className="flex flex-row justify-center">
          <p className="text-white">
            Please connect your wallet to buy InsultCoin.
          </p>
        </div>
      </div>
    )
  }
}
