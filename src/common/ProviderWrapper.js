import config from "./config"
import { ethers } from "ethers"
import TokenABI from "./abi/Token.json"
import DeploymentABI from "./abi/Deployment.json"
import ICOABI from "./abi/ICO.json"
import InsultingABI from "./abi/Insulting.json"
import chains from "eth-chains"
import { getAddress } from "ethers/lib/utils"

let mapOfProviders = new Map()
export default class ProviderWrapper {
  constructor(provider, network) {
    if (!this.isSupportedNetwork(network)) {
      if (chains["chains"].getById(network)) {
        throw new Error(
          `Unsupported blockchain "${
            chains["chains"].getById(network).name
          }". please change your blockchain network, and try again.`
        )
      } else {
        throw new Error(
          `Unsupported chain ID "${network}". please change your blockchain network, and try again.`
        )
      }
    }
    if (!provider) {
      provider = new ethers.providers.JsonRpcProvider(
        config.networks[network].rpc
      )
    }

    if (!mapOfProviders.has(provider)) {
      provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          this.network = newNetwork
          console.log("Changing networks to " + newNetwork)
        }
      })
      mapOfProviders.set(provider, true)
    }
    this.provider = provider
    this.network = network
  }

  // This wrapper is a bit naive
  // It assumes the network will never be changed by the user
  // TODO: Add network change check
  getNetwork() {
    return this.network
  }

  getRawProvider() {
    return this.provider
  }

  canSendTransactions(provider = this.provider) {
    if (provider.constructor.name == "Web3Provider") {
      return true
    } else if (provider.constructor.name == "JsonRpcProvider") {
      return false
    } else {
      return false
    }
  }

  async getContracts() {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )

    return await this.getContractsFromDeployment(deployContract)
  }

  async getBalance(address) {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )
    let { token } = await this.getContractsFromDeployment(deployContract)
    return await token.balanceOf(address)
  }

  async getNativeBalance(address) {
    return await this.provider.getBalance(address)
  }

  // please send a bignumberish
  async buyICO(bnbAmount) {
    if (this.canSendTransactions()) {
      bnbAmount = ethers.BigNumber.from(bnbAmount)
      let deployContract = new ethers.Contract(
        config.networks[this.getNetwork()].deploymentContract,
        DeploymentABI.abi,
        this.provider
      )
      let { token, ico } = await this.getContractsFromDeployment(deployContract)
      return await ico
        .connect(this.provider.getSigner())
        .buy({ value: bnbAmount })
    } else {
      return false
    }
  }

  async canSendInsult(amount) {
    try {
      let { token, insulting } = await this.getContracts()
      let addr = await this.getAddress()
      return this.canSendInsultWithParams(
        await token.balanceOf(addr, insulting.address),
        await token.allowance(addr, insulting.address),
        amount
      )
    } catch (e) {
      return false
    }
  }

  async approve(address, amount) {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )
    let { token } = await this.getContractsFromDeployment(deployContract)
    return await token
      .connect(this.provider.getSigner())
      .approve(address, amount)
  }

  async canSendInsultWithParams(balance, allowance, amount) {
    try {
      return (
        this.canSendTransactions() &&
        ethers.BigNumber.from(amount).gte("1000000000000000000") &&
        ethers.BigNumber.from(allowance).gt(amount) &&
        ethers.BigNumber.from(balance).gte(amount)
      )
    } catch (e) {
      return false
    }
  }

  async sendInsult(target, message, cost) {
    if (this.canSendInsult(cost)) {
      if (cost < 1) {
        throw "You must spend at least 1 token to insult!"
      }

      let deployContract = new ethers.Contract(
        config.networks[this.getNetwork()].deploymentContract,
        DeploymentABI.abi,
        this.provider
      )
      // do insult stuff
      let { token, insulting } = await this.getContractsFromDeployment(
        deployContract
      )

      let signer = this.provider.getSigner()

      return await insulting.connect(signer).insult(target, message, cost)
    } else {
      return false
    }
  }
  isSupportedNetwork(network) {
    return config.networks[network] ? true : false
  }

  async allowance(owner, spender) {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )
    let { token } = await this.getContractsFromDeployment(deployContract)
    console.log("Tried to get allowance")
    return await token.allowance(owner, spender)
  }

  async getContractsFromDeployment(deployContract) {
    let token = new ethers.Contract(
      await deployContract.tokenContract(),
      TokenABI.abi,
      this.provider
    )
    let ico = new ethers.Contract(
      await deployContract.icoContract(),
      ICOABI.abi,
      this.provider
    )
    let insulting = new ethers.Contract(
      await deployContract.insultingContract(),
      InsultingABI.abi,
      this.provider
    )
    let ret = {
      token,
      ico,
      insulting,
      deployment: deployContract,
    }
    return ret
  }
  async getSentInsults(address) {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )
    let { insulting } = await this.getContractsFromDeployment(deployContract)
    console.log("Tried to get sent insults")
    return await insulting.getSentInsults(address)
  }
  async getReceivedInsults(address) {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )
    let { insulting } = await this.getContractsFromDeployment(deployContract)
    return await insulting.getReceivedInsults(address)
  }
  async getAddress() {
    return await this.provider.getSigner().getAddress()
  }
  async getICORate() {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )
    let { ico } = await this.getContractsFromDeployment(deployContract)
    return await ico.RATE()
  }
  async getICOremaining() {
    let deployContract = new ethers.Contract(
      config.networks[this.getNetwork()].deploymentContract,
      DeploymentABI.abi,
      this.provider
    )
    let { ico, token } = await this.getContractsFromDeployment(deployContract)
    return await token.balanceOf(ico.address)
  }
}
