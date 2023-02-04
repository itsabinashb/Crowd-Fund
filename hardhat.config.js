require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("hardhat-contract-sizer");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	//solidity: "0.8.17",
	solidity: {
		compilers: [
			{ version: "0.8.17" },
			{ version: "0.8.7" },
			{ version: "0.4.19" },
			{ version: "0.6.12" },
			{ version: "0.6.6" },
			{ version: "0.8.0" },
		],
	},
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 31337,
			forking: {
				url: process.env.MAINNET_RPC_URL, // Now we are going to be forking from mainnet rpc url whenever we are using hardhat local network
			},
			blockConfirmations: 1,
		},
		goerli: {
			chainId: 5,
			url: process.env.RPC_URL,
			accounts: [process.env.PRIVATE_KEY],
			blockConfirmations: 6,
			ethUsdPriceFeedAddress: 0xd4a33860578de61dbabdc8bfdb98fd742fa7028e,
		},
		ethereum_mainnet: {
			chainId: 1,
			url: process.env.MAINNET_RPC_URL,
		}
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
		player: {
			default: 1,
		},
	},
	etherscan: {
		apiKey: {
			goerli: process.env.ETHERSCAN_API_KEY,
		},
	},
	gasReporter: {
		enabled: true,
		outputFile: "gas-reporter.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap:
			process.env
				.COINMARKET_API_KEY /* It acually gonna make a api call to coinmarketcap whenever we run gas reporter */,
	},
	mocha: {
		timeout: 50000000, // 500 secs max for running tests
	},
};

// We need to add all dependencies in here, config file,  in order to work.
