// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract CrowdFunding{
    string public name;
    string public description;
    address payable public author;
    uint public actualFounds;
    uint public fundrasingGoal;

    constructor(string memory _name,string memory _description,uint _fundrasingGoal){
        name=_name;
        description=_description;
        fundrasingGoal=_fundrasingGoal;
        author=payable(msg.sender);
    }
    
    event changeName(address editor,string newName);
    event foundProject(address founder,uint founds);

    function fundProject() public payable{
        author.transfer(msg.value);
        actualFounds+=msg.value;
        emit foundProject(msg.sender,msg.value);
    }

    modifier onlyOwner(){
        require(
            msg.sender==author,
            "Only owner can change the project name"
        );
        //the funcion is inserted where this symbol appears
        _;
    }


    function changeProjectName(string memory _newName) public onlyOwner{
        name=_newName;
        emit changeName(author,_newName);
    }

}