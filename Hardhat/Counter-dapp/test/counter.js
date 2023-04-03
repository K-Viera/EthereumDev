const {expect} = require("chai");

describe("Counter", () => {
    it('Should increment the counter',async () => {
        const Counter = await ethers.getContractFactory("Counter");
        const counter = await Counter.deploy(0);
        await counter.increment();

        expect(await counter.getCount()).to.equal(1);
    })
});