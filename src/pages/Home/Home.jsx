import React, { useState, useEffect } from "react";

import { buyNFT, loadNFTs } from "../../utils/NFTs";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNFTs().then((nfts) => {
      setNfts(nfts);
    });
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      {/* {JSON.stringify(nfts)} */}
      {loading ? (
        "LOADING PLEASE WAIT"
      ) : !nfts.length ? (
        "No NFTS found in MarketPlace"
      ) : (
        <div className="flex justify-center">
          <div className="px-4">
            <div className="grid grid-cols-3 gap-4 pt-4">
              {nfts.map((nft, index) => (
                <div key={index} className="border bg-gray-900 shadow rounded-xl overflow-hidden">
                  <img src={nft.image} alt={nft.name} className="h-48 w-full object-cover" />
                  <div className="px-4 py-2">
                    <div className="text-xl text-purple-400 font-bold">{nft.name}</div>
                    <div className="text-purple-700 text-sm">{nft.description}</div>
                    <div className="text-purple-700 text-sm">{nft.price} ETH</div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => setNfts(buyNFT(nft))}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}{" "}
    </React.Fragment>
  );
};

export default Home;
