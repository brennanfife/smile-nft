async function main() {
  const Smile = await hre.ethers.getContractFactory('Smile');
  const smile = await Smile.deploy('Smile', 'SML');

  await smile.deployed();

  console.log('Smile deployed to:', smile.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
