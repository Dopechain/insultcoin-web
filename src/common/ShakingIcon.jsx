import React from "react"
import PropTypes from "prop-types"

class ShakingIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screaming: false,
    }
    this.shout = this.shout.bind(this)
  }

  shout() {
    console.log("shout called")
    this.setState({
      screaming: true,
    })
    setTimeout(
      function (it) {
        it.setState({
          screaming: false,
        })
      },
      2000,
      this
    )
  }

  getLogo() {
    if (this.state.screaming) {
      return this.props.logoScreaming
    } else {
      return this.props.logo
    }
  }

  getScreamingClasses() {
    if (this.state.screaming) {
      return "shake shake-constant"
    } else {
      return ""
    }
  }
  render() {
    return (
      <div
        className={
          "flex items-end order-first align-baseline text-white " +
          this.getScreamingClasses()
        }
      >
        <button
          className="w-10 h-10 sm:w-6 sm:h-6 flex align-middle"
          onClick={this.shout}
          disabled={this.state.screaming}
        >
          <img src={this.getLogo()} />
        </button>
        <span
          className={
            "font-semibold text-3xl sm:text-xl tracking-tight ml-1 " +
            this.getScreamingClasses()
          }
        >
          {!this.state.screaming && this.props.name}
          {this.state.screaming && this.props.nameScreaming}
        </span>
      </div>
    )
  }
}

ShakingIcon.propTypes = {
  logo: PropTypes.string,
  logoScreaming: PropTypes.string,
  name: PropTypes.string,
  nameScreaming: PropTypes.string,
}

export default ShakingIcon
