// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Asset {
    string public tokenName = "Kvoin";
    string public symbol = "KV";

    event ChangeName(
        address editor,
        string newName
    );

    function changeName(string memory _newName) public {
        tokenName = _newName;
        emit ChangeName(msg.sender, _newName);
    }

}