import PropTypes from "prop-types"
import React from "react"
import ChainProviderContext from "../common/ChainProviderContext"
import ProviderWrapper from "../common/ProviderWrapper"
import ErrorMessage from "../common/ErrorMessage"
import Loader from "../common/Loader"
import ICOStatCard from "./ICOStatCard"
import { ethers } from "ethers"
import formatNumber from "../common/NumberFormat"

function getBalanceText(bal) {
  bal = Number(bal)
  // 69 check
  let balString = String(bal)
  if (balString.includes("69")) {
    return "Nice."
  }

  if (bal > 300) {
    return "That's a whole lot of coins, woah!"
  } else if (bal > 5) {
    return "Pretty cool."
  } else {
    return "You should really consider buying some."
  }
}

function getBalanceLogo(bal) {
  bal = Number(bal)

  if (bal > 300) {
    return "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_high_balance.png?raw=true"
  } else if (bal > 5) {
    return "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_mid_balance.png?raw=true"
  } else {
    return "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_low_balance.png?raw=true"
  }
}

export default class ICOStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      sentInsults: [],
      recvInsults: [],
      icoPrice: ethers.BigNumber.from("1000000000000000000"),
      icoRemaining: ethers.BigNumber.from("0"),
      balance: ethers.BigNumber.from("0"),
    }
  }

  async componentDidMount() {
    let net = await this.props.provider.getNetwork()

    let prov = new ProviderWrapper(this.props.provider, net.chainId)

    let contracts = await prov.getContracts()

    contracts.ico.on("TokenBought", (sender, amount, remainingBal) => {
      this.setState({
        icoRemaining: remainingBal,
      })
    })

    this.update({})
  }

  async componentDidUpdate(prevProps) {
    this.update(prevProps)
  }

  async update(prevProps) {
    // Only run this IF the current props are not the same as previous props
    if (this.props.provider !== prevProps.provider) {
      try {
        this.setState({
          loading: true,
          error: false,
        })
        let net = await this.props.provider.getNetwork()

        let prov = new ProviderWrapper(this.props.provider, net.chainId)

        this.setState({
          icoPrice: ethers.BigNumber.from("1000000000000000000").div(
            await prov.getICORate(this.props.address)
          ),
          icoRemaining: await prov.getICOremaining(this.props.address),
          balance: await prov.getBalance(this.props.address),
        })

        this.setState({
          loading: false,
        })
      } catch (e) {
        console.error(e)
        this.setState({
          error: String(e),
          loading: false,
        })
      }
    }
  }

  render() {
    return (
      <div className="bg-red-800 md:rounded-xl flex-grow-0 my-3 p-4 md:mx-5">
        {this.state.loading && <Loader />}
        {this.state.error !== false && (
          <ErrorMessage message={this.state.error} />
        )}
        {!this.state.loading && !this.state.error && (
          <div className="flex flex-col md:flex-row gap-x-3 gap-y-3 justify-center justify-items-stretch">
            <ICOStatCard
              image="https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_price_image.png?raw=true"
              name="Price"
            >
              {this.state.icoRemaining !== "0.0" && (
                <p>
                  You can buy <b className="text-red-800">1 INSULT</b> for{" "}
                  <b className="text-yellow-600">
                    {ethers.utils.formatEther(this.state.icoPrice)} BNB
                  </b>{" "}
                  from the ICO.
                </p>
              )}
              {this.state.icoRemaining == "0.0" && (
                <p>
                  You could have bought <b className="text-red-800">1 INSULT</b>{" "}
                  for{" "}
                  <b className="text-yellow-600">
                    {ethers.utils.formatEther(this.state.icoPrice)} BNB
                  </b>{" "}
                  from the ICO, but now it's over.
                </p>
              )}
            </ICOStatCard>
            <ICOStatCard
              image="https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_remaining_image.png?raw=true"
              name="Tokens Left"
            >
              {this.state.icoRemaining !== "0.0" && (
                <p>
                  There are{" "}
                  <b className="text-red-800">
                    {ethers.utils.commify(
                      ethers.utils.formatEther(this.state.icoRemaining)
                    )}{" "}
                    INSULT
                  </b>{" "}
                  remaining up for grabs!
                </p>
              )}
              {this.state.icoRemaining == "0.0" && (
                <p>
                  Sorry, but there are no more InsultCoins left up for grabs.
                </p>
              )}
            </ICOStatCard>
            <ICOStatCard
              image={getBalanceLogo(
                Number(ethers.utils.formatUnits(this.state.balance, "ether"))
              )}
              name="Your Balance"
            >
              <p>
                You have{" "}
                <b className="text-red-800">
                  {ethers.utils.commify(
                    ethers.utils.formatEther(this.state.balance)
                  )}{" "}
                  INSULT
                </b>{" "}
                in your wallet.{" "}
                {getBalanceText(ethers.utils.formatEther(this.state.balance))}
              </p>
            </ICOStatCard>
          </div>
        )}
      </div>
    )
  }
}

ICOStats.contextType = ChainProviderContext
ICOStats.propTypes = {
  address: PropTypes.string,
  provider: PropTypes.object,
}
