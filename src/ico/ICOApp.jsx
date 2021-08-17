import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import React from "react"
import ReactDOM from "react-dom"
import Preloader from "../common/Preloader"
import ChainProviderContext, {
  ChainProviderSettings,
} from "../common/ChainProviderContext"
import PleaseConnectWalletUI from "./PleaseConnectWalletUI"
import BuyUI from "./BuyUI"
import WalletButton from "../common/WalletButton"
import FeatureList from "./FeatureList"
import FeatureListItem from "./FeatureCard"
import ICOStats from "./ICOStats"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import ErrorMessage from "../common/ErrorMessage"
import ProviderWrapper from "../common/ProviderWrapper"

window.onload = () => {
  Preloader(
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming.png?raw=true",
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming_white_border.png?raw=true"
  )
}
export default class ICOApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      provider: {
        setProvider: this.setProvider.bind(this),
        provider: ChainProviderSettings.defaultProvider,
      },
      addressValue: "",
      viewing: false,
    }

    this.handleConnectWallet = this.handleConnectWallet.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  setProvider(provider) {
    this.setState({
      provider: {
        setProvider: this.setProvider.bind(this),
        provider,
      },
    })
  }

  onFormSubmit(value) {
    this.setState({
      insultList: value,
      viewing: true,
      searchAddress: this.state.addressValue,
    })
  }
  onFormChange(value) {
    this.setState({
      addressValue: value,
    })
  }

  handleConnectWallet(value) {
    this.setState({
      provider: value,
    })
  }

  async componentDidMount() {
    let web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: {}, // required
    })

    if (web3Modal.cachedProvider) {
      let prov = new ethers.providers.Web3Provider(await web3Modal.connect())

      let chainId = (await prov.getNetwork()).chainId
      let wprov = new ProviderWrapper(prov, chainId)

      let tokenAddr = (await wprov.getContracts()).token.address
      console.log("address of token: " + tokenAddr)
      this.setProvider(prov)
      this.setState({
        address: await prov.getSigner().getAddress(),
      })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.provider.provider.constructor.name == "Web3Provider" &&
      this.state.provider.provider !== prevState.provider.provider
    ) {
      let prov = this.state.provider.provider

      let chainId = (await prov.getNetwork()).chainId
      let wprov = new ProviderWrapper(prov, chainId)

      let tokenAddr = (await wprov.getContracts()).token.address
      console.log("address of token: " + tokenAddr)
      this.setProvider(prov)
      this.setState({
        address: await prov.getSigner().getAddress(),
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col min-h-screen bg-gray-900">
          <header>
            <Navbar name="InsultCoin ICO"></Navbar>
          </header>
          <main className="bg-red-700 w-full flex-grow flex flex-col">
            <div className="bg-red-800 md:rounded-xl flex-grow-0 mb-2 p-2 md:mx-5 mt-5">
              <div className="justify-center content-center items-center flex flex-col text-md text-white">
                <ErrorMessage
                  message={
                    this.state.error +
                    " Please report this to the developer by opening a GitHub issue."
                  }
                />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      )
    }
    return (
      <ChainProviderContext.Provider value={this.state.provider}>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <header>
            <Navbar name="InsultCoin ICO">
              <WalletButton
                // This is the wallet button.
                className="inline-block bg-red-800 text-sm text-center lg:flex-grow-0 w-full sm:w-48 px-4 py-2 shadow-inner leading-none border rounded text-white border-red-300 hover:text-gray-200 hover:bg-red-600 mt-0 order-3 sm:order-last"
                onClick={this.handleConnectWallet}
              />
            </Navbar>
          </header>
          <main className="bg-red-700 w-full flex-grow flex flex-col">
            <div className="bg-red-800 md:rounded-xl flex-grow-0 mb-2 p-2 md:mx-5 mt-5">
              <div className="justify-center content-center items-center flex flex-col text-md text-white">
                <h1 className="text-center text-3xl text-white font-semibold">
                  InsultCoin is the future of insulting.
                </h1>
                <p className="text-center">
                  Or at least, that's what the hype is all about. If there is
                  hype. Please, for the sake of your own money, don't actually
                  buy this. But... I <i>do</i> earn money from you buying it
                  so...
                </p>
                <br className="my-3" />
                <h2 className="text-center text-2xl text-white">"Features"</h2>
                <hr className="block border-solid border w-5/6 justify-center my-2 border-white" />
                <FeatureList>
                  <FeatureListItem
                    name='"The future" of insulting'
                    desc="This token is just.. absolutely stupid, literally, go up to the guy and say the insult to their face! Or use Facebook or some app! Just whatever, this is stupid."
                  />
                  <FeatureListItem
                    name="Industry-leading crypto"
                    desc="We are the leading coin in the insulting space... because there aren't any others! Now really, just stop and don't buy this crappy coin."
                  />
                  <FeatureListItem
                    name="Might be secure, definitely not audited"
                    desc="Text copied from UEToken. Our code has NOT passed any security audits, mainly due to the fact I don't have funds to do so, it's one reason why you shouldn't actually buy it."
                  />
                </FeatureList>
              </div>
            </div>

            {this.state.provider.provider && (
              <ICOStats
                provider={this.state.provider.provider}
                address={this.state.address}
              />
            )}
            {this.state.provider.provider.constructor.name ==
              "Web3Provider" && (
              <BuyUI
                provider={this.state.provider.provider}
                address={this.state.address}
              />
            )}
            {this.state.provider.provider.constructor.name !==
              "Web3Provider" && <PleaseConnectWalletUI />}
          </main>
          <Footer />
        </div>
      </ChainProviderContext.Provider>
    )
  }
}

ReactDOM.render(<ICOApp />, document.getElementById("root"))
