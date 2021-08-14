import React from "react"
import PropTypes from "prop-types"
import { FaRegAngry } from "react-icons/fa"

// stuff i guess

export default class InsultButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <button
        onClick={() => {
          window.location.hash = "#insults"
          this.props.onClick()
        }}
        disabled={this.props.provider.constructor.name == "JsonRpcProvider"}
        className={
          "normal-case border-red-600 border-2 bg-white rounded md:rounded-md font-bold p-2 px-5 flex-shrink-0 " +
          (this.props.provider.constructor.name == "JsonRpcProvider"
            ? "bg-gray-200 border-red-700 cursor-not-allowed"
            : "")
        }
        title={
          this.props.provider.constructor.name == "JsonRpcProvider"
            ? "Connect your wallet to insult."
            : undefined
        }
      >
        <span className="align-middle text-center">
          Insult them! <FaRegAngry className="text-red-700" />
        </span>
      </button>
    )
  }
}

InsultButton.propTypes = {
  onClick: PropTypes.func,
  provider: PropTypes.object,
}
