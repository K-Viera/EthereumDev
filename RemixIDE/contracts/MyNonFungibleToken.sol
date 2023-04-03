// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNonFungibleToken is ERC721("My own non-fungible token","MNFT"){
    constructor() {
        //It's non fungible so we need to add the token id
        //also we only manage one token per contract
        _mint(msg.sender,1);
    }
}