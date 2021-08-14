import { NotificationContainer } from "react-notifications"
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import React from "react"
import ReactDOM from "react-dom"
import Preloader from "../common/Preloader"
import ChainProviderContext, {
  ChainProviderSettings,
} from "../common/ChainProviderContext"
import BuyUI from "./BuyUI"
import WalletButton from "../common/WalletButton"
import FeatureList from "./FeatureList"
import FeatureListItem from "./FeatureCard"

window.onload = () => {
  Preloader(
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming.png?raw=true",
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming_white_border.png?raw=true"
  )
}
export default class App extends React.Component {
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

  setProvider(provider) {
    console.log("provider set to " + provider)
    this.setState({
      provider: {
        setProvider: this.setProvider.bind(this),
        provider,
      },
    })
  }

  async requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" })
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

  render() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <header>
          <Navbar name="InsultCoin ICO"></Navbar>
        </header>
        <main className="bg-red-700 w-full flex-grow flex flex-col">
          <div id="notificationContainer">
            <NotificationContainer />
          </div>
          <div className="bg-red-800 md:rounded-xl flex-grow-0 mb-2 p-2 md:mx-5 mt-5">
            <div className="justify-center content-center items-center flex flex-col text-md text-white">
              <h1 className="text-center text-3xl text-white font-semibold">
                Full List of "Features"
              </h1>
              <hr className="block border-solid border w-5/6 justify-center my-2 border-white" />
              <a
                href="/ico"
                className="text-white hover:text-red-300 underline mb-2"
              >
                Return to the ICO page
              </a>
              <FeatureList>
                <FeatureListItem
                  name="First of its kind"
                  desc="Well at least I don't know any other tokens about insulting people. Except maybe CryptoInsults, but that uses NFTs, so it doesn't count."
                />
                <FeatureListItem
                  name='"The future" of insulting'
                  desc="This token is just.. absolutely stupid, literally, go up to the guy and say the insult to their face! Or use Face..book! Just whatever, this is stupid."
                />
                <FeatureListItem
                  name="Industry-leading crypto"
                  desc="We are the leading coin in the insulting space... because there aren't any others! Now really, just stop and don't buy this crappy coin."
                />
                <FeatureListItem
                  name="Might be secure, definitely not audited"
                  desc="Text copied from UEToken. Our code has NOT passed any security audits, mainly due to the fact I don't have funds to do so, it's one reason why you shouldn't actually buy it."
                />
                <FeatureListItem
                  name="At least you can insult Elon Musk"
                  desc="That's a good thing, right? Because no one likes Elon Musk, as he shook up the crypto markets? Right? Anyone...?"
                />
                <FeatureListItem
                  name="Vesting schedule"
                  desc="Me and my partner have 30% of the token supply combined, vested over 1 year. Yeah, vesting! At least it's better than Polygon (cough 77% owned by centralized group cough)"
                />
                <FeatureListItem
                  name="Cross chain compatibility... soon"
                  desc="I might make InsultCoin for multiple blockchains? Maybe? Dunno man. I really want this project to actually gain some stupid memecoin traction and get me some stacks of cash."
                />
                <FeatureListItem
                  name="Serves only to make me rich"
                  desc="Make me rich and donate me millions! Please do that. I want you to."
                />
              </FeatureList>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App></App>, document.getElementById("root"))
