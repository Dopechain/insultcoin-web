import React from "react"
import PropTypes from "prop-types"

export default function FeatureCard(props) {
  return (
    <div className="max-w-sm overflow-hidden shadow-lg bg-white rounded-lg">
      <div className="px-6 py-4">
        <div className="text-red-800 font-bold text-xl mb-2">{props.name}</div>
        <p className="text-black text-base">{props.desc}</p>
      </div>
    </div>
  )
}

FeatureCard.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  desc: PropTypes.string,
}
