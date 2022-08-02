// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract lpToken is ERC20, Ownable{
    constructor() ERC20("lpToken", "LP_T"){}

    function issueToken() public onlyOwner{
        _mint(msg.sender, 100000000000000000000000*10**18);
    }
}
