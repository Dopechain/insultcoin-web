export default {
  infuraKey: "",
  networks: {
    31337: {
      short: "DEV",
      full: "Hardhat Dev Environment",
      deploymentContract: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      rpc: "https://localhost:8545",
      currency: {
        symbol: "DEV-ETH",
      },
      explorer: "about:blank",
    },
    56: {
      short: "BSC",
      full: "Binance Smart Chain",
      deploymentContract: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      rpc: "https://bsc-dataseed.binance.org/",
      currency: {
        symbol: "BNB",
      },
      explorer: "https://bscscan.com",
    },
  },
  defaultSettings: {
    network: "bsc",
    contractAddr: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  },
  timestampMethods: {
    utc: { text: "ccc, dd LLL yyyy, t ZZZZ", zone: "UTC" },
    local: { text: "ccc, dd LLL yyyy, t UTC", zone: "local" },
  },
  insultWords: [
    "fuck",
    "shit",
    "angry",
    "hate",
    "ass",
    "dick",
    "butt",
    "poo",
    "dumb",
    "idiot",
    "stupid",
    "bitch",
    "bad",
    "malicious",
    "sad",
    "cry",
    "frustrate",
    "mean",
    "mad",
    "evil",
    "terrible",
    "terrifying",
    "monstrous",
    "monster",
    "mischief",
    "hole",
    "penis",
    "cock",
    "schlong",
    "disgrace",
    "utter",
    "trash",
    "garbage",
    "waste",
    "damn",
    "darn",
    "dang",
    "frick",
    "shizz",
    "hell",
    "heck",
    "angry",
    "hackusator",
    "obese",
    "fat",
    "bum",
    "bottom",
    "pathetic",
    "petty",
    "hatred",
    "villain",
    "digger",
    "pompous",
    "tool",
    "ape",
    "arse",
    "clown",
    "cunt",
    "pussy",
    "blockhead",
    "boot",
    "licker",
    "suck",
    "kiss",
    "vagina",
    "goblin",
    "shrieking",
    "snooping",
    "peep",
  ],
}
