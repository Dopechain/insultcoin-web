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

  render() {
    return (
      <div>
        <div id="settings" className="modal text-black">
          <div className="modal-box justify-center flex flex-col">
            <h1 className="font-bold text-2xl">Settings</h1>
            <hr className="border-red-700 border-3 my-3" />
            <p>
              None of this data is stored anywhere other than your device&apos;s
              local storage&hellip; if there was any data to store in the first
              place.
            </p>

            <div className="modal-action">
              <a
                href="#"
                className="inline-block bg-red-800 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 hover:bg-red-600 mt-0 order-3 sm:order-last"
              >
                Save and Close
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SettingsModal.contextType = ChainProviderContext
SettingsModal.propTypes = {}
