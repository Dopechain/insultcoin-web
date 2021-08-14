import React from "react"
import PropTypes from "prop-types"

export default class ErrorMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="flex flex-auto flex-col text-center justify-center items-center">
        <img
          src="https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming_with_hands.png?raw=true"
          alt="Loading"
          width="100"
          height="100"
          className="block mb-3 mt-5 shake shake-constant"
        ></img>
        <h1 className="font-semibold text-2xl text-center my-3 text-white block">
          AAAARGH!!
        </h1>
        <h2 className="font-semibold text-xl text-center my-3 text-white block">
          We&apos;re sorry, an error happened while trying to show you your
          data.
        </h2>
        <p className="text-sm text-center mb-3 text-white block">
          {this.props.message}
          {this.props.children}
        </p>
      </div>
    )
  }
}

ErrorMessage.propTypes = {
  children: PropTypes.element,
  message: PropTypes.string,
}
