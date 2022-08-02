// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract pureseT is ERC20, Ownable{
    constructor() ERC20("purseToken", "PURSE"){}

    function issueToken() public onlyOwner{
        _mint(msg.sender, 100000000000000000000000*10**18);
    }

    function mint(address add, uint256 amount) external {
        _mint(add, amount);
    }
}
