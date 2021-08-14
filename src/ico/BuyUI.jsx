import PropTypes from "prop-types"
import React from "react"
import ChainProviderContext from "../common/ChainProviderContext"
import ProviderWrapper from "../common/ProviderWrapper"
import UIErrorMessage from "../common/ErrorMessage"
import Loader from "../common/Loader"
import ICOStatCard from "./ICOStatCard"
import { ethers } from "ethers"
import formatNumber, { toFixedDown } from "../common/NumberFormat"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Config from "../common/config"

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
  // 69 check
  let balString = String(bal)
  if (balString.includes("69")) {
    return "Nice."
  }

  if (bal > 300) {
    return "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_high_balance.png?raw=true"
  } else if (bal > 5) {
    return "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_medium_balance.png?raw=true"
  } else {
    return "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/icostat_low_balance.png?raw=true"
  }
}

let checker = (input, words) =>
  words.some((word) => input.toLowerCase().includes(word))

export default class BuyUI extends React.Component {
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
    this.update({})
    let net = await this.props.provider.getNetwork()

    let prov = new ProviderWrapper(this.props.provider, net.chainId)

    let contracts = await prov.getContracts()

    contracts.ico.on("TokenBought", (sender, amount, remainingBal) => {
      this.setState({
        icoRemaining: remainingBal,
      })
    })
  }

  async componentDidUpdate(prevProps) {
    this.update(prevProps)
  }

  async update(prevProps) {
    // Only run this IF the current props are not the same as previous props
    if (this.props !== prevProps) {
      try {
        this.setState({
          loading: true,
          error: false,
        })

        // WBNB information
        // https://api.pancakeswap.info/api/v2/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
        let net = await this.props.provider.getNetwork()

        let prov = new ProviderWrapper(this.props.provider, net.chainId)

        let bnbData = await fetch(
          "https://api.pancakeswap.info/api/v2/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
        )

        let BNBjson = await bnbData.json()

        this.setState(
          {
            icoPrice: ethers.BigNumber.from("1000000000000000000").div(
              await prov.getICORate(this.props.address)
            ),
            icoRate: await prov.getICORate(this.props.address),
            icoRemaining: await prov.getICOremaining(this.props.address),
            balance: await prov.getNativeBalance(this.props.address),
            bnbToUSD: Math.round(Number(BNBjson.data.price)),
          },
          async () => {
            let DisplayingErrorMessagesSchema = Yup.object().shape({
              amountToBuy: Yup.number("Not a number")
                .required("Required")
                .positive("You can't get negative tokens!")
                .max(
                  Number(
                    ethers.utils.formatEther(
                      await prov.getNativeBalance(this.props.address)
                    )
                  ) * (await prov.getICORate()),
                  "You don't have that much!"
                ),
            })
            this.setState({
              DisplayingErrorMessagesSchema,
              loading: false,
            })
          }
        )
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
          <UIErrorMessage message={this.state.error} />
        )}
        {!this.state.loading && !this.state.error && (
          <div className="flex flex-row justify-center">
            <Formik
              validateOnBlur
              validationSchema={this.state.DisplayingErrorMessagesSchema}
              initialValues={{
                amountToBuy: 0,
              }}
              onSubmit={async ({ amountToBuy }) => {
                amountToBuy = String(amountToBuy)
                let p = new ProviderWrapper(
                  this.props.provider,
                  (await this.props.provider.getNetwork()).chainId
                )

                p.buyICO(
                  ethers.utils
                    .parseUnits(amountToBuy, "ether")
                    .div(this.state.icoRate)
                )
              }}
            >
              {({ handleChange, handleSubmit, setFieldValue, values }) => (
                <div className="justify-center bg-white rounded-xl p-4 md:w-2/3 w-full">
                  <Form className="flex flex-col">
                    <h1 className="font-bold text-2xl">Insult</h1>
                    <hr className="border-red-700 border-3 my-3" />
                    <div className="mb-6 flex flex-col gap-y-2">
                      <label>
                        <p className="block text-gray-700 text-base mb-2">
                          How many tokens do you want to buy?
                        </p>
                        <div className="flex flex-row gap-x-2">
                          <Field
                            name="amountToBuy"
                            className="shadow appearance-none border border-red-500 rounded w-2/3 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="text"
                          />
                          <button
                            onClick={() =>
                              setFieldValue(
                                "amountToBuy",
                                // icoPrice = 0.001 BNB (1000000000000000)
                                // example balance = 1000 BNB (1000000000000000000000)
                                toFixedDown(
                                  Number(
                                    ethers.utils.formatEther(this.state.balance)
                                  ) * this.state.icoRate,
                                  5
                                )
                              )
                            }
                            type="button"
                            className="shadow appearance-none border w-1/3 bg-white hover:bg-gray-200 border-red-500 rounded py-2 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                          >
                            MAX
                          </button>
                        </div>

                        <ErrorMessage
                          name="amountToBuy"
                          className="text-sm tracking-tight text-red-800 mt-1"
                          component="div"
                        />

                        {isNaN(values.amountToBuy) == false &&
                          values.amountToBuy <=
                            Number(
                              ethers.utils.formatEther(this.state.icoRemaining)
                            ) &&
                          values.amountToBuy / this.state.icoRate <=
                            Number(
                              ethers.utils.formatEther(this.state.balance)
                            ) &&
                          this.state.bnbToUSD !== undefined && (
                            <p
                              className="text-sm tracking-tight text-black mt-1 block"
                              aria-live="polite"
                            >
                              This will cost you{" "}
                              {(
                                values.amountToBuy / this.state.icoRate
                              ).toFixed(4)}{" "}
                              BNB, which is approximately{" "}
                              {ethers.utils.commify(
                                (
                                  (values.amountToBuy / this.state.icoRate) *
                                  this.state.bnbToUSD
                                ).toFixed(2)
                              )}{" "}
                              US dollars.
                            </p>
                          )}
                      </label>
                      <button
                        type="submit"
                        className="inline-block bg-red-800 w-full text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 hover:bg-red-600 mt-0 order-3 sm:order-last"
                      >
                        Buy
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        )}
      </div>
    )
  }
}

BuyUI.contextType = ChainProviderContext
BuyUI.propTypes = {
  address: PropTypes.string,
  provider: PropTypes.object,
}
