import React from "react"
import {
  FaAddressBook,
  FaAngry,
  FaComments,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa"
import { SiMatrix } from "react-icons/si"
import FooterLink from "./FooterLink"
import { RiCopyleftFill } from "react-icons/ri"

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <footer className="footer bg-red-900 relative pt-1 border-b-2 border-gray-300">
        <div className="container mx-auto px-6">
          <div className="sm:flex sm:mt-8">
            <div
              className="
                mt-8
                sm:mt-0 sm:w-full sm:px-8
                flex flex-col
                md:flex-row
                justify-center
                justify-items-center
                md:space-x-12
              "
            >
              <div className="flex flex-col">
                <span className="font-bold text-white uppercase mb-2">
                  <FaComments className="" /> Contact Us
                </span>
                <FooterLink href="mailto:cybertelx@protonmail.com">
                  <FaEnvelope className="" /> Send Hate Mail{" "}
                  <FaAngry className="" />
                </FooterLink>
                <FooterLink href="https://matrix.to/#/!cbxsnloWPLQyIXotiF:matrix.org">
                  <SiMatrix className="" /> Matrix
                </FooterLink>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-white uppercase mt-4 md:mt-0 mb-2">
                  <FaAddressBook className="" /> Learn more
                </span>
                <FooterLink href="https://github.com/Dopechain">
                  <FaGithub className="" /> GitHub Organization
                </FooterLink>
                <FooterLink href="https://github.com/cybertelx">
                  <FaGithub className="" /> About Me
                </FooterLink>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6">
          <div className="mt-16 border-t-2 border-white flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-6">
              <p className="text-sm text-white font-bold mb-2">
                <RiCopyleftFill className="" /> Copyleft 2021 by cybertelx: all
                rights reversed.
              </p>
              <a
                href="https://choosealicense.com/licenses/mit/"
                className="text-sm mb-2 underline text-red-200 hover:text-red-300"
              >
                Licensed under the MIT license
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
