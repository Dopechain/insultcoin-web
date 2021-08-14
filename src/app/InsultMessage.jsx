import React from "react"
import Avatar from "./Avatar"
import ClampLines from "react-clamp-lines"
import { formatLevel } from "../common/formatLevel"
import truncate from "./truncate"
import PropTypes from "prop-types"
import { DateTime } from "luxon"
import SettingsContext from "./SettingsContext"
import { ethers } from "ethers"

export default function Message(props) {
  let isoTimestamp = Math.floor(Number(props.timestamp) / 1000)
  let date = DateTime.fromSeconds(isoTimestamp)
    .setZone("local")
    .toLocaleString(DateTime.DATETIME_SHORT)
  return (
    <div className="px-8 py-4 lg:w-96 max-w-xl bg-white rounded-xl shadow-md space-y-2 sm:flex flex-col sm:space-y-0 sm:space-x-6">
      <div className="space-y-2 text-left">
        <div>
          <div className="flex flex-row">
            <Avatar
              seed={props.sender}
              style={{ width: "64px", height: "64px" }}
              className="inline-block flex-shrink-0"
            />
            <div className="flex flex-col ml-4">
              <a
                href={props.explorer + "/address/" + props.sender}
                className="inline text-lg text-black font-semibold truncate1l"
              >
                From: {truncate(props.sender, 14)}
              </a>
              <p className="block text-sm text-gray-800 font-semibold ">
                <a
                  href={props.explorer + "/address/" + props.receiver}
                  className="inline text-black font-semibold truncate1l"
                >
                  To: {truncate(props.receiver, 18)}
                </a>
              </p>
              <p className="block text-xs text-gray-800 font-semibold ">
                {date}
              </p>
              <p
                className={
                  "inline text-xs text-gray-800 font-semibold " +
                  formatLevel(props.level).classes
                }
              >
                {formatLevel(props.level).message}
              </p>
            </div>
          </div>
        </div>
        <ClampLines
          text={props.message}
          //id={Math.random()}
          lines={3}
          ellipsis="..."
          moreText="Expand"
          lessText="Collapse"
          className="text-gray-500 font-medium break-all"
          innerElement="p"
        />
        <div className="flex flex-row gap-x-3">
          <button
            className="px-4 py-1 text-sm text-red-600
          font-semibold rounded-full border border-gray-300
          hover:text-red-500 hover:bg-gray-100 hover:border-gray-400
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset km1"
            onClick={() => props.insult(props.sender)}
          >
            Insult
          </button>
        </div>
      </div>
    </div>
  )
}

Message.propTypes = {
  sender: PropTypes.string,
  receiver: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(ethers.BigNumber),
  ]),
  message: PropTypes.string,
  explorer: PropTypes.string,
  timestamp: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(ethers.BigNumber),
  ]),
  insult: PropTypes.func,
}
