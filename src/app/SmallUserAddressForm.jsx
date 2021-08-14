import PropTypes from "prop-types";
import React from "react";
import { NotificationManager } from "react-notifications";
import Collapsible from "react-collapsible";
import ShortcutsMenu from "./ShortcutsMenu";
import UserAddressField from "./UserAddressField";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";

export default class SmallUserAddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { closedShortcuts: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleSubmit(event) {
    this.validateForm();
    event.preventDefault();
    this.props.onSubmit(event.target.value);
  }

  render() {
    return (
      <form className="w-full" onSubmit={this.handleSubmit} name="myForm">
        <div className="flex flex-wrap sm:mx-3 mb-6 bg-gray-200 p-8 sm:rounded-xl">
          <div className="w-full px-3 mb-6 md:mb-0">
            <UserAddressField
              onChange={this.props.onChange}
              onSubmit={this.props.onSubmit}
              value={this.props.value}
            />
            <Collapsible
              trigger={
                this.state.closedShortcuts ? (
                  <>
                    Open Shortcuts Menu <BsChevronDoubleDown />
                  </>
                ) : (
                  <>
                    Close Shortcuts Menu <BsChevronDoubleUp />
                  </>
                )
              }
              onOpen={() => this.setState({ closedShortcuts: false })}
              onClose={() => this.setState({ closedShortcuts: true })}
              triggerClassName="inline-block bg-white hover:bg-gray-100 text-gray-800 my-2 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full sm:w-auto"
              triggerOpenedClassName="inline-block bg-white hover:bg-gray-100 text-gray-800 my-2 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full sm:w-auto"
            >
              <ShortcutsMenu onChange={this.handleChange} />
            </Collapsible>

            <hr />
          </div>
        </div>
      </form>
    );
  }

  validateForm() {
    console.log("Validation failed.");
    NotificationManager.error(
      "Please double-check the address and try again.",
      "Invalid Address"
    );
    return false;
  }
}

SmallUserAddressForm.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
