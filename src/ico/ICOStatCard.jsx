import React from "react"
import PropTypes from "prop-types"

export default function ICOStatCard(props) {
  return (
    <div className="w-full md:max-w-sm overflow-hidden shadow-lg bg-white rounded-lg">
      <div className="max-w-sm px-6 py-4 flex flex-col">
        <div className="flex flex-row text-black text-base content-center items-center max-h-36">
          <img src={props.image} className="w-24 inline-block" />
          <p className="font-semibold text-3xl">{props.name}</p>
        </div>
        <p>{props.value}</p>
        {props.children}
      </div>
    </div>
  )
}

ICOStatCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
}
