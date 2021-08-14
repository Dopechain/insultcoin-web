import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import React from "react"
import ReactDOM from "react-dom"
import Preloader from "../common/Preloader"
import { FaCoins, FaRobot } from "react-icons/fa"
import LinkButton from "./LinkButton"

import { Typewriter } from "react-typewriting-effect"
import "react-typewriting-effect/dist/index.css"
import delay from "delay"
import QuestionCard from "./QuestionCard"

window.onload = () => {
  Preloader(
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming.png?raw=true",
    "https://github.com/Dopechain/insultcoin-logo/blob/main/logos/png/insultcoin_screaming_white_border.png?raw=true"
  )
}

export default class WebsiteApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideAnimSkipText: false,
      showMaybeTypewriter: false,
      showContent: localStorage.getItem("skipAnimation") === "true",
      skipAnimation: localStorage.getItem("skipAnimation") === "true",
    }
  }

  skipAnimation() {
    console.log("setting skip anim in localstorage")
    this.setState({
      skipAnimation: true,
      showContent: true,
    })
    try {
      localStorage.setItem("skipAnimation", "true")
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  stopSkipAnimation() {
    console.log("stopped skip anim i guess")
    this.setState({
      hideAnimSkipText: true,
    })
    try {
      localStorage.setItem("skipAnimation", "false")
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  render() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <header>
          <Navbar />
        </header>
        <main className="bg-red-700 text-white w-full flex-grow flex flex-col gap-y-4 py-4">
          <h1 className="text-center font-semibold text-2xl">
            {this.state.skipAnimation && (
              <>
                <div className="flex flex-row justify-center items-center">
                  <span>The future of insulting</span>
                  <span>... maybe?</span>
                </div>
                {!this.state.hideAnimSkipText && (
                  <button
                    className="inline-block text-sm underline text-yellow-400"
                    onClick={() => this.stopSkipAnimation()}
                  >
                    Don't skip in the future
                  </button>
                )}
                {this.state.hideAnimSkipText && (
                  <p className="inline-block text-sm text-yellow-300">
                    Alright! Next time you load the page, it won't skip the
                    animation.
                  </p>
                )}
              </>
            )}
            {!this.state.skipAnimation && (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row justify-center items-center">
                  <Typewriter
                    string="The future of insulting"
                    delay={50}
                    stopBlinkinOnComplete
                    onComplete={async () => {
                      // delay
                      await delay(500)
                      this.setState({ showMaybeTypewriter: true })
                    }}
                  />
                  {this.state.showMaybeTypewriter == true && (
                    <Typewriter
                      string="... maybe?"
                      delay={70}
                      stopBlinkinOnComplete
                      onComplete={async () => {
                        this.setState({ showContent: true })
                      }}
                    />
                  )}
                </div>
                {!this.state.showContent && (
                  <div>
                    <button
                      className="inline-block text-sm underline text-yellow-400"
                      onClick={() => this.skipAnimation()}
                    >
                      Skip
                    </button>
                  </div>
                )}
              </div>
            )}
          </h1>
          {this.state.showContent && (
            <div className="w-full flex flex-col gap-y-2 text-white font-normal">
              <div className="w-full flex flex-row justify-center">
                <div className="animate__animated animate__faster animate__fadeInDown justify-center flex flex-col bg-red-600 py-4 px-6 rounded-xl items-center text-xl font-semibold w-72">
                  <LinkButton
                    href="/app"
                    className="text-white"
                    text={
                      <>
                        <FaRobot /> <p className="inline">App</p>
                      </>
                    }
                  />
                  <LinkButton
                    href="/ico"
                    className="text-yellow-300"
                    text={
                      <>
                        <FaCoins /> <p className="inline">ICO</p>
                      </>
                    }
                  />
                </div>
              </div>

              <div className="grid grid-flow-col justify-center sm:grid-flow-row grid-rows-3 sm:grid-rows-none sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-auto justify-items-stretch items-stretch gap-2 mx-8">
                <QuestionCard
                  customTransitionClass="animate__fadeInDown"
                  title="What?"
                  text="This is a revolutionary new technology that will change how
                    we insult people using blockchain technology. It is the
                    future of insulting tech, powered by decentralized
                    blockchain technology hyperledger tangle quantum ok i'm out
                    of buzzwords now"
                />
                <QuestionCard
                  customTransitionClass="animate__fadeInLeft"
                  title="Is this a joke?"
                  text={`Yes it is! If you find this funny, buy some InsultCoins
                  from the ICO.`}
                />
                <QuestionCard
                  customTransitionClass="animate__fadeInUp"
                  title="More questions?"
                  text={
                    <>
                      <a
                        href="https://github.com/Dopechain/insultcoin-wiki/wiki"
                        className="underline"
                      >
                        Check out our user documentation on GitHub
                      </a>{" "}
                      if you have any questions!
                    </>
                  }
                />
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<WebsiteApp />, document.getElementById("root"))
