const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftmarket = await NFTMarket.deploy();
  await nftmarket.deployed();
  console.log("NFTMarket deployed to:", nftmarket.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftmarket.address);
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);

  const content = `export const nftMarketAddress = "${nftmarket.address}";\nexport const nftAddress = "${nft.address}";`;
  fs.writeFileSync("./src/config.js", content);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
