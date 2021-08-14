import React from "react"
import PropTypes from "prop-types"

export default function FeatureList(props) {
  return (
    <div
      className={
        props.className ||
        "rounded-xl bg-red-600 grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 p-3"
      }
    >
      {props.children}
    </div>
  )
}

FeatureList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
