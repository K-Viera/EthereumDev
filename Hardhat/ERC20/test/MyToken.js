const {expect} = require('chai');
const {ethers} = require('hardhat');

const initialSupply = 10000000;
const name = 'KViera Token';
const symbol = 'KVT';

describe('My Token Test', function () {
    let myTokenV1;
    let myTokenV2;
    let deployer;
    let userAccount;

    describe('MyTokenV1 test', function () {
        before(async function () {
            const availableAccounts = await ethers.getSigners();
            deployer = availableAccounts[0];

            const MyTokenV1 = await ethers.getContractFactory('MyToken');
            
            myTokenV1 = await upgrades.deployProxy(MyTokenV1,[initialSupply],{kind: 'uups'});
        });

        it('Should have the correct name and symbol', async function () {
            expect(await myTokenV1.name()).to.equal(name);
            expect(await myTokenV1.symbol()).to.equal(symbol);
        });

        it('Should have the correct initial supply', async function () {
           const [fetchedTotalSupply, decimals] = await Promise.all([
                myTokenV1.totalSupply(),
                myTokenV1.decimals()
            ]);

            const expectedTotalSupply = ethers.BigNumber.from(initialSupply).mul(ethers.BigNumber.from(10).pow(decimals));
            expect(fetchedTotalSupply).to.equal(expectedTotalSupply);
        });

        it('Shold run into an error when executiog a function that doesnot exist', async function () {
            expect(() => myTokenV1.mint(deployer.address, ethers.BigNumber.from(10).pow(18))).to.throw();
        });
    });

    describe("V2 test", function () {
        before (async function () {
            userAccount = (await ethers.getSigners())[1];

            const MyTokenV2 = await ethers.getContractFactory('MyTokenV2');

            myTokenV2 = await upgrades.upgradeProxy(myTokenV1.address, MyTokenV2);

            await myTokenV2.deployed();
        });

        it("should had the same address, and keep the same state as the previous version", async function () {
            const[newTotalSupply,previousTotalSupply] = await Promise.all([
                myTokenV2.totalSupply(),
                myTokenV1.totalSupply()
            ]);
            expect (myTokenV1.address).to.equal(myTokenV2.address);
            expect (newTotalSupply).to.equal(previousTotalSupply);
        });

        it("revert when a non owner account try to mint", async function () {
            const tmpContractRef = myTokenV2.connect(userAccount);
            expect(tmpContractRef.mint(userAccount.address, ethers.BigNumber.from(10).pow(18))).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("owner should be able to mint", async function () {
            const [newTotalSupply, decimals] = await Promise.all([
                myTokenV2.totalSupply(),
                myTokenV2.decimals()
            ]);

            const mintAmount = ethers.BigNumber.from(10).pow(decimals);
            await myTokenV2.mint(userAccount.address, mintAmount);

            const newTotalSupplyAfterMint = await myTokenV2.totalSupply();

            expect(newTotalSupplyAfterMint).to.equal(newTotalSupply.add(mintAmount));
        });
    });
});