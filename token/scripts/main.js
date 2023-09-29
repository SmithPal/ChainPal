const Web3 = require('web3');
const fs = require('fs');

const web3 = new Web3('https://arb1.arbitrum.io/rpc'); // Arbitrum Rinkeby testnet endpoint

const bytecode = fs.readFileSync('ChainPal_sol_ChainPal.bin').toString();
const abi = JSON.parse(fs.readFileSync('ChainPal_sol_ChainPal.abi').toString());

const MyTokenContract = new web3.eth.Contract(abi);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await MyTokenContract
        .deploy({ data: '0x' + bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to', result.options.address);
};

deploy();
