const {network} = require("hardhat")
const {networkConfig} = require("../helper-hardhat-config.js")
const hre = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId

    
    const args = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
	const fund = await deploy("Fund", {
		from: deployer,
		args: [args],
		log: true,
	});

    //await fund.deployed();
    console.log(`Deploying.......`);
    console.log(`Contract deployed to ${fund.address}`);
};
module.exports.tags = ["fund"];





// const hre = require("hardhat");
// async function main() {
// 	const fund = await hre.ethers.getContractFactory("Fund");
// 	const _fund = await fund.deploy();
// 	await _fund.deployed();
// 	console.log(`Contract ${fund.address} was deployed to ${_fund.address}`);
// }

// main().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });