const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

// Client version
web3.eth.getNodeInfo(function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Node info: " + result + "\n")
    }
})

// Current block number
web3.eth.getBlockNumber(function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Block number: " + result + "\n")
    }
})

// If client is syncing blocks
web3.eth.isSyncing(function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Is syncing?: " + result + "\n")
    }
})

// Connected peers
web3.eth.net.getPeerCount(function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Peer count: " + result + "\n")
    }
})

// Client account
web3.eth.getAccounts(function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Client accounts: " + result + "\n")
    }
})

// Account balance
web3.eth.getBalance("0x0E5Ea29F3fDDa27873Ad5c01848E3b0b2D49750F", function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Account balance: " + result + "\n")
    }
})

// Transaction count
web3.eth.getTransactionCount("0x0E5Ea29F3fDDa27873Ad5c01848E3b0b2D49750F", function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Transaction count: " + result + "\n")
    }
})
