// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract State {
    string public state='active';

    error StateNotDefined(uint unit);

    function changeState(uint newState) public {
        if(newState==0)
        {
            state= 'inactive';
        }else if(newState==1)
        {
            state='active';
        }
        else 
        {
            revert StateNotDefined(newState);
        }
    }
}