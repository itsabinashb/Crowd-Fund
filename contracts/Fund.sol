// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Fund is Ownable {
    event Donators(address indexed _donator, uint256 indexed _value);
    mapping(address => uint256) donators;
    address payable _owner;

    AggregatorV3Interface internal priceFeed;

    constructor(address _ethUsdPriceFeedAddress) {
        _owner = payable(msg.sender);
        priceFeed = AggregatorV3Interface(_ethUsdPriceFeedAddress);
    }

    function fund() public payable {
        require(msg.value >= 0.01 ether, "Minimum amount to donate is 0.01 ether :)");

        donators[msg.sender] = msg.value;
        emit Donators(msg.sender, msg.value);
    }

    function withdraw() public onlyOwner {
        require(msg.sender == _owner, "You can't withdraw fund!");

        _owner.transfer(address(this).balance);
        address(this).balance == 0;
    }

    /**
     * @dev as we know getLatestPrice() returns 8 decimal palces, here we multiplying the returned value with 10 decimal places to make it 18 decimal value.
     */
    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return (price * 1e10);
    }

    /**
     * @dev here price variable will get 18 decimal place's value, so we deviding it by 1e18 so that we can get the exact ETH price in USD.
     */
    function ethToUsdConverter(int256 _value) external view returns (int256) {
        int256 price = getLatestPrice();
        return (_value * price) / 1e18;
    }

    function addressOfContract() public view returns (address) {
        return address(this);
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function Version() external view returns (uint256) {
        return priceFeed.version();
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
