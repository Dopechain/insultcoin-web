import PropTypes from "prop-types"
import React from "react"
import { NotificationManager } from "react-notifications"
import ShortcutsMenuItem from "./ShortcutMenuItem"
import AddressConfig from "./ShortcutAddressConfig"
import ChainProviderContext, {
  ChainProviderSettings,
} from "../common/ChainProviderContext"

class ShortcutsMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 xl:grid-cols-5 2xl:grid-cols-7">
        <ShortcutsMenuItem
          onClick={() => this.shortcut("paste")}
          name="Paste"
        />
        <ShortcutsMenuItem
          onClick={() => this.shortcut(AddressConfig.CAKE, "PancakeSwap Token")}
          name="PancakeSwap Token"
        />
        <ShortcutsMenuItem
          onClick={() => this.shortcut(AddressConfig.WBNB, "WBNB Token")}
          name="WBNB Token"
        />
        <ShortcutsMenuItem
          onClick={() => this.shortcut(AddressConfig.ZERO, "the 0x0 address")}
          name="0x0 Address"
        />
        {this.context.provider !== ChainProviderSettings.defaultProvider && (
          <ShortcutsMenuItem
            onClick={async () => {
              let accs = await this.context.provider.getSigner().getAddress()
              this.shortcut(accs, "your wallet's address")
            }}
            name="Wallet Address"
          />
        )}
      </div>
    )
  }

  change(value) {
    // hack but ok
    this.props.onChange({
      target: {
        value,
      },
    })
  }

  async shortcut(value, display) {
    let text
    if (value == "paste") {
      text = await navigator.clipboard.readText()
      NotificationManager.success(
        "You have successfully pasted the address from your clipboard!",
        "Successfully set address"
      )
    } else {
      text = value
      NotificationManager.success(
        `You have successfully set the address to ${display}!`,
        "Successfully set address"
      )
    }
    this.change(text || this.props.value)
  }
}
ShortcutsMenu.contextType = ChainProviderContext

ShortcutsMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ShortcutsMenu
