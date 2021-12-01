import Contract from 'web3-eth-contract'
import Web3WsProvider from 'web3-providers-ws'

import Farm from '../../backend/build/contracts/Farm.json'

export const farm = new Contract(Farm.abi, process.env.VUE_APP_CONTRACT_ADDRESS)

farm.setProvider(new Web3WsProvider(`wss://ropsten.infura.io/ws/v3/${process.env.VUE_APP_PROJECT_ID}`))

export const connectAccount = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        farm.setProvider(window.ethereum)
        return true
    }
    return false
}
