import PropTypes from "prop-types"
import React from "react"
import ChainProviderContext from "../common/ChainProviderContext"
import InsultsList from "./InsultsList"
import ProviderWrapper from "../common/ProviderWrapper"
import { FiRefreshCcw } from "react-icons/fi"
import Avatar from "./Avatar"
import delay from "delay"
import { ethers } from "ethers"
import InsultButton from "./InsultButton"
import ErrorMessage from "../common/ErrorMessage"
import InsultModal from "./InsultModal"
import * as FakeInsults from "../common/FakeInsults"
import _ from "lodash"

import Loader from "../common/Loader"
export default class UserProfileUI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      sentInsults: [],
      recvInsults: [],
      balance: ethers.BigNumber.from("0").mul("1000000000000000000"),
      openInsultModal: false,
    }
    this.setInsultAddress = this.setInsultAddress.bind(this)
  }

  async componentDidMount() {
    this.update({})
  }

  async componentDidUpdate(prevProps) {
    this.update(prevProps)
  }

  async update(prevProps) {
    //debugger
    // Only run this IF the current props are not the same as previous props
    if (
      this.props.refreshValue != prevProps.refreshValue ||
      this.props.address != prevProps.address
    ) {
      try {
        this.setState({
          loading: true,
          error: false,
          insultAddress: this.props.address,
        })
        let net = await this.context.provider.getNetwork()

        await delay(500)

        let prov = new ProviderWrapper(this.context.provider, net.chainId)

        this.setState({
          sentInsults: await prov.getSentInsults(this.props.address),
          recvInsults: await prov.getReceivedInsults(this.props.address),
          balance: await prov.getBalance(this.props.address),
        })

        this.setState({
          loading: false,
        })
      } catch (e) {
        console.log("Error caught")
        console.log(e)
        this.setState({
          error: String(e),
          loading: false,
        })
      }
    }
  }

  setInsultAddress(address) {
    this.setState({ insultAddress: address }, () => {
      window.location.href = "#insults"
    })
  }

  render() {
    return (
      <div className="bg-red-800 md:rounded-xl flex-grow-0 mb-5 p-2 md:mx-5">
        {this.state.loading && <Loader />}
        {this.state.error !== false && (
          <ErrorMessage message={this.state.error} />
        )}
        {!this.state.loading && !this.state.error && (
          <>
            <div className="flex flex-row bg-gray-200 rounded my-4 p-5 pt-5 md:mx-5">
              <Avatar
                className="inline h-12 mx-0 flex-shrink-0"
                seed={this.props.address}
                style={{ width: "100px", height: "100px" }}
              />
              <div className="ml-4 w-auto flex flex-col flex-shrink">
                <p className="inline-block text-lg text-black font-semibold align-baseline truncate">
                  {this.props.address}
                </p>
                <p className="inline-block text-lg text-black align-baseline">
                  Total Insults Sent: {this.state.sentInsults.length}
                </p>
                <p className="inline-block text-lg text-black align-baseline">
                  Total Insults Received: {this.state.recvInsults.length}
                </p>
                <p className="inline-block text-lg text-black align-baseline">
                  Balance:{" "}
                  <b className="text-red-700">
                    {ethers.utils.formatEther(this.state.balance)} INSULT
                  </b>
                </p>
              </div>
            </div>
            <div className="flex flex-row bg-gray-200 rounded my-4 p-5 pt-3 md:mx-5">
              <label className="flex flex-col divide-solid divide-y divide-rose-400 gap-y-3">
                <p className="flex uppercase tracking-wide text-black text-sm font-bold">
                  Quick Menu
                </p>
                <div className="flex flex-row md:rounded md:gap-x-3 normal-case font-normal text-red-800 tracking-normal">
                  <InsultButton
                    onClick={() => this.setInsultAddress(this.props.address)}
                    provider={this.context.provider}
                  />
                  <button
                    className="hover:bg-gray-200 normal-case border-red-600 border-2 bg-white rounded md:rounded-md font-bold p-2 px-5 flex-shrink-0"
                    onClick={this.props.handleRefresh}
                  >
                    Refresh <FiRefreshCcw />
                  </button>
                </div>
              </label>
            </div>
            <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-3 m-5">
              <div className="flex-col flex">
                <label
                  className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
                  htmlFor="sentInsults"
                >
                  Sent Insults ({this.state.sentInsults.length})
                </label>
                <div
                  id="sentInsults"
                  className="overflow-y-auto max-h-72 rounded-xl scrollbar scrollbar-thumb-rounded scrollbar-thumb-red-300 scrollbar-track-gray-100"
                >
                  <InsultsList
                    ready={this.readySent}
                    address={this.props.address}
                    type="sent"
                    hidden={true}
                    data={this.state.sentInsults}
                    network="56"
                    insult={this.setInsultAddress}
                  ></InsultsList>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
                  htmlFor="receivedInsults"
                >
                  Received Insults ({this.state.recvInsults.length})
                </label>
                <div
                  id="receivedInsults"
                  className="overflow-y-auto max-h-72 rounded-xl scrollbar scrollbar-thumb-rounded scrollbar-thumb-red-300 scrollbar-track-gray-100"
                >
                  <InsultsList
                    ready={this.readyReceived}
                    address={this.props.address}
                    type="recv"
                    hidden={true}
                    data={this.state.recvInsults}
                    network="56"
                    insult={this.setInsultAddress}
                  ></InsultsList>
                </div>
              </div>
            </div>
            <InsultModal
              address={this.state.insultAddress}
              handleRefresh={this.props.handleRefresh}
            />
          </>
        )}
      </div>
    )
  }
}

UserProfileUI.contextType = ChainProviderContext
UserProfileUI.propTypes = {
  address: PropTypes.string,
  refreshValue: PropTypes.any,
  handleRefresh: PropTypes.func,
}
