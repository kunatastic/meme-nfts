import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { nftAddress, nftMarketAddress } from "../config";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export async function loadNFTs() {
  /* create a generic provider and query for unsold market items */
  const provider = new ethers.providers.JsonRpcProvider();
  const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, provider);
  const data = await marketContract.fetchMarketItems();

  /*
   *  map over items returned from smart contract and format
   *  them as well as fetch their token metadata
   */
  const items = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      };
      return item;
    })
  );
  return items;
}

export async function buyNFT(nft) {
  /* needs the user to sign the transaction, so will use Web3Provider and sign it */
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftMarketAddress, NFTMarket.abi, signer);

  /* user will be prompted to pay the asking proces to complete the transaction */
  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
    value: price,
  });
  await transaction.wait();
  return loadNFTs();
}
