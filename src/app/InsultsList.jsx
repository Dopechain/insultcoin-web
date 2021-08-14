import React from "react"
import Message from "./InsultMessage.jsx"
import PropTypes from "prop-types"
import ChainProviderContext from "../common/ChainProviderContext.js"
import Config from "../common/config"
import { ethers } from "ethers"

export default class InsultsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let d = this.props.data

    let messageList = d.map((elem) => (
      <li key={elem.id}>
        <Message
          sender={elem.sender}
          level={Math.round(
            Number(ethers.utils.formatEther(ethers.BigNumber.from(elem.cost)))
          )}
          message={elem.message}
          id={elem.id}
          insult={this.props.insult}
          receiver={elem.receiver}
          timestamp={elem.timestamp}
          explorer={Config.networks[this.props.network].explorer}
        ></Message>
      </li>
    ))

    return (
      <ul className="space-y-2 flex-col flex justify-items-start lg:mr-5">
        {messageList}
        {messageList.length < 1 && (
          <div className="py-4 px-8 lg:w-96 bg-white rounded-xl shadow-md space-y-2 sm:flex flex-col">
            <h3 className="font-semibold text-lg">
              There doesn&apos;t appear to be anything here&hellip;{" "}
            </h3>
            {this.props.type == "recv" && (
              <p>
                People must like this person a lot to never insult them&hellip;
                or just nobody knows about their existence.
              </p>
            )}
            {this.props.type == "sent" && (
              <p>
                Wow, must be a very nice person, never sent any insults on
                InsultCoin! Or they just don&apos;t use it&hellip;
              </p>
            )}
          </div>
        )}
      </ul>
    )
  }
}

InsultsList.contextType = ChainProviderContext

InsultsList.propTypes = {
  address: PropTypes.string,
  data: PropTypes.array,
  network: PropTypes.string,
  type: PropTypes.string,
  insult: PropTypes.func,
}
