// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public immutable resellPercent;
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        address payable owner;
        bool sold;
        uint256 tipAmount;
    }

    // itemId -> Item
    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    ); 
    
    event NFTTipped(
        uint id,
        uint256 tipAmount,
        address payable owner
    );

    constructor(uint _feePercent, uint _resellPercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
        resellPercent = _resellPercent;
    }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            payable(msg.sender),
            false,
            0
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        // pay seller and feeAccount
        item.owner.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        // update item to sold
        item.sold = true;
        // update item owner
        item.owner = payable(msg.sender);
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }
    
    function sellItem(uint _itemId) external payable nonReentrant {
        uint _resellPrice = getResellPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(item.owner == msg.sender, "Only owner can perform sell Functionality");
        item.nft.transferFrom(msg.sender, address(this), item.tokenId);
        item.sold = false;
        item.price = _resellPrice;
        item.seller = payable(msg.sender);
        console.log(address(this));
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            address(this)
        );
    }

    function getResellPrice(uint _itemId) view public returns (uint){
        return((items[_itemId].price*(100 + resellPercent))/100);
    }
    
    function tipOwner(uint _id) external payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= itemCount, "Invalid item id");
        // Fetch the post
        Item memory _item = items[_id];
        require(_item.seller != msg.sender, "Cannot tip your own post");
        // Pay the author by sending them Ether
        _item.seller.transfer(msg.value);
        // Increment the tip amount
        _item.tipAmount += msg.value;
        // Update the image
        items[_id] = _item;
        // Trigger an event
        emit NFTTipped(_id, _item.tipAmount, _item.seller);
    }
}
