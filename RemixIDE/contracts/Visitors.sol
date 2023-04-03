// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Visitors {
    uint256 public visitors;

    event visitorEvent(address visitor, uint256 visitors, uint timestamp);

    function visit() public {
        visitors++;
        emit visitorEvent(msg.sender, visitors, block.timestamp);
    }
}