import React, { useState } from "react"
import PropTypes from "prop-types"
import Config from "../common/config"
import { ethers } from "ethers"

import ChainProviderContext from "../common/ChainProviderContext"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import ProviderWrapper from "../common/ProviderWrapper"
import { FaAngry, FaRegAngry } from "react-icons/fa"

let checker = (input, words) =>
  words.some((word) => input.toLowerCase().includes(word))

export default class InsultModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      approved: false,
      open: false,
    }
    this.approve = this.approve.bind(this)
    this.initialValues = {
      insultAddress: props.address,
      insultMessage: "",
      insultCost: "",
    }
    // OMEGA HACKY SOLUTION TF
    window.onhashchange = () => {
      if (window.location.hash == "#insults") {
        this.setState({
          open: true,
        })
      } else {
        this.setState({
          open: false,
        })
      }
    }
  }

  componentWillUnmount() {
    window.onhashchange = () => {}
  }

  async componentDidUpdate(prevProps) {
    this.initialValues = {
      insultAddress: this.props.address,
      insultMessage: "",
      insultCost: "",
    }
  }

  async componentDidMount() {
    let chainId = (await this.context.provider.getNetwork()).chainId
    let p = new ProviderWrapper(this.context.provider, chainId)

    let DisplayingErrorMessagesSchema = Yup.object().shape({
      insultCost: Yup.number("Not a number")
        .required("Required")
        .min(1, "You need at least 1 INSULT!")
        .positive("You can't burn negative!")
        .max(
          Number(
            ethers.utils.formatEther(await p.getBalance(await p.getAddress()))
          ),
          "You don't have that much!"
        ),
      insultAddress: Yup.string()
        .ensure()
        .required("Required")
        .test("addressTest", "That is not an address!", function (value) {
          const { path, createError } = this
          try {
            if (ethers.utils.getAddress(value)) {
              return value
            } else {
              return createError({ path, message: "Not an Ethereum address" })
            }
          } catch (e) {
            return createError({ path, message: "Not an Ethereum address" })
          }
        }),
      insultMessage: Yup.string()
        .ensure()
        .required("Required")
        .test(
          "insultTest",
          "That does not contain an insulting word.",
          function (value) {
            const { path, createError } = this
            if (checker(value, Config.insultWords) == true) {
              return value
            } else {
              return createError({
                path,
                message: "That does not contain an insulting word.",
              })
            }
          }
        )
        .min(20, "The best insults usually have more than 20 characters."),
    })
    let { token, insulting } = await p.getContracts()

    let approved = (await p.allowance(p.getAddress(), insulting.address)) > 0
    console.log("approval: " + approved)
    this.setState({
      approved: approved,
    })

    this.setState({
      DisplayingErrorMessagesSchema,
    })
  }

  async approve() {
    console.log("Trying to approve")
    // send a tx and wait for it
    this.setState({
      waiting: true,
    })
    let chainId = (await this.context.provider.getNetwork()).chainId
    let p = new ProviderWrapper(this.context.provider, chainId)
    let { token, insulting } = await p.getContracts()
    let apprtx = await p.approve(
      insulting.address,
      ethers.BigNumber.from(
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      )
    )
    await apprtx.wait()

    this.setState({
      approved: (await p.allowance(p.getAddress(), insulting.address)) > 0,
    })
  }

  render() {
    //console.log("Approved: " + this.state.approved)
    return (
      <div className="modal text-black" id="insults">
        {this.state.open && (
          <Formik
            validateOnBlur
            validationSchema={this.state.DisplayingErrorMessagesSchema}
            initialValues={this.initialValues}
            onReset={() => {
              console.log("reset values of insult modal")
            }}
            onSubmit={async (
              { insultAddress, insultMessage, insultCost },
              { resetForm }
            ) => {
              let p = new ProviderWrapper(this.context.provider, 56)
              try {
                console.log("Insult sent")
                this.setState({
                  loading: true,
                })
                let tx = await p.sendInsult(
                  insultAddress,
                  insultMessage,
                  ethers.BigNumber.from(insultCost).mul("1000000000000000000")
                )
                await tx.wait(1)
                resetForm({ values: this.initialValues })
                window.location.hash = "#"
                this.props.handleRefresh()
              } catch (e) {
                this.setState({
                  loading: false,
                })
                console.log("Error: " + e)
              }
            }}
          >
            {({ setFieldValue, resetForm }) => (
              <div className="modal-box justify-center flex flex-col">
                <Form>
                  <h1 className="font-bold text-2xl">Insult</h1>
                  <hr className="border-red-700 border-3 my-3" />
                  <div className="mb-6 flex flex-col gap-y-2">
                    <label>
                      <p className="block text-gray-700 text-base mb-2">
                        Who do you want to insult?
                      </p>
                      <Field
                        name="insultAddress"
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                      />
                      <ErrorMessage
                        name="insultAddress"
                        className="text-sm tracking-tight text-red-800 mt-1"
                        component="div"
                      />
                    </label>
                    <label>
                      <p className="block text-gray-700 text-base mb-2">
                        How much do you want to spend?
                      </p>
                      <Field
                        name="insultCost"
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Put something like 13 or 29!"
                      />
                      <ErrorMessage
                        name="insultCost"
                        className="text-sm tracking-tight text-red-800 mt-1"
                        component="div"
                      />
                      <label className="flex flex-col gap-y-2 mt-1 mb-2">
                        <p className="text-sm font-bold tracking-wide text-red-800 mt-1 uppercase">
                          Quick Prices
                        </p>
                        <div className="grid grid-flow-row grid-cols-4 gap-x-2 gap-y-1 p-2 border border-red-600 rounded-lg">
                          <button
                            onClick={() => setFieldValue("insultCost", "1")}
                            type="button"
                            className="inline-block bg-yellow-500 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 mt-0 order-3 sm:order-last"
                          >
                            Annoyed
                          </button>
                          <button
                            onClick={() => setFieldValue("insultCost", "4")}
                            type="button"
                            className="inline-block bg-yellow-600 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 mt-0 order-3 sm:order-last"
                          >
                            Upset
                          </button>
                          <button
                            type="button"
                            onClick={() => setFieldValue("insultCost", "8")}
                            className="inline-block bg-red-600 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 mt-0 order-3 sm:order-last"
                          >
                            Frustrated
                          </button>
                          <button
                            type="button"
                            onClick={() => setFieldValue("insultCost", "16")}
                            className="inline-block bg-red-600 font-semibold text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 mt-0 order-3 sm:order-last"
                          >
                            Mad
                          </button>
                          <button
                            type="button"
                            onClick={() => setFieldValue("insultCost", "32")}
                            className="inline-block bg-red-800 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 mt-0 order-3 sm:order-last"
                          >
                            Angry
                          </button>
                          <button
                            type="button"
                            className="inline-block bg-red-800 font-bold text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 mt-0 order-3 sm:order-last"
                            onClick={() => setFieldValue("insultCost", "64")}
                          >
                            Furious
                          </button>
                        </div>
                      </label>
                    </label>
                    <label>
                      <p className="block text-gray-700 text-base mb-2">
                        What do you want to say?
                      </p>
                      <Field
                        name="insultMessage"
                        className="shadow appearance-none border border-red-500 rounded h-48 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        style={{ resize: "none" }}
                        component="textarea"
                        rows="10"
                        placeholder={`You should be ashamed of yourself, you absolute utter disgrace of a human being.`}
                      />
                      <ErrorMessage
                        name="insultMessage"
                        className="text-sm tracking-tight text-red-800 mt-1"
                        component="div"
                      />
                    </label>
                  </div>
                  <div className="modal-action gap-1">
                    <button
                      type="button"
                      onClick={this.approve}
                      className={
                        "inline-block bg-red-700 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 hover:bg-red-500 mt-0 " +
                        (this.state.approved
                          ? "disabled:cursor-not-allowed disabled:bg-red-900 hover:bg-red-900 "
                          : "")
                      }
                      disabled={this.state.approved}
                      title={
                        this.state.approved
                          ? "You have already approved!"
                          : undefined
                      }
                    >
                      Approve
                    </button>
                    <button
                      type="submit"
                      disabled={!this.state.approved}
                      className={
                        "inline-block bg-red-800 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 hover:bg-red-600 mt-0 " +
                        (!this.state.approved
                          ? "disabled:cursor-not-allowed disabled:bg-red-900 hover:bg-red-900"
                          : "")
                      }
                    >
                      INSULT THEM!!!
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetForm({ values: this.initialValues })
                        window.location.hash = "#"
                      }}
                      className="inline-block bg-red-800 text-md text-center lg:flex-grow-0 px-4 py-2 shadow-inner leading-none border rounded-md text-white border-red-300 hover:text-gray-200 hover:bg-red-600 mt-0"
                    >
                      Close
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        )}
      </div>
    )
  }
}

InsultModal.contextType = ChainProviderContext
InsultModal.propTypes = {
  address: PropTypes.string,
  handleRefresh: PropTypes.func,
}
