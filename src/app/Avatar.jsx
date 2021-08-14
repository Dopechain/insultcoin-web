import React from "react"
import PropTypes from "prop-types"
import { Jazzicon } from "@ukstv/jazzicon-react"

export default class Avatar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // style: {{ width: "100px", height: "100px" }}
      <div {...this.props}>
        <Jazzicon address={this.props.seed} />
      </div>
    )
  }
}

Avatar.propTypes = {
  className: PropTypes.string,
  seed: PropTypes.string,
  style: PropTypes.object,
}
