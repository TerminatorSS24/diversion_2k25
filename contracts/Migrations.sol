    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.13;

    contract Migrations {
        address public owner;
        uint256 public last_completed_migration;

        modifier restricted() {
            require(msg.sender == owner, "Only the owner can call this function");
            _;
        }

        constructor() {
            owner = msg.sender; // Assign inside constructor (cheaper)
        }

        function setCompleted(uint256 completed) public restricted {
            last_completed_migration = completed;
        }
    }
