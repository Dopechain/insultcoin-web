import React from "react"
import PropTypes from "prop-types"

export default class QuestionCard extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.className
            ? this.props.className
            : "justify-self-auto animate__animated flex flex-col bg-red-600 py-4 px-6 rounded-xl items-center text-xl font-semibold " +
              (this.props.customTransitionClass
                ? this.props.customTransitionClass
                : "animate__fadeIn")
        }
      >
        <h2 className="text-center">{this.props.title}</h2>
        <p className="font-normal text-sm text-center">{this.props.text}</p>
        {this.props.children}
      </div>
    )
  }
}

QuestionCard.propTypes = {
  className: PropTypes.string,
  customTransitionClass: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
