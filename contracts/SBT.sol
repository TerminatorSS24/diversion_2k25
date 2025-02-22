// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBT is ERC721URIStorage, Ownable {
    mapping(address => bool) public verifiedUsers;

    constructor() ERC721("ReputationSBT", "RSBT") Ownable() {}

    function mintSBT(address _to, string memory _uri) external onlyOwner {
        require(!verifiedUsers[_to], "Already has an SBT");

        uint256 tokenId = uint256(uint160(_to));
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _uri);

        verifiedUsers[_to] = true;
    }

    function revokeSBT(address _user) external onlyOwner {
        require(verifiedUsers[_user], "No SBT assigned");

        uint256 tokenId = uint256(uint160(_user));
        _burn(tokenId);

        verifiedUsers[_user] = false;
    }
}
