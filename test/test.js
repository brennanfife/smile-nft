const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Smile Smart Contract Tests', function () {
  let smile;

  this.beforeEach(async function () {
    const Smile = await ethers.getContractFactory('Smile');
    smile = await Smile.deploy('Smile Contract', 'SML');
  });

  it('NFT is minted successfully', async function () {
    [account1] = await ethers.getSigners();

    expect(await smile.balanceOf(account1.address)).to.equal(0);

    const tokenURI =
      'https://opensea-creatures-api.herokuapp.com/api/creature/1';
    const tx = await smile.connect(account1).mint(tokenURI);

    expect(await smile.balanceOf(account1.address)).to.equal(1);
  });

  it('tokenURI is set sucessfully', async function () {
    [account1, account2] = await ethers.getSigners();

    const tokenURI_1 =
      'https://opensea-creatures-api.herokuapp.com/api/creature/1';

    const tx1 = await smile.connect(account1).mint(tokenURI_1);

    expect(await smile.tokenURI(0)).to.equal(tokenURI_1);
  });
});
