import React from "react"
import PropTypes from "prop-types"

export default class UserAddressField extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="flex flex-col">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-first-name"
        >
          An Ethereum address
        </label>
        <div className="flex flex-col md:flex-row mb-4">
          <input
            className="appearance-none block md:inline-block flex-grow bg-gray-200 text-gray-700 border border-red-500 rounded-t-xl md:rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder="0xDEADBEEF0019AE71F8A1DD..."
          />
          <input
            className="appearance-none block md:inline-block w-full md:w-1/5 bg-gray-200 text-gray-700 border border-red-500 rounded-b-xl md:rounded-xl px-4 py-3 md:ml-3 leading-tight focus:outline-none focus:bg-white"
            type="submit"
            //onClick={this.props.onSubmit}
            value="View"
          />
        </div>
      </div>
    )
  }
}

UserAddressField.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}
