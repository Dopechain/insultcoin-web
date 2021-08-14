import React from "react"
import PropTypes from "prop-types"

export default class ShortcutsMenuItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <button
        type="button"
        className="border-black border-2 bg-white rounded md:rounded-xl font-bold p-2 flex-shrink-0"
        onClick={this.props.onClick}
      >
        {this.props.name}
        {this.props.children}
      </button>
    )
  }
}

ShortcutsMenuItem.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  children: PropTypes.element,
}
