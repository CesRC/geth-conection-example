const Web3 = require('web3'),
    config = require('./config')


const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

// Import an account from a private key in hex format
defaultAccount1 = web3.eth.accounts.privateKeyToAccount(config.privateKey1)
web3.eth.accounts.wallet.add(defaultAccount1);
console.log("\nDefault account 1: " + defaultAccount1.address + '\n')

// Contract instance
let abiJSON = JSON.parse('[{"inputs":[{"internalType":"string","name":"initMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"}]')
const contract = new web3.eth.Contract(abiJSON, '0xEE853d80C5999F48e443D65e6f75d7a1CABdCfeB')

// Call get message method
if (contract.methods['getMessage'] != null) {
    contract.methods['getMessage'].apply(null, []).call().then(result => {
        console.log('Previous message: ' + result)
    }).catch(err => {
        console.log(err)
    })
}
else {
    console.log("Method does not exist")
}

// Call update method
if (contract.methods['update'] != null) {
    contract.methods['update'].apply(null, ['Hello, this is a new message']).send({ from: defaultAccount1.address, gas: 1000000 })
        .on('error', (err) => {
            console.log(err)
        })
        .on('receipt', (receipt) => {
            console.log('Receipt sucessfully received\n')
            console.log(receipt)
        })
        .catch(err => {
            console.log(err)
        })
} else {
    console.log("Method does not exist")
}