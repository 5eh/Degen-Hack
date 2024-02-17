// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitechain is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => Activity) private activities;

    struct Activity {
        uint256 spots;
        uint256 pricePerSpot;
        string activityURI;
        string imageURI;
    }

    constructor() ERC721("Whitechain", "WBT") {}

    function createActivity(uint256 spots, uint256 pricePerSpot, string memory activityURI, string memory imageURI) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        activities[tokenId] = Activity(spots, pricePerSpot, activityURI, imageURI);
        _safeMint(msg.sender, tokenId);
        // Set the tokenURI to the activityURI
        _setTokenURI(tokenId, activityURI);
    }

    function updateActivity(uint256 tokenId, uint256 newSpots, uint256 newPricePerSpot, string memory newActivityURI, string memory newImageURI) public onlyOwner {
        require(_exists(tokenId), "Activity does not exist");
        Activity storage activity = activities[tokenId];
        activity.spots = newSpots;
        activity.pricePerSpot = newPricePerSpot;
        activity.activityURI = newActivityURI;
        activity.imageURI = newImageURI;
        // Update the tokenURI to the new activityURI
        _setTokenURI(tokenId, newActivityURI);
    }

    function getActivityDetails(uint256 tokenId) public view returns (uint256 spots, uint256 pricePerSpot, string memory activityURI, string memory imageURI) {
        require(_exists(tokenId), "Activity does not exist");
        Activity memory activity = activities[tokenId];
        return (activity.spots, activity.pricePerSpot, activity.activityURI, activity.imageURI);
    }

    // Override functions as required by Solidity.
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), "Activity does not exist");
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
