import React from "react"
import { FaCog } from "react-icons/fa"

import ChainProviderContext from "../common/ChainProviderContext"

// stuff i guess

export default class SettingsModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { checked: false }
  }

  handleChange(checked) {
    this.setState({ checked })
  }

  render(props) {
    return (
      <div>
        <a
          href="#settings"
          className="inline-block bg-red-800 text-sm text-center lg:flex-grow-0 w-full sm:w-48 px-4 py-2 shadow-inner leading-none border rounded text-white border-red-300 hover:text-gray-200 hover:bg-red-600 mt-0 order-2 sm:order-last"
        >
          <FaCog className="align-middle " />{" "}
          <span className="align-middle">Settings</span>
        </a>
      </div>
    )
  }
}

SettingsModal.contextType = ChainProviderContext
SettingsModal.propTypes = {}
