// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MyToken is 
    ERC20Upgradeable, 
    OwnableUpgradeable,
    UUPSUpgradeable
{
    function initialize(uint256 initialSupply) public initializer{
        __ERC20_init("KViera Token", "KVT");
        __Ownable_init_unchained();
        __UUPSUpgradeable_init();

        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}