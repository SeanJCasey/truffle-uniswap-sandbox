module.exports = deployer => {
    const UniswapExchange = artifacts.require("./uniswap_exchange");
    const UniswapFactory = artifacts.require("./uniswap_factory");

    // Deploy and initialize Uniswap contracts
    deployer.deploy(UniswapExchange)
        .then(() => deployer.deploy(UniswapFactory))
        .then(instance => instance.initializeFactory(UniswapExchange.address))
};
