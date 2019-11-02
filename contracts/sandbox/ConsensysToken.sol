pragma solidity ^0.5.0;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract ConsensysToken is ERC20 {
    string public name = "Consensys Token";
    string public symbol = "CT";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 100000 * (10 ** decimals);

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
