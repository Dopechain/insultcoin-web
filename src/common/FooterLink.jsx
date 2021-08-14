/* eslint-disable react/prop-types */
import React from "react"

export default class FooterLink extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <span className="my-2">
        <a
          href={this.props.href}
          className="text-white text-md hover:text-blue-500"
        >
          {this.props.children}
        </a>
      </span>
    )
  }
}
