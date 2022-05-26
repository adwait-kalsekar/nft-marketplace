// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProfileNFT is ERC721URIStorage {
    uint public profileTokenCount;
    mapping(address => uint256) public profiles;
    
    constructor() ERC721("DApp Profile", "DAPP"){}

    function mintProfile(string memory _tokenURI) external returns(uint) {
        profileTokenCount++;
        _safeMint(msg.sender, profileTokenCount);
        _setTokenURI(profileTokenCount, _tokenURI);
        setProfile(profileTokenCount);
        return(profileTokenCount);
    }
    
    function setProfile(uint256 _id) public {
        require(
            ownerOf(_id) == msg.sender,
            "Must own the nft you want to select as your profile"
        );
        profiles[msg.sender] = _id;
    }
    
    function getMyNfts() external view returns (uint256[] memory _ids) {
        _ids = new uint256[](balanceOf(msg.sender));
        uint256 currentIndex;
        uint256 _profileTokenCount = profileTokenCount;
        for (uint256 i = 0; i < _profileTokenCount; i++) {
            if (ownerOf(i + 1) == msg.sender) {
                _ids[currentIndex] = i + 1;
                currentIndex++;
            }
        }
    }
}