pragma solidity ^0.5.0;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TruffleToken is ERC20 {
    string public name = "Truffle Token";
    string public symbol = "TT";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 200000 * (10 ** decimals);

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
