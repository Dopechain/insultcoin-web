import React from "react"
import LoadingTips from "./config/LoadingTip"

export default class Loader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingTip: LoadingTips.rand(),
    }
  }
  componentDidMount() {
    this.messageSetter = setInterval(() => {
      let randMsg = LoadingTips.rand()
      this.setState({
        loadingTip: randMsg,
      })
    }, 10000)
  }
  componentWillUnmount() {
    clearInterval(this.messageSetter)
  }
  render() {
    return (
      <div className="flex flex-auto flex-col text-center justify-center items-center">
        <img
          src="https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming.png?raw=true"
          alt=""
          width="100"
          height="100"
          className="animate-spin block mb-3 mt-5"
        ></img>
        <p className="loading2 font-semibold text-xl text-center my-3 text-white block">
          Loading
        </p>
        <p className="text-sm text-center mb-3 text-white block">
          {this.state.loadingTip}
        </p>
      </div>
    )
  }
}
