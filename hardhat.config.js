require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('deploy', 'Deploy the smart contracts', async (taskArgs, hre) => {
  const Smile = await hre.ethers.getContractFactory('Smile');
  const smile = await Smile.deploy('Smile Contract', 'SML');

  await smile.deployed();

  // await hre.run('verify:verify', {
  //   address: smile.address,
  //   constructorArguments: ['Smile Contract', 'SML'],
  // });
});

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
};
