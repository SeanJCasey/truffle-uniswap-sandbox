module.exports = deployer => {
    const ConsensysToken = artifacts.require("./ConsensysToken");
    const TruffleToken = artifacts.require("./TruffleToken");

    // Deploy Mock ERC20 tokens
    deployer.deploy(ConsensysToken);
    deployer.deploy(TruffleToken);
};
