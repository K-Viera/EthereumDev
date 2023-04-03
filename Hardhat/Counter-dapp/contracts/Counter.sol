// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

contract Counter {
    uint public count;

    constructor (uint _count) {
        count = _count;
    }

    function getCount() public view returns (uint) {
        return count;
    }

    function increment() public {
        count += 1;
    }
}

// contrac address 0x3FE631709aa7444adf479Aa93981C0cb243B3435 goerli