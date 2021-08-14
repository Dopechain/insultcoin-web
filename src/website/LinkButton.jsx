import React from "react"
import PropTypes from "prop-types"

export default class LinkButton extends React.Component {
  render() {
    return (
      <a href={this.props.href} className={this.props.className}>
        {this.props.text}
        {this.props.children}
      </a>
    )
  }
}

LinkButton.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
