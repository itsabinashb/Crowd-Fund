const { expect, assert } = require("chai")
const { ethers, getNamedAccounts, network } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { networkConfig } = require("../helper-hardhat-config")

describe("Fund contract", function () {
    async function deployFundFixture() {
        const chainId = network.config.chainId
        const Fund = await ethers.getContractFactory("Fund")
        const accounts = await ethers.getSigners()
        const owner = accounts[0]
        const attacker = accounts[1]
        let [_ethUsdPriceFeedAddress] = await networkConfig[chainId]["ethUsdPriceFeedAddress"]
        const fund = await Fund.deploy({arguments: [_ethUsdPriceFeedAddress]})
        await fund.deployed()

        return { fund, owner, attacker,_ethUsdPriceFeedAddress } // must return the variables
    }
    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { fund, owner } = await loadFixture(deployFundFixture)
            expect(await fund.owner()).to.equal(owner.address)
        })
        it("Fund should be more than or equal to 0.01 ethers", async function () {
            const { fund } = await loadFixture(deployFundFixture)
            // const value = await fund.fund({value: ethers.utils.parseEther("0.01")})
            // assert.isAtLeast(value,ethers.utils.parseEther("0.01"), "Send at least 0.01 ether")
            await expect(fund.fund()).to.be.revertedWith(
                "Minimum amount to donate is 0.01 ether :)"
            )
        })
    })
    describe("Withdrawal", function () {
        it("Only owner can withdraw funds", async function () {
            const { fund, attacker } = await loadFixture(deployFundFixture)
            const sender = await fund.connect(attacker)
            await expect(sender.withdraw()).to.be.revertedWith("Ownable: caller is not the owner")
        })
    })
    describe("Event check", function () {
        it("Emitting event correctly", async function () {
            const { fund } = await loadFixture(deployFundFixture)
            await expect(fund.fund()).to.emit(fund, "Fund").withArgs("_donator", "_value")
        })
    })
})
