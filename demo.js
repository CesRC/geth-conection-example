const Web3 = require('web3'),
    config = require('./config')

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

// Check connection
if (web3) {
    console.log("Successfully connected to local Geth node \n")
} else {
    console.log("Problem connecting to local Geth node \n")
}

// Get the network identificator
web3.eth.net.getId().then((result) => {
    console.log("Connected to network with id: " + result + '\n')

})

// Get the current block number
web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is: ", result + '\n');
});

// Import an account from a private key in hex format
defaultAccount1 = web3.eth.accounts.privateKeyToAccount(config.privateKey1)
web3.eth.accounts.wallet.add(defaultAccount1);
console.log("Default account 1: " + defaultAccount1.address + '\n')

defaultAccount2 = web3.eth.accounts.privateKeyToAccount(config.privateKey2)
web3.eth.accounts.wallet.add(defaultAccount2);
console.log("Default account 2: " + defaultAccount2.address + '\n')

// Get default account balance
web3.eth.getBalance(defaultAccount1.address, function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Account1 balance: " + web3.utils.fromWei(result, "ether") + " ETH \n")
    }
})

web3.eth.getBalance(defaultAccount2.address, function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log("Account2 balance: " + web3.utils.fromWei(result, "ether") + " ETH \n")
    }
})

// Send 0,01 Ether (10000000000000000 Wei) from one account to another
web3.eth.sendTransaction({
    from: defaultAccount1.address,
    gasPrice: "20000000000",
    gas: "21000",
    to: defaultAccount2.address,
    value: "10000000000000000",
    data: ""
}, 'Pass1234')
    .on('transactionHash', (txHash) => {
        console.log(`Transfer successfully sent. Waiting for mining. Transaction hash: ${JSON.stringify(txHash)} \n`);
    })
    .then((result) => {
        console.log(`Transfer successfully completed. 0.01 ether has been sent from ${defaultAccount1.address} to ${defaultAccount2.address}. Result: \n\n ${JSON.stringify(result)} \n`);

        // Get default account balance
        web3.eth.getBalance(defaultAccount1.address, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Account1 balance after transfer: " + web3.utils.fromWei(result, "ether") + " ETH \n")
            }
        })
        web3.eth.getBalance(defaultAccount2.address, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Account2 balance after transfer: " + web3.utils.fromWei(result, "ether") + " ETH \n")
            }
        })
    });


