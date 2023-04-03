// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Identity {
    uint public idNumber;
    bool public isWorking;
    string public name;
    address public wallet;

    constructor(uint _idNumber, bool _isWorking, string memory _name) {
        idNumber = _idNumber;
        isWorking = _isWorking;
        name = _name;
        wallet = msg.sender;
    }

    function test(string memory param2) public returns (string memory value)
    {
        if(bytes(param2).length==0)
        {
            return 'null';
        }else return param2;
    }
    
    function getIdNumber() public view returns (uint number){
        number= idNumber;
    }

    function sendEther(address payable receiver) public payable {
        receiver.transfer(msg.value);
    }

    function sum(int a, int b) public pure returns(int result){
        result=a+b;
    }
}