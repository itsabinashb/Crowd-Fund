// const { ethers } = require("hardhat");

// async function main() {
// 	const [deployer] = await ethers.getSigners();
// 	console.log(`Deploying contracts with the account: ${deployer.address}`);
// 	console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);
// 	const fund = await ethers.getContractFactory("Fund");
// 	const _fund = await fund.deploy();
// 	await _fund.deployed();

// 	main()
// 		.then(() => process.exit(0))
// 		.catch((error) => {
// 			console.error(error);
// 			process.exit(1);
// 		});
// };

const hre = require("hardhat");
async function main() {
	const fund = await hre.ethers.getContractFactory("Fund");
	const _fund = await fund.deploy();
	await _fund.deployed();
	console.log(`Contract ${fund.address} was deployed to ${_fund.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
