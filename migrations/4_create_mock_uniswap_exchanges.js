const ConsensysToken = artifacts.require("./ConsensysToken");
const TruffleToken = artifacts.require("./TruffleToken");
const UniswapFactory = artifacts.require("./uniswap_factory");
const IUniswapExchange = artifacts.require("./IUniswapExchange");
const IUniswapFactory = artifacts.require("./IUniswapFactory");

module.exports = (deployer, network, accounts) => {
    let iFactory;
    deployer
        // 1. Instantiate a uniswap factory interface with the deployed factory.
        // Note: Could just use factory contract directly, but nice to test the interface.
        .then(() => UniswapFactory.deployed())
        .then(instance => IUniswapFactory.at(instance.address))
        .then(instance => iFactory = instance)

        // 2. Create a uniswap exchange for each token.
        .then(() => TruffleToken.deployed())
        .then(instance => createExchangeWithLiquidity(
            iFactory, instance, web3.utils.toWei("3"), web3.utils.toWei("10000")))
        .then(() => ConsensysToken.deployed())
        .then(instance => createExchangeWithLiquidity(
            iFactory, instance, web3.utils.toWei("2"), web3.utils.toWei("20000")))
        .catch(err => console.log(err));
};

const createExchangeWithLiquidity = (iFactory, token, amountEth, amountTokens) => {
    let exchangeAddress;

    return iFactory.createExchange(token.address)
        .then(() => iFactory.getExchange(token.address))
        .then(result => exchangeAddress = result)
        .then(() => token.approve(exchangeAddress, amountTokens, {gas: 6500000, gasPrice: 2000000000}))
        .then(() => IUniswapExchange.at(exchangeAddress))
        .then(exchange => {
            const min_liquidity = 0;
            const max_tokens = amountTokens;
            const deadline = Math.floor(Date.now() / 1000) + 300;
            exchange.addLiquidity(min_liquidity, max_tokens, deadline, {value: amountEth, gas: 6500000, gasPrice: 2000000000});
        })
        .then(async () => console.log(`Exchange for ${await token.symbol()} at ${exchangeAddress}`));
}
