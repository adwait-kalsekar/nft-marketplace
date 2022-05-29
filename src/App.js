import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Saurav's imports
import Navbar from "components/Navbars/boba_nav.js";
import HomePage from "views/OGMarketplace/home.js";
import MintPage from "views/OGMarketplace/mint.js";
import TradePage from "views/OGMarketplace/trade.js";
import ItemsPage from "views/OGMarketplace/items.js";
import PurchasesPage from "views/OGMarketplace/purchases.js";
import ProfilePage from "views/OGMarketplace/profile.js";
import AboutPage from "views/OGMarketplace/about.js";

//web3 imports
import MarketplaceAbi from "contractsData/Marketplace.json";
import MarketplaceAddress from "contractsData/Marketplace-address.json";
import NFTAbi from "contractsData/NFT.json";
import NFTAddress from "contractsData/NFT-address.json";
import { useState } from "react";
import { ethers } from "ethers";
import { Spinner } from "reactstrap";

//css imports
import "bootstrap/dist/css/bootstrap.css"; //for spinner ONLY, no other uses
// import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <div>
        <>
          <Navbar web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading &&
          window.location.pathname !== "/home" &&
          window.location.pathname !== "/" &&
          window.location.pathname !== "/about" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              <Spinner
                // className="App-loader"
                type="grow"
                color="primary"
                size="sm"
              />
              <p className="mx-3 my-0 App-loader">
                Waiting For MetaMask Connection .... Please click on Connect
                Wallet
              </p>
            </div>
          ) : (
            <Routes>

              {/* Saurav's imports */}
              <Route
                path="/home"
                element={<HomePage marketplace={marketplace} nft={nft} />}
              />
              <Route
                path="/trade"
                element={<TradePage marketplace={marketplace} nft={nft} />}
              />
              <Route
                path="/mint"
                element={<MintPage marketplace={marketplace} nft={nft} />}
              />
              <Route
                path="/items"
                element={
                  <ItemsPage
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
              <Route
                path="/purchases"
                element={
                  <PurchasesPage
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
              <Route path="/profile" element={<ProfilePage account={account}/>} />
              <Route path="/about" element={<AboutPage />} />

              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </div>
        {loading &&
        window.location.pathname !== "/home" &&
        window.location.pathname !== "/" &&
        window.location.pathname !== "/about" ? (
          <div style={{"text-align": "center"}}>
            <p className="Metamask">
              Get metamask browser extension from your browsers web store
            </p>
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
              rel="noreferrer"
            >
              For Chrome&emsp;&emsp;
            </a>
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search"
              target="_blank"
              rel="noreferrer"
            >
              For Firefox
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
