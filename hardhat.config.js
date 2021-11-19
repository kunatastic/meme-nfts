require("@nomiclabs/hardhat-waffle");

const secret = require("./secret.json");

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${secret.PROJECT_ID}`,
      accounts: [secret.WALLET_PRIVATE_KEY],
    },
  },
  solidity: "0.8.4",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts",
  },
};
