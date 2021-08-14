import { NotificationContainer } from "react-notifications"
import UserProfileUI from "./UserProfileUI"
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import React from "react"
import UserAddressForm from "./UserAddressForm"
//import SmallUserAddressForm from "./SmallUserAddressForm";
import ReactDOM from "react-dom"
import ChainProviderContext, {
  ChainProviderSettings,
} from "../common/ChainProviderContext"
import SettingsModal from "./SettingsModal"
import ConnectWallet from "../common/WalletButton"
import SettingsButton from "./SettingsButton"
import Preloader from "../common/Preloader"
import InsultModal from "./InsultModal"

window.onload = () => {
  Preloader(
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming.png?raw=true",
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming_white_border.png?raw=true"
  )
}

window.onload = () => {
  window.location.hash = ""
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
      refreshValue: 1,
    }

    this.handleConnectWallet = this.handleConnectWallet.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleRefresh() {
    this.setState(
      {
        refreshValue: Math.random(),
      },
      () => {
        console.log("refreshed the UserProfileUI")
      }
    )
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
    this.setState((state) => ({
      insultList: value,
      viewing: true,
      searchAddress: state.addressValue,
      refreshValue: state.refreshValue++,
    }))
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
      <ChainProviderContext.Provider value={this.state.provider}>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <header>
            <Navbar>
              <ConnectWallet
                // This is the wallet button.
                className="inline-block bg-red-800 text-sm text-center lg:flex-grow-0 w-full sm:w-48 px-4 py-2 shadow-inner leading-none border rounded text-white border-red-300 hover:text-gray-200 hover:bg-red-600 mt-0 order-3 sm:order-last"
                onClick={this.handleConnectWallet}
              ></ConnectWallet>
              <SettingsButton />
            </Navbar>
          </header>
          <main className="bg-red-700 w-full flex-grow flex flex-col">
            <SettingsModal />

            <div id="notificationContainer">
              <NotificationContainer />
            </div>

            <UserAddressForm
              value={this.state.addressValue}
              onChange={this.onFormChange}
              onSubmit={this.onFormSubmit}
            />
            <br />
            {this.state.viewing && (
              // the "update" prop is because refresh
              <UserProfileUI
                address={this.state.searchAddress}
                refreshValue={this.state.refreshValue}
                handleRefresh={this.handleRefresh}
              />
            )}
          </main>
          <Footer />
        </div>
      </ChainProviderContext.Provider>
    )
  }
}

ReactDOM.render(<App></App>, document.getElementById("root"))
