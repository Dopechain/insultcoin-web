import React from "react"
import "reactjs-popup/dist/index.css"
import { FaWallet } from "react-icons/fa"
import PropTypes from "prop-types"
import { ethers } from "ethers"

import Web3Modal from "web3modal"
import ChainProviderContext, {
  ChainProviderSettings,
} from "./ChainProviderContext"

// stuff i guess

const providerOptions = {
  /*walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "1a943a7552014ea9b8461fa0c7819a05", // required
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      },
    },
  },*/
}

export default class WalletModal extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = {
      disabled: false,
    }
  }

  async onClick() {
    try {
      let web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      })

      let ctx = this.context

      this.setState({
        disabled: true,
      })

      let p = await web3Modal.connect()

      this.setState({
        disabled: false,
      })

      const ethersProvider = new ethers.providers.Web3Provider(p)

      if (ctx.provider == ChainProviderSettings.defaultProvider) {
        ctx.setProvider(ethersProvider)
        console.log(`Context: set provider`)
      } else {
        await web3Modal.clearCachedProvider()
        ctx.setProvider(ChainProviderSettings.defaultProvider)
        console.log(`Unset context`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <button
        className={this.props.className}
        onClick={this.onClick}
        disabled={this.state.disabled}
      >
        {this.props.children}
        <FaWallet className="align-middle react-icon" />{" "}
        <span className="align-middle">
          {this.context.provider != ChainProviderSettings.defaultProvider &&
            "Disconnect Wallet"}
          {this.context.provider == ChainProviderSettings.defaultProvider &&
            "Connect Wallet"}
        </span>
      </button>
    )
  }
}

WalletModal.contextType = ChainProviderContext

WalletModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
}
