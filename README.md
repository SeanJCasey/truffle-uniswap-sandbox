# Truffle Uniswap Sandbox

This box allows developers to spin up a fully functional instance of Uniswap on their local blockchain.

What it does:
- Deploys and instantiates Uniswap's main Vyper contracts to a local blockchain
- Creates Uniswap markets for two mock ERC20 tokens
- Provides solidity interfaces for interacting with Uniswap in your dApp

What it does NOT do:
- Provide a UI (interacting with the deployed contracts via `truffle console` is the goal)


## Dependency

The only dependency not handled by this Truffle Box is the installation of Vyper, the pythonic language that the Uniswap smart contracts are written in.

The easiest way to get Vyper on your computer is via a virtual environment. Check out this article for instructions: https://medium.com/quiknode/build-smart-contracts-in-vyper-with-truffle-5-82aa0a60b3e7


## Set up

1. Install Truffle globally

```
npm install -g truffle
```

2. Download this box inside of a new project directory. This will install all project dependencies.

```
truffle unbox SeanJCasey/truffle-uniswap-sandbox
```

3. Configure the `port` of your `development` network in `truffle-config.json`

For example, the most common ports are:
`truffle develop` - `9545`
Ganache UI - `7545`
Ganache CLI - `8545`


## Deploy contracts and config

You can spin up a local blockchain either with Truffle's build-in `develop` command, or with another service such as Ganche UI or Ganache CLI.

### Deploy with `truffle develop`

1. Run `truffle develop`

```
truffle develop
```

2. Compile and deploy the smart contracts.

```
compile
migrate
```

### Deploy with Ganache UI or Ganache CLI

1. Compile and deploy the smart contracts.

```
truffle compile
truffle migrate
```


## Interacting with the Uniswap Sandbox (using Truffle Console)

Either use `truffle develop`, or spin up a `truffle console`, optionally with your development network:

```
truffle console [--network development]
```

Use Truffle's built-in syntax to make calls or send transactions (https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts).

It is first helpful to load up all the contracts, interfaces, and accounts:

```javascript
// Deployed Contracts
const consensysTokenContract = await ConsensysToken.deployed()
const truffleTokenContract = await TruffleToken.deployed()
const uniswapFactoryContract = await uniswap_factory.deployed()

// Interfaces
const iFactory = await IUniswapFactory.at(uniswapFactoryContract.address)
const iConsensysToken = await IERC20.at(consensysTokenContract.address)
const iTruffleToken = await IERC20.at(truffleTokenContract.address)

// Accounts
const accounts = await web3.eth.getAccounts()
```

#### Example: Swap ETH for TruffleToken

```javascript
let buyer = accounts[1]

let sellAmount = web3.utils.toWei('0.5', 'ether')
let buyCurrency = truffleTokenContract.address
let exchangeAddress = await iFactory.getExchange(buyCurrency)
let iExchange = await IUniswapExchange.at(exchangeAddress)

// Arbitrary risk limiting parameters. See https://docs.uniswap.io/smart-contract-api/exchange#ethtotokenswapinput
let min_tokens = 1
let deadline = Math.floor(Date.now() / 1000) + 300

// Execute the swap
let result = await iExchange.ethToTokenSwapInput(min_tokens, deadline, { value: sellAmount })

```

## Notes

- The `contracts/` folder contains the solidity contracts that will be used directly by an application in its root, and other contracts that are only needed for the Uniswap sandbox are located in a `contracts/sandbox/` subdirectory.
