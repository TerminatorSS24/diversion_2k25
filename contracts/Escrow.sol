// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    enum State { FUNDED, RELEASED, REFUNDED }  // Possible states of the escrow deal

    struct Deal {
        address pd;            // Project Distributor (who locks the funds)
        address freelancer;    // Freelancer (who receives the funds)
        uint256 amount;        // Amount in escrow
        uint256 deadline;      // Deadline for project completion
        State state;           // Current state of the deal
    }

    mapping(uint256 => Deal) public deals;
    uint256 public dealCounter;

    // Events to track transactions
    event FundLocked(uint256 dealId, address indexed pd, address indexed freelancer, uint256 amount, uint256 deadline);
    event FundReleased(uint256 dealId, address indexed freelancer);
    event FundRefunded(uint256 dealId, address indexed pd);
    event FundsWithdrawn(uint256 dealId, address indexed freelancer, uint256 amount);

    // Modifier to ensure only PD can release or refund funds
    modifier onlyProjectDistributor(uint256 _dealId) {
        require(msg.sender == deals[_dealId].pd, "Only PD can perform this action");
        _; 
    }

    // Modifier to check if deal is funded
    modifier isFunded(uint256 _dealId) {
        require(deals[_dealId].state == State.FUNDED, "Invalid state");
        _; 
    }

    // Constructor to initialize the Ownable contract
    constructor() Ownable() {}

    // Function to lock funds in escrow
    function lockFunds(address _freelancer, uint256 _deadline) external payable {
        require(msg.value > 0, "Payment required");
        require(_deadline > block.timestamp, "Invalid deadline");

        dealCounter++;
        deals[dealCounter] = Deal(msg.sender, _freelancer, msg.value, _deadline, State.FUNDED);

        emit FundLocked(dealCounter, msg.sender, _freelancer, msg.value, _deadline);
    }

    // Function to release funds to the freelancer (Only PD can release)
    function releaseFunds(uint256 _dealId) external onlyProjectDistributor(_dealId) isFunded(_dealId) {
        require(deals[_dealId].deadline >= block.timestamp, "Deadline passed");

        deals[_dealId].state = State.RELEASED;

        emit FundReleased(_dealId, deals[_dealId].freelancer);
    }

    // Function to refund funds back to PD if the deadline has passed
    function refundFunds(uint256 _dealId) external onlyProjectDistributor(_dealId) isFunded(_dealId) {
        require(block.timestamp > deals[_dealId].deadline, "Deadline not yet reached");

        deals[_dealId].state = State.REFUNDED;
        payable(deals[_dealId].pd).transfer(deals[_dealId].amount);

        emit FundRefunded(_dealId, deals[_dealId].pd);
    }

    // Function for freelancer to withdraw funds after release
    function withdrawFunds(uint256 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.freelancer, "Only freelancer can withdraw");
        require(deal.state == State.RELEASED, "Funds not released");

        uint256 amount = deal.amount;
        deal.amount = 0; // Prevent reentrancy attack
        payable(deal.freelancer).transfer(amount);

        emit FundsWithdrawn(_dealId, msg.sender, amount);
    }
}
