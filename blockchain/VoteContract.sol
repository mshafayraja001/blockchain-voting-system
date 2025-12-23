// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {

    address public admin;

    struct Vote {
        uint256 candidateId;
        bytes32 voterHash;
    }

    mapping(bytes32 => bool) public hasVoted;
    Vote[] public votes;

    constructor() {
        admin = msg.sender;
    }

    function castVote(uint256 _candidateId, bytes32 _voterHash) public {
        require(!hasVoted[_voterHash], "Voter already voted");

        votes.push(Vote(_candidateId, _voterHash));
        hasVoted[_voterHash] = true;
    }

    function totalVotes() public view returns (uint256) {
        return votes.length;
    }
}
