
# Cap🪨NFT Marketplace (Final Year Project by Group B54)

NFTs are taking the digital art and collectibles work by storm. Digital artists are seeing their lives change thanks to huge sales to a new audience. They are used to represent ownership of any unique asset, like a deed for an item in the digital or physical realm.

Our project is a completely decentralized web3 application or DApp deployed on the ethereum blockchain. It is an NFT marketplace where users can buy, mint and sell artwork. Everything is decentralized, even the uploaded files are stored on [IPFS](https://ipfs.io/) which is a p2p network.
## Authors

- [Saurav Suresh](https://www.github.com/v0idexis)
- [Adwait Kalsekar](https://github.com/adwait-kalsekar/)
- [Kshitij Kapoor](https://www.github.com)
- [Ranvijay Singh](https://www.github.com)

![Logo](https://mitwpu.edu.in/images/site-logos/logo.png)

## Installation
[Install and set up a metamask wallet](https://metamask.io/)

[Install node.js and npm](https://nodejs.org/)

Change the following settings in the wallet
- Click show test networks
- Select localhost 8545 as your network
- Set network to localhost 8545 and change chain ID to 31337

Navigate to project directory and run the following to install all the project dependencies

```bash
  npm install
```
    
## Deployment

Navigate to the project directory and run the following.

Create a local blockchain using hardhat
```bash
npx hardhat node
```
Connect a harhat account to your metamask wallet, do not use account#0 as that's the marketplace's wallet

Deploy the smart contracts
```bash
npx hardhat run src/backend/scripts/deploy.js --network localhost
```
Execute the script and start the webapp
```bash
  npm run start
```


## Tech Stack

**Client:** ReactJS, Bootstrap, Fontawesome, Metamask

**Backend:** Node.js, Ethers.js, Hardhat, IPFS


## License

[![MIT](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://choosealicense.com/licenses/mit/)

[![Creative Tim](https://www.creative-tim.com/assets/logo/logo-ct-white-170d794e447f75aec55c6effdfbedced9dd268ceceece152675ff8f9891e3588.svg)](https://www.creative-tim.com?ref=blkdsr-license-md)

