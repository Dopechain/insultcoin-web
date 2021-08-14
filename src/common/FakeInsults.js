import { ethers } from "ethers"
const randomHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")

export function fakeAddress() {
  return "0x" + randomHex(30)
}

// Generate a number between 0 and 10, excluding 10
function generateRandomInteger(max) {
  return Math.floor(Math.random() * max)
}

let insults1 = [
  "pompous",
  "stupid",
  "ridiculous",
  "massive",
  "absolutely",
  "serious",
  "ducknose",
  "insecure",
  "slimy",
]
let insults2 = [
  "annoying",
  "idiotic",
  "turd",
  "cheesy",
  "terrible",
  "idle",
  "angry",
  "mad",
  "insane",
]
let insults3 = [
  "jockey",
  "dragon",
  "toolbag",
  "shed",
  "snowman",
  "crab",
  "slob",
  "knob",
  "waffle",
  "socket",
  "fork",
  "spoon",
]

let randomElement = (array) => array[Math.floor(Math.random() * array.length)]

export function insultMessage() {
  return (
    randomElement(insults1) +
    " " +
    randomElement(insults2) +
    " " +
    randomElement(insults3)
  )
}
export function insultFull(sender, receiver) {
  return {
    sender: sender,
    receiver,
    cost: ethers.BigNumber.from(generateRandomInteger(112).toString()).mul(
      "1000000000000000000"
    ),
    message: insultMessage(),
    id: Math.random().toString(),
    timestamp: Date.now() - generateRandomInteger(1000000),
  }
}
