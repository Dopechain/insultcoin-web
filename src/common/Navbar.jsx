import React from "react"
import PropTypes from "prop-types"
import ChainProviderContext from "./ChainProviderContext"
import ShakingIcon from "./ShakingIcon"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <nav className="w-full bg-red-900 flex flex-col gap-y-2 sm:flex-row align-baseline flex-wrap p-6">
        <ShakingIcon
          name={this.props.name || "InsultCoin"}
          nameScreaming={this.props.nameScreaming || "AAAAAGHH!!"}
          logo="https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_white_border.png?raw=true"
          logoScreaming="https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming_white_border.png?raw=true"
        />
        <div
          className="flex flex-col-reverse sm:flex-row-reverse align-baseline sm:items-end sm:justify-items-end
            text-sm
            text-center
            text-white
            mt-0 sm:flex-grow sm:gap-x-2 sm:gap-y-0 gap-y-2"
        >
          {this.props.children}
        </div>
      </nav>
    )
  }
}
Navbar.contextType = ChainProviderContext
Navbar.propTypes = {
  children: PropTypes.node,
  /*logo: PropTypes.string,
  logoScreaming: PropTypes.string,*/
  name: PropTypes.string,
  nameScreaming: PropTypes.string,
}

export default Navbar
