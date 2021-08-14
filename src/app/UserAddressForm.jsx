import PropTypes from "prop-types"
import React from "react"
import { NotificationManager } from "react-notifications"
import ShortcutsMenu from "./ShortcutsMenu"
import UserAddressField from "./UserAddressField"
import { utils } from "ethers"
import InsultModal from "./InsultModal"

export default class UserAddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.props.onChange(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    let val = this.validateForm(this.props.value)
    if (val !== false) {
      this.props.onSubmit(val)
    }
  }

  render() {
    return (
      <form
        className="w-full sm:mt-3"
        onSubmit={this.handleSubmit}
        name="myForm"
      >
        <div className="flex flex-wrap sm:mx-3 mb-6 bg-gray-200 p-8 sm:rounded-xl">
          <div className="w-full px-3 mb-6 md:mb-0">
            <UserAddressField
              onChange={this.handleChange}
              //onSubmit={this.handleSubmit}
              value={this.props.value}
            />

            <hr />
            <ShortcutsMenu onChange={this.handleChange} />
          </div>
        </div>
      </form>
    )
  }

  validateForm(address) {
    try {
      if (utils.getAddress(address)) {
        console.log("Validation passed.")
        return utils.getAddress(address)
      } else {
        console.log("Validation failed.")
        NotificationManager.error(
          "Please double-check the address and try again.",
          "Invalid Address"
        )
        return false
      }
    } catch (e) {
      console.log(e)
      NotificationManager.error(
        "Please double-check the address and try again.",
        "Invalid Address"
      )
      return false
    }
  }
}

UserAddressForm.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}
